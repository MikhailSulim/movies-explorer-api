// схема и модель данных о фильме для записи в БД
const mongoose = require('mongoose');

// валидатор url
const isUrl = require('validator/lib/isURL');

// создаём схему
const movieSchema = new mongoose.Schema(
  {
    country: {
      // страна создания фильма. Обязательное поле-строка.
      type: String,
      required: [true, 'у фильма должна быть страна содания'],
    },
    director: {
      // режиссёр фильма. Обязательное поле-строка.
      type: String,
      required: [true, 'у фильма должен быть режиссёр'],
    },
    duration: {
      // длительность фильма. Обязательное поле-число.
      type: Number,
      required: [true, 'у фильма должна быть длительность'],
    },
    year: {
      // год выпуска фильма. Обязательное поле-строка.
      type: String,
      required: [true, 'у фильма должен быть год выпуска'],
    },
    description: {
      // описание фильма. Обязательное поле-строка.
      type: String,
      required: [true, 'у фильма должно быть описание'],
    },
    image: {
      // ссылка на постер к фильму. Обязательное поле-строка. Запишите её URL-адресом.
      type: String,
      required: [true, 'у фильма должна быть ссылка на постер'],
      validate: {
        validator: (link) => isUrl(link),
        message: 'ссылка на постер к фильму не валидна',
      },
    },
    trailerLink: {
      // ссылка на трейлер фильма. Обязательное поле-строка. Запишите её URL-адресом.
      type: String,
      required: [true, 'у фильма должна быть ссылка на трейлер'],
      validate: {
        validator: (link) => isUrl(link),
        message: 'ссылка на трейлер фильма не валидна',
      },
    },
    thumbnail: {
      // миниатюрное изображение постера к фильму.
      // Обязательное поле-строка. Запишите её URL-адресом.
      type: String,
      required: [true, 'у фильма должна быть ссылка на миниатюрное изображение постера'],
      validate: {
        validator: (link) => isUrl(link),
        message: 'ссылка на миниатюрное изображение постера к фильму не валидна',
      },
    },
    owner: {
      // _id пользователя, который сохранил фильм. Обязательное поле.
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
      required: [true, 'у фильма должен быть id сохранившего его пользователя'],
    },
    movieId: {
      // id фильма, который содержится в ответе сервиса MoviesExplorer.
      // Обязательное поле в формате number.
      type: Number,
      required: [true, 'у фильма должен быть id'],
    },
    nameRU: {
      // название фильма на русском языке. Обязательное поле-строка.
      type: String,
      required: [true, 'у фильма должно быть название на русском языке'],
    },
    nameEN: {
      // название фильма на английском языке. Обязательное поле-строка.
      type: String,
      required: [true, 'у фильма должно быть название на английском языке'],
    },
  },
  { versionKey: false }, // отключить создание поля _v
);

// создаём модель
module.exports = mongoose.model('movie', movieSchema);
