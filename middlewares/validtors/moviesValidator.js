const { Joi, celebrate } = require('celebrate');
const { REGEX_URL } = require('../../utils/constants');

const movieDataValidator = celebrate({
  // валидируем тело запроса
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required().regex(REGEX_URL),
    trailerLink: Joi.string().required().regex(REGEX_URL),
    thumbnail: Joi.string().required().regex(REGEX_URL),
    movieId: Joi.number().required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  }),
});

const movieIdValidator = celebrate({
  // валидируем параметры id фильма
  params: Joi.object().keys({
    _id: Joi.string().length(24).hex().required(),
  }),
});

module.exports = {
  movieDataValidator,
  movieIdValidator,
};
