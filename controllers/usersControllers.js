const User = require('../models/user');

function getUsers(req, res) {
  User.find({})
    .then((users) => res.status(200).send({ data: users }))
    .catch(() => res.status(500).send({ message: 'Error' }));
}

function createUser(req, res) {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidatorError') { return res.status(400).send({ message: 'Invalid user' }); }
      if (err.name === 'NotFound') { return res.status(404).send({ message: 'User not found' }); }
      return res.status(500).send({ message: 'Error' });
    });
}

function getUserById(req, res) {
  User.findById(req.params.userId)
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
  getUsers, createUser, getUserById, updateProfile, updateAvatar,
};
