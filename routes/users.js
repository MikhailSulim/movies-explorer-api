// роутер для пользователей
const router = require('express').Router();

// импорт контроллеров
const {
  getCurrentUser,
  updateUser,
} = require('../controllers/users');

// роутеры
router.get('/me', getCurrentUser); // возвращает информацию о пользователе (email и имя)

router.patch('/me', updateUser); // обновляет информацию о пользователе (email и имя)

module.exports = router;
