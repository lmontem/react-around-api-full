const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
// const { auth } = require('../middleware/auth');
require('cookie-parser');
// const crypto = require('crypto');
// require('dotenv').config();

// const { NODE_ENV, JWT_SECRET } = process.env;
const User = require('../models/user');

function getUsers(req, res) {
  User.find({})
    .then((users) => res.status(200).send({ data: users }))
    .catch(() => res.status(500).send({ message: 'Error' }));
}

function createUser(req, res) {
  const {
    name, about, avatar, email, password,
  } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name, about, avatar, email, password: hash,
    }))
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidatorError') { return res.status(400).send({ message: 'Invalid user' }); }
      if (err.name === 'NotFound') { return res.status(404).send({ message: 'User not found' }); }
      return res.status(500).send({ message: 'Error' });
    });
}

function Login(req, res) {
  const { email, password } = req.body;
  User.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new Error('Incorrect password or email'));
      }
      return bcrypt.compare(password, user.password)
        .then((match) => {
          if (!match) {
            return Promise.reject(new Error('Incorrect password or email'));
          }
          const token = jwt.sign({ _id: user._id }, 'secret key');
          res.cookie('token', token, { httpOnly: true }, { expires: new Date(Date.now() + 604800000) });
          res.send({ token });
        });
    })
    .catch((err) => {
      res.status(401).send({ message: err.message });
    });
}

function getUserById(req, res) {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        res.status(404).send({ message: 'User ID not found' });
      } else {
        return res.status(200).send({ data: user });
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') { return res.status(400).send({ message: 'Invalid user' }); }
      if (err.name === 'NotFound') { return res.status(404).send({ message: 'User not found' }); }
      return res.status(500).send({ message: 'Error' });
    });
}

function updateProfile(req, res) {
  User.findByIdAndUpdate(
    { _id: req.user._id },
    { name: req.body.name, about: req.body.about },
    {
      new: true,
      runValidators: true,
      upsert: true,
    },
  )
    .then((user) => {
      if (!user) {
        res.status(404).send({ message: 'User not found' });
      } else {
        return res.status(200).send({ data: user });
      }
    })
    .catch((err) => {
      if (req.body === null) { return res.status(400).send({ message: 'Empty request' }); }
      if (err.name === 'CastError') { return res.status(400).send({ message: 'Invalid user' }); }
      if (err.name === 'NotFound') { return res.status(404).send({ message: 'User not found' }); }
      return res.status(500).send({ message: 'Error' });
    });
}

function updateAvatar(req, res) {
  User.findByIdAndUpdate(
    { _id: req.user._id },
    { avatar: req.body.avatar },
    {
      new: true,
      runValidators: true,
      upsert: true,
    },
  )
    .then((user) => {
      if (!user) {
        res.status(404).send({ message: 'User not found' });
      } else {
        return res.status(200).send({ data: user });
      }
    })
    .catch((err) => {
      if (req.body === null) { return res.status(400).send({ message: 'Empty request' }); }
      if (err.name === 'CastError') { return res.status(400).send({ message: 'Invalid user' }); }
      if (err.name === 'NotFound') { return res.status(404).send({ message: 'User not found' }); }
      return res.status(500).send({ message: 'Error' });
    });
}

module.exports = {
  getUsers, createUser, getUserById, updateProfile, updateAvatar, Login,
};
