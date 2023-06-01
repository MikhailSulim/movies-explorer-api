const express = require('express');
const mongoose = require('mongoose');

const app = express();
const routes = require('./routes/index');
const { PORT, DB_URL } = require('./utils/config');

mongoose.connect(DB_URL, {
  // useNewUrlParser: true,
}); // с новых версий не обязательно добавлять опции

app.use(routes);

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
