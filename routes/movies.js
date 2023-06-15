// роутер для выбранных фильмов
const router = require('express').Router();

// импорт валидаторов celebrate
const { movieDataValidator, movieIdValidator } = require('../middlewares/validtors/moviesValidator');

// импорт контроллеров
const {
  getMovies,
  createMovie,
  deleteMovie,
} = require('../controllers/movies');

// роутеры
router.get('/', getMovies); // возвращает все сохранённые текущим  пользователем фильмы

router.post('/', movieDataValidator, createMovie); // создаёт фильм с переданными в теле
// country, director, duration, year, description, image,
// trailer, nameRU, nameEN и thumbnail, movieId

router.delete('/:_id', movieIdValidator, deleteMovie); // удаляет сохранённый фильм по id

module.exports = router;
