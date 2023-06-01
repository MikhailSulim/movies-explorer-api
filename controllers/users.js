const { ValidationError } = require('mongoose').Error;
const NotFoundError = require('../errors/NotFoundError');
const BadRequestError = require('../errors/BadRequestError');
const User = require('../models/user');

exports.getCurrentUser = (req, res, next) => {
  // функция возвращающая информацию о пользователе
  const userId = req.user._id;

  User.findById(userId)
    .then((user) => res.send(user))
    .catch(next);
};

exports.updateUser = (req, res, next) => {
  // функция обновляющая информацию о пользователе
  const { _id: userId } = req.user;
  const { name } = req.body;
  User.findByIdAndUpdate(userId, { name }, {
    new: true,
    runValidators: true,
  })
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Пользователь с данным id не найден');
      }
      res.send(user);
    })
    .catch((err) => {
      if (err instanceof ValidationError) {
        const errorMessage = Object.values(err.errors)
          .map((error) => error.message)
          .join(' ');
        next(new BadRequestError(`Некорректные данные пользователя при обновлении профиля ${errorMessage}`));
      } else {
        next(err);
      }
    });
};
