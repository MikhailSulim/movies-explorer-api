// обобщённый роутер для фильмов и пользователей
const router = require('express').Router();

const users = require('./users');
const movies = require('./movies');

// импорт мидлвэра авторизации
const auth = require('../middlewares/auth');
const { createUser, login, logout } = require('../controllers/users');
const NotFoundError = require('../errors/NotFoundError');

// роуты без авторизации
router.post('/signup', createUser);
router.post('/signin', login);

// роуты с авторизацией
router.use('/users', auth, users);
router.use('/movies', auth, movies);
router.get('/signout', auth, logout);

// роут для любых ругих/несуществующих путей
router.use('*', (req, res, next) => {
  next(new NotFoundError('Запрашиваемый URL не существует'));
});

module.exports = router;
