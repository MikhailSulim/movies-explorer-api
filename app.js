const express = require('express');
const mongoose = require('mongoose');

require('dotenv').config(); // для работы с переменными окружения

// мидлвэры
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const { errors } = require('celebrate');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const errorsHandler = require('./middlewares/errorsHandler');
const cors = require('./middlewares/cors');
const limiter = require('./middlewares/limiter');

const app = express();
const routes = require('./routes/index');
const { PORT, DB_URL } = require('./utils/config');

app.use(express.json()); // для взаимодействия с req.body, аналог body-parser
app.use(cookieParser()); // подключаем парсер кук как мидлвэр, для работы req.cookies

mongoose.connect(DB_URL, {
  // useNewUrlParser: true,
}); // с новых версий не обязательно добавлять опции

app.use(cors);

// мидлвэры безопасности
app.use(helmet()); // для автоматической проставки заголовков безопасности
app.use(limiter); // для предотвращения ddos aтак

app.use(requestLogger); // подключаем логгер запросов

app.use(routes); // все роуты

app.use(errorLogger); // подключаем логгер ошибок

app.use(errors()); // обработчик ошибок celebrate
app.use(errorsHandler); // централизованный обработчик ошибок
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
