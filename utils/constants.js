// коды ошибок
const CODE_CREATED_201 = 201;
const CODE_BAD_REQUEST_400 = 400;
const CODE_UNAUTHORIZED_401 = 401;
const CODE_FORBIDDEN_403 = 403;
const CODE_NOT_FOUND_404 = 404;
const CODE_CONFLICT_409 = 409;
const CODE_SERVER_ERROR_500 = 500;
const CODE_DUPLICATE_ERROR_11000 = 11000;

// сообщения бо ошибках
const MSG_SERVER_ERROR = 'На сервере произошла ошибка';
const MSG_MOVIE_NOT_FOUND = 'Фильм с данным id не найден';
const MSG_DONT_DELETE_MOVIE = 'Вы не можете удалить этот фильм';
const MSG_MOVIE_DELETED = 'Фильм удалён';
const MSG_INCORRECT_MOVIE_ID = 'Некорректный id фильма';
const MSG_INCORRECT_MOVIE_DATA = 'Некорректные данные фильма: ';

const MSG_USER_NOT_FOUND = 'Пользователь с данным id не найден';
const MSG_INCORRECT_USER_DATA = 'Некорректные данные пользователя: ';
const MSG_USER_ALREADY_EXISTS = 'Пользователь с таким email уже существует';
const MSG_LOGOUT = 'Вы вышли из системы';

const MSG_NEED_AUTHORIZATION = 'Необходима авторизация';
const MSG_INCORRECT_AUTH_DATA = 'Неправильные почта или пароль';

const MSG_URL_NOT_FOUND = 'Запрашиваемый URL не существует';
const MSG_SERVER_STARTED = 'Server started on port';

const REGEX_URL = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/;
// /https?:\/\/w{0,3}\.?[\w0-9-]{1,10}\.\w{2,3}[\w\d\-._~:/?#[\]@!$&'()*+,;=]{0,}/m

const SECRET_CODE = 'another-secret-key';

module.exports = {
  CODE_CREATED_201,
  CODE_BAD_REQUEST_400,
  CODE_UNAUTHORIZED_401,
  CODE_FORBIDDEN_403,
  CODE_NOT_FOUND_404,
  CODE_CONFLICT_409,
  CODE_SERVER_ERROR_500,
  CODE_DUPLICATE_KEY_ERROR: CODE_DUPLICATE_ERROR_11000,
  MSG_SERVER_ERROR,
  MSG_MOVIE_NOT_FOUND,
  MSG_DONT_DELETE_MOVIE,
  MSG_MOVIE_DELETED,
  MSG_INCORRECT_MOVIE_ID,
  MSG_INCORRECT_MOVIE_DATA,
  MSG_USER_NOT_FOUND,
  MSG_INCORRECT_USER_DATA,
  MSG_USER_ALREADY_EXISTS,
  MSG_LOGOUT,
  MSG_NEED_AUTHORIZATION,
  MSG_INCORRECT_AUTH_DATA,
  MSG_URL_NOT_FOUND,
  MSG_SERVER_STARTED,
  REGEX_URL,
  SECRET_CODE,
};
