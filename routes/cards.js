const router = require('express').Router();
const bodyParser = require('body-parser');

const jsonParser = bodyParser.json();
const {
  getCards, createCard, deleteCard, likeCard, dislikeCard,
} = require('../controllers/cardsControllers');
const auth = require('../middleware/auth');

router.get('/cards', auth, getCards);

router.post('/cards', auth, jsonParser, createCard);

router.delete('/cards/:cardId', auth, deleteCard);

router.put('/cards/:cardId/likes', auth, likeCard);

router.delete('/cards/:cardId/likes', auth, dislikeCard);

module.exports = router;
