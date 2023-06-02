const { ValidationError } = require('mongoose').Error;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const NotFoundError = require('../errors/NotFoundError');
const BadRequestError = require('../errors/BadRequestError');
const ConflictError = require('../errors/ConflictError');

const User = require('../models/user');

const { NODE_ENV, JWT_SECRET } = process.env;
const { CODE_CREATED_201 } = require('../utils/constants');

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

exports.createUser = (req, res, next) => {
  // функция создания нового пользователя
  const {
    name,
    email,
    password,
  } = req.body;

  // хешируем пароль
  bcrypt.hash(password, 10).then((hash) => User.create({
    name,
    email,
    password: hash,
  })
    .then((user) => {
      res.status(CODE_CREATED_201).send(user);
    })
    .catch((err) => {
      if (err.code === 11000) {
        next(new ConflictError('Пользователь с таким email уже существует'));
        return;
      }

      if (err instanceof ValidationError) {
        const errorMessage = Object.values(err.errors)
          .map((error) => error.message)
          .join(' ');
        next(new BadRequestError(`Некорректные данные пользователя: ${errorMessage}`));
      } else {
        next(err);
      }
    }));
};

exports.login = (req, res, next) => {
  // функция авторизации пользователя
  const { email, password } = req.body;

  User.findUserByCredentials(email, password)
    .then((user) => {
      // создадим токен
      const token = jwt.sign(
        { _id: user._id }, // пейлоуд токена
        NODE_ENV === 'production' ? JWT_SECRET : 'another-secret-key', // секретный ключ подписи
        { expiresIn: '7d' }, // токен просрочится через 7 дней
      );
      res
        .cookie('jwt', token, {
          maxAge: 3600000,
          httpOnly: true,
          sameSite: true,
        })
        .send({ token });
    })
    .catch(next);
};

exports.logout = (req, res) => {
  // функция выхода из системы авторизации
  res.clearCookie('jwt').send({ message: 'Вы вышли из системы' });
};
