const router = require('express').Router();
const bodyParser = require('body-parser');
const { celebrate, Joi } = require('celebrate');

const jsonParser = bodyParser.json();
const {
  getCards, createCard, deleteCard, likeCard, dislikeCard,
} = require('../controllers/cardsControllers');
const { auth } = require('../middleware/auth');

router.get('/cards', getCards);

router.post('/cards', auth, celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().uri(),
  }),
}), jsonParser, createCard);

router.delete('/cards/:cardId', auth, celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().hex().length(24).required(),
  }),
}), deleteCard);

router.put('/cards/:cardId/likes', auth, celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().hex().length(24).required(),
  }),
}), likeCard);

router.delete('/cards/:cardId/likes', auth, celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().hex().length(24).required(),
  }),
}), dislikeCard);

module.exports = router;
