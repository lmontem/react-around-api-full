const { celebrate, Joi } = require('celebrate');

function validateCard() {
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().required().min(2).max(30),
      link: Joi.string().required().link(),
      owner: Joi.object(),
      likes: Joi.object(),
      createdAt: Joi.date(),
    }),
  });
}

function validateUser() {
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().required().min(2).max(30),
      about: Joi.string().required().min(2).max(30),
      avatar: Joi.string().required().link(),
      email: Joi.string().required().email(),
      password: Joi.string().required().min(8),
    }),
  });
}

module.exports = { validateCard, validateUser };
