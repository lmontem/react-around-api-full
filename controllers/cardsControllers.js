const Card = require('../models/card');

function getCards(req, res) {
  Card.find({})
    .then((card) => { res.status(200).send({ data: card }); })
    .catch(() => res.status(500).send({ message: 'Error' }));
}

function createCard(req, res) {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.name === 'ValidationError') { return res.status(400).send({ message: 'Invalid data' }); }
      return res.status(500).send({ message: 'Error' });
    });
}

function deleteCard(req, res) {
  Card.findByIdAndRemove(req.params.cardId)
    .then((card) => {
      if (!card) {
        res.status(404).send({ message: 'Card not found' });
      } else {
        return res.status(200).send({ message: 'Card deleted' });
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') { return res.status(400).send({ message: 'Invalid card' }); }
      if (err.name === 'NotFound') { return res.status(404).send({ message: 'Card not found' }); }
      return res.status(500).send({ message: 'Error' });
    });
}

function likeCard(req, res) {
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
      if (err.name === 'CastError') { return res.status(400).send({ message: 'Invalid card' }); }
      if (err.name === 'NotFound') { return res.status(404).send({ message: 'Card not found' }); }
      return res.status(500).send({ message: 'Error' });
    });
}

function dislikeCard(req, res) {
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
      if (err.name === 'CastError') { return res.status(400).send({ message: 'Invalid card' }); }
      if (err.name === 'NotFound') { return res.status(404).send({ message: 'Card not found' }); }
      return res.status(500).send({ message: 'Error' });
    });
}

module.exports = {
  getCards, createCard, deleteCard, likeCard, dislikeCard,
};
