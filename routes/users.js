const router = require('express').Router();
const bodyParser = require('body-parser');

const jsonParser = bodyParser.json();
const {
  getUsers, getUserById, updateProfile, updateAvatar,
} = require('../controllers/usersControllers');
const auth = require('../middleware/auth');

router.get('/users', auth, getUsers);

router.get('/users/:userId', auth, getUserById);

router.patch('/users/me', auth, jsonParser, updateProfile);

router.patch('/users/me/avatar', auth, jsonParser, updateAvatar);

module.exports = router;
