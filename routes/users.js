const router = require('express').Router();
const bodyParser = require('body-parser');

const jsonParser = bodyParser.json();
const {
  getUsers, createUser, getUserById, updateProfile, updateAvatar,
} = require('../controllers/usersControllers');

router.post('/users', jsonParser, createUser);

router.get('/users', getUsers);

router.get('/users/:userId', getUserById);

router.patch('/users/me', jsonParser, updateProfile);

router.patch('/users/me/avatar', jsonParser, updateAvatar);

module.exports = router;
