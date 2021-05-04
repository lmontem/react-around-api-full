const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('cookie-parser');
// const crypto = require('crypto');
// require('dotenv').config();

// const { NODE_ENV, JWT_SECRET } = process.env;
const User = require('../models/user');
const { NotFoundError, InvalidError, AuthError } = require('../middleware/errorHandling');

function getUsers(req, res, next) {
  User.find({})
    .then((users) => res.status(200).send({ data: users }))
    .catch(next);
}

function createUser(req, res, next) {
  const {
    name, about, avatar, email, password,
  } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name, about, avatar, email, password: hash,
    }))
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidatorError') { throw new InvalidError('Invalid user'); }
      if (err.name === 'NotFound') { throw new NotFoundError('User not found'); }
    })
    .catch(next);
}

function Login(req, res, next) {
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
    .catch(() => {
      throw new AuthError('Authorization Error');
    })
    .catch(next);
}

function getUserById(req, res, next) {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        res.status(404).send({ message: 'User ID not found' });
      } else {
        return res.status(200).send({ data: user });
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') { throw new InvalidError('Invalid user'); }
      if (err.name === 'NotFound') { throw new NotFoundError('User not found'); }
    })
    .catch(next);
}

function updateProfile(req, res, next) {
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
      if (req.body === null) { throw new InvalidError('Empty request'); }
      if (err.name === 'CastError') { throw new InvalidError('Invalid user'); }
      if (err.name === 'NotFound') { throw new NotFoundError('User not found'); }
    })
    .catch(next);
}

function updateAvatar(req, res, next) {
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
      if (req.body === null) { throw new InvalidError('Empty request'); }
      if (err.name === 'CastError') { throw new InvalidError('Invalid user'); }
      if (err.name === 'NotFound') { throw new NotFoundError('User not found'); }
    })
    .catch(next);
}

module.exports = {
  getUsers, createUser, getUserById, updateProfile, updateAvatar, Login,
};
