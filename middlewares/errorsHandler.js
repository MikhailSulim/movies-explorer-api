// централизованная обработка ошибок
const { CODE_SERVER_ERROR_500, MSG_SERVER_ERROR } = require('../utils/constants');

const errorsHandler = (err, req, res, next) => {
  // если у ошибки нет статуса, выставляем 500
  const { statusCode = 500, message } = err;

  res.status(statusCode).send({
    // проверяем статус и выставляем сообщение в зависимости от него
    message: statusCode === CODE_SERVER_ERROR_500 ? MSG_SERVER_ERROR : message,
  });
  next();
};

module.exports = errorsHandler;
