// роутер для пользователей
const router = require('express').Router();

// импорт валидаторов celebrate
const { userDataValidator } = require('../middlewares/validtors/usersValidator');

// импорт контроллеров
const {
  getCurrentUser,
  updateUser,
} = require('../controllers/users');

// роутеры
router.get('/me', getCurrentUser); // возвращает информацию о пользователе (email и имя)

router.patch('/me', userDataValidator, updateUser); // обновляет информацию о пользователе (email и имя)

module.exports = router;
