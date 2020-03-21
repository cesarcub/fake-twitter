const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');

/* GET users listing. */
router.get('/', userController.findAllUser);

/* GET by User ID */
router.get('/:idUser', userController.findUserById);

/* Post new User */
router.post('/', userController.createUser);


module.exports = router;