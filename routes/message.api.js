const express = require('express');
const router = express.Router();
const messageController = require('../controllers/message.controller');

/* Get message by receptor ID */
router.get('/:idReceptor', messageController.getMessageUsers);

/* Send message */
router.post('/', messageController.sendMessage);

module.exports = router;