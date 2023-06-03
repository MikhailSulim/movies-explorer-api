const { CastError, ValidationError } = require('mongoose').Error;

const BadRequestError = require('../errors/BadRequestError');
const NotFoundError = require('../errors/NotFoundError');
const ForbiddenError = require('../errors/ForbiddenError');
const { CODE_CREATED_201 } = require('../utils/constants');

const Movie = require('../models/movie');

exports.getMovies = (req, res, next) => {
  // функция возвращает все сохранённые текущим  пользователем фильмы
  Movie.find({})
    .then((movies) => res.send(movies))
    .catch(next);
};

exports.createMovie = (req, res, next) => {
  // функция создаёт фильм с переданными в теле
  // country, director, duration, year, description, image,
  // trailer, nameRU, nameEN и thumbnail, movieId
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
  } = req.body;

  const { _id: userId } = req.user;

  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
    owner: userId,
  })
    .then((movie) => movie.populate('owner'))
    .then((movie) => res.status(CODE_CREATED_201).send(movie))
    .catch((err) => {
      if (err instanceof ValidationError) {
        const errorMessage = Object.values(err.errors)
          .map((error) => error.message)
          .join(' ');
        next(new BadRequestError(`Некорректные данные фильма: ${errorMessage}`));
      } else {
        next(err);
      }
    });
};

exports.deleteMovie = (req, res, next) => {
  // функция удаляет сохранённый фильм по id
  const { _id: movieId } = req.params;
  const { _id: userId } = req.user;

  Movie.findById(movieId)
    .then((movie) => {
      if (!movie) {
        throw new NotFoundError('Фильм с данным id не найден');
      }
      if (userId !== movie.owner.toString()) {
        throw new ForbiddenError('Вы не можете удалить этот фильм');
      }
      return Movie.findByIdAndRemove(movieId)
        .then(() => res.send({ message: 'Фильм удалён' }));
    })
    .catch((err) => {
      if (err instanceof CastError) {
        next(new BadRequestError('Некорректный id фильма'));
      } else {
        next(err);
      }
    });
};
