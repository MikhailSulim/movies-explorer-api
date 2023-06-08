// схема и модель данных о пользователе для записи в БД
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// валидаторы
const isEmail = require('validator/lib/isEmail');

// импорт кастомного класса ошибки
const UnauthorizedError = require('../errors/UnauthorizedError');
const { MSG_INCORRECT_AUTH_DATA } = require('../utils/constants');

// создаём схему
const userSchema = new mongoose.Schema(
  {
    name: {
      // имя пользователя, например: Александр или Мария
      // Это обязательное поле-строка от 2 до 30 символов
      type: String,
      minlength: [2, 'длина имени пользователя менее двух символов'],
      maxlength: [30, 'длина имени пользователя более 30 символа'],
      required: [true, 'необходимо задать имя'],
    },
    email: {
      // почта пользователя, по которой он регистрируется
      // Это обязательное поле, уникальное для каждого пользователя
      // оно должно валидироваться на соответствие схеме электронной почты
      type: String,
      required: [true, 'необходимо задать логин пользователя'],
      unique: [true, 'необходимо уникальное значение логина'],
      validate: {
        validator: (email) => isEmail(email),
        message: 'это не адрес электронной почты',
      },
    },
    password: {
      // password — хеш пароля. Обязательное поле-строка.
      // Нужно задать поведение по умолчанию, чтобы база данных не возвращала это поле.
      type: String,
      required: [true, 'пароль должен быть обязательно'],
      minlength: [8, 'длина пароля должна быть не менее 8 символов'],
      select: false, // отключить выбор для передачи в res
    },
  },
  {
    toJSON: { useProjection: true },
    toObject: { useProjection: true },
    versionKey: false,
  }, // отключение оправления пароля при регистрации и создания поля _v
);

// метод findUserByCredentials
userSchema.statics.findUserByCredentials = function (email, password) {
  // принимает на вход два параметра — почту и пароль, возвращает объект пользователя или ошибку.
  /* Функция findUserByCredentials не должна быть стрелочной.
   Это сделано, чтобы мы могли пользоваться this. */

  // попытаемся найти пользователя по почте
  return this.findOne({ email }) // this — это модель User
    .select('+password')
    .then((user) => {
      // не нашёлся — отклоняем промис
      if (!user) {
        return Promise.reject(
          new UnauthorizedError(MSG_INCORRECT_AUTH_DATA),
        );
      }
      // нашёлся — сравниваем хеши
      return bcrypt.compare(password, user.password).then((matched) => {
        if (!matched) {
          return Promise.reject(
            new UnauthorizedError(MSG_INCORRECT_AUTH_DATA),
          );
        }
        return user;
      });
    });
};

// создаём модель
module.exports = mongoose.model('user', userSchema);
