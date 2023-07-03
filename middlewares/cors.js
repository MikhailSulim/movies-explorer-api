// функция-обработчик cors - кросс-доменного доступа к api

// массив доменов, с которых разрешены кросс-доменные запросы
const allowedCors = [
  'https://sulim.yp-diploma.nomoredomains.rocks',
  'http://sulim.yp-diploma.nomoredomains.rocks',
  'https://localhost:3000',
  'http://localhost:3000',
];

module.exports = (req, res, next) => {
  const { origin } = req.headers; // сохраняем источник запроса в переменную origin
  const { method } = req; // сохраняем тип запроса (HTTP-метод) в соответствующую переменную
  const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE'; // Значение для заголовка Access-Control-Allow-Methods по умолчанию (разрешены все типы запросов)
  const requestHeaders = req.headers['access-control-request-headers']; // сохраняем список заголовков исходного запроса

  res.header('Access-Control-Allow-Credentials', true); // указывает, разрешена ли отправка файлов cookie

  // проверяем, что источник запроса есть среди разрешённых
  if (allowedCors.includes(origin)) {
    // устанавливаем заголовок, которые разрешает браузеру запросы с этого источника
    res.header('Access-Control-Allow-Origin', origin);
  }

  // если это предварительный запрос, добавляем нужные заголовки
  if (method === 'OPTIONS') {
    // разрешаем кросс-доменные запросы любых типов (по умолчанию)
    res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);

    // разрешаем кросс-доменные запросы с этими заголовками
    res.header('Access-Control-Allow-Headers', requestHeaders);

    // завершаем обработку запроса и возвращаем результат клиенту
    return res.end();
  }

  return next();
};
