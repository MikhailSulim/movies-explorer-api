const express = require('express');
const mongoose = require('mongoose');

// мидлвэры
const cookieParser = require('cookie-parser');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const errorsHandler = require('./middlewares/errorsHandler');

const app = express();
const routes = require('./routes/index');
const { PORT, DB_URL } = require('./utils/config');

app.use(express.json()); // для взаимодействия с req.body, аналог body-parser
app.use(cookieParser()); // подключаем парсер кук как мидлвэр, для работы req.cookies

mongoose.connect(DB_URL, {
  // useNewUrlParser: true,
}); // с новых версий не обязательно добавлять опции

app.use(requestLogger); // подключаем логгер запросов

app.use(routes); // все роуты

app.use(errorLogger); // подключаем логгер ошибок

app.use(errorsHandler); // централизованный обработчик ошибок
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
