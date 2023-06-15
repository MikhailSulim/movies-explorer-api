// обобщённый роутер для фильмов и пользователей
const router = require('express').Router();

const users = require('./users');
const movies = require('./movies');

// импорт валидаторов celebrate
const { userSignupValidator, userSigninValidator } = require('../middlewares/validtors/usersValidator');

// импорт мидлвэра авторизации
const auth = require('../middlewares/auth');
const { createUser, login, logout } = require('../controllers/users');
const NotFoundError = require('../errors/NotFoundError');
const { MSG_URL_NOT_FOUND } = require('../utils/constants');

// роуты без авторизации
router.post('/signup', userSignupValidator, createUser);
router.post('/signin', userSigninValidator, login);

// роуты с авторизацией
router.use('/users', auth, users);
router.use('/movies', auth, movies);
router.get('/signout', auth, logout);

// роут для любых ругих/несуществующих путей
router.use('*', (req, res, next) => {
  next(new NotFoundError(MSG_URL_NOT_FOUND));
});

module.exports = router;
