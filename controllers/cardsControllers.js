const Card = require('../models/card');
const { NotFoundError, InvalidError } = require('../middleware/errorHandling');

function getCards(req, res, next) {
  Card.find({})
    .then((card) => { res.status(200).send({ data: card }); })
    .catch(next);
}

function createCard(req, res, next) {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.name === 'ValidationError') { throw new InvalidError('Invalid data'); }
    })
    .catch(next);
}

function deleteCard(req, res, next) {
  Card.findByIdAndRemove(req.params.cardId)
    .then((card) => {
      if (!card) {
        res.status(404).send({ message: 'Card not found' });
      } else {
        return res.status(200).send({ message: 'Card deleted' });
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') { throw new InvalidError('Invalid card'); }
      if (err.name === 'NotFound') { throw new NotFoundError('Card not found'); }
    })
    .catch(next);
}

function likeCard(req, res, next) {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } }, // add _id to the array if it's not there yet
    { new: true },
  )
    .then((card) => {
      if (!card) {
        res.status(404).send({ message: 'Card not found' });
      } else {
        return res.status(200).send({ data: card });
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') { throw new InvalidError('Invalid card'); }
      if (err.name === 'NotFound') { throw new NotFoundError('Card not found'); }
    })
    .catch(next);
}

function dislikeCard(req, res, next) {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } }, // remove _id from the array
    { new: true },
  )
    .then((card) => {
      if (!card) {
        res.status(404).send({ message: 'Card not found' });
      } else {
        return res.status(200).send({ data: card });
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') { throw new InvalidError('Invalid card'); }
      if (err.name === 'NotFound') { throw new NotFoundError('Card not found'); }
    })
    .catch(next);
}

module.exports = {
  getCards, createCard, deleteCard, likeCard, dislikeCard,
};
