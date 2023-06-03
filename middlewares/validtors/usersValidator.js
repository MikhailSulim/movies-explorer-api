const { Joi, celebrate } = require('celebrate');

const userSignupValidator = celebrate({
  // валидируем параметры при регистрации пользователя
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
});

const userSigninValidator = celebrate({
  // валидируем параметры при авторизации пользователя
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
});

const userDataValidator = celebrate({
  // валидируем данные пользователя - имя и email
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    email: Joi.string().required().email(),
  }),
});

module.exports = {
  userSignupValidator,
  userSigninValidator,
  userDataValidator,
};
