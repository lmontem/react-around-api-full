const router = require('express').Router();
const bodyParser = require('body-parser');
const { celebrate, Joi } = require('celebrate');

const jsonParser = bodyParser.json();
const {
  getUsers, getUserById, updateProfile, updateAvatar,
} = require('../controllers/usersControllers');
const { auth } = require('../middleware/auth');

router.get('/users', auth, getUsers);

router.get('/users/:userId', auth, celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
  }),
}), getUserById);

router.patch('/users/me', auth, celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  }),
}), jsonParser, updateProfile);

router.patch('/users/me/avatar', auth, celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().uri(),
  }),
}), jsonParser, updateAvatar);

module.exports = router;
