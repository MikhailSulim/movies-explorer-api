const { CastError, ValidationError } = require('mongoose').Error;

const BadRequestError = require('../errors/BadRequestError');
const NotFoundError = require('../errors/NotFoundError');
const ForbiddenError = require('../errors/ForbiddenError');
const {
  CODE_CREATED_201,
  MSG_INCORRECT_MOVIE_DATA,
  MSG_MOVIE_NOT_FOUND,
  MSG_DONT_DELETE_MOVIE,
  MSG_MOVIE_DELETED,
  MSG_INCORRECT_MOVIE_ID,
} = require('../utils/constants');

const Movie = require('../models/movie');

exports.getMovies = (req, res, next) => {
  // функция возвращает все сохранённые текущим пользователем фильмы
  const owner = req.user._id;
  Movie.find({ owner })
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
        next(new BadRequestError(`${MSG_INCORRECT_MOVIE_DATA} ${errorMessage}`));
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
        throw new NotFoundError(MSG_MOVIE_NOT_FOUND);
      }
      if (userId !== movie.owner.toString()) {
        throw new ForbiddenError(MSG_DONT_DELETE_MOVIE);
      }
      return Movie.findByIdAndRemove(movieId)
        .then(() => res.send({ message: MSG_MOVIE_DELETED }));
    })
    .catch((err) => {
      if (err instanceof CastError) {
        next(new BadRequestError(MSG_INCORRECT_MOVIE_ID));
      } else {
        next(err);
      }
    });
};
