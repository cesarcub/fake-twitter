const express = require('express');
const router = express.Router();
const postController = require('../controllers/post.controller');

/* Get all tweets */
router.get('/', postController.listTweet);

/* Create a new tweet */
router.post('/', postController.createTweet);

/* Delete tweet by ID */
router.delete('/:idTweet', postController.deleteTweet);

module.exports = router;