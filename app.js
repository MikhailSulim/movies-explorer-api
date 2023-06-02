const express = require('express');
const mongoose = require('mongoose');

const cookieParser = require('cookie-parser');

const app = express();
const routes = require('./routes/index');
const { PORT, DB_URL } = require('./utils/config');

app.use(express.json()); // для взаимодействия с req.body, аналог body-parser
app.use(cookieParser()); // подключаем парсер кук как мидлвэр, для работы req.cookies

mongoose.connect(DB_URL, {
  // useNewUrlParser: true,
}); // с новых версий не обязательно добавлять опции

app.use(routes);

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
