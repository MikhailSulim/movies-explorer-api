const jwt = require('jsonwebtoken');

const { NODE_ENV, JWT_SECRET } = process.env;

// импорт кастомного класса ошибки
const UnauthorizedError = require('../errors/UnauthorizedError');

module.exports = (req, res, next) => {
  const token = req.cookies.jwt;

  // убеждаемся, что токен есть
  if (!token) {
    return next(new UnauthorizedError('Необходима авторизация'));
  }

  let payload; // объявляем эту переменную, чтобы она была видна вне блока try

  // верифицируем токен
  try {
    // пытаеся верифицировать
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'another-secret-key');
  } catch (err) {
    // если не получилось
    return next(new UnauthorizedError('Необходима авторизация'));
  }

  req.user = payload; // записываем пейлоуд в объект запроса

  return next(); // пропускаем запрос дальше
};
