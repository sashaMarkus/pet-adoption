const express = require('express');
const { getPosts, createPost, updatePost, deletePost } = require('../controllers/posts.js');
const router = express.Router();
const auth = require('../middleware/auth');

router.get('/', getPosts);
router.post('/', createPost);
router.patch('/:id', auth, updatePost);
router.delete('/:id', auth, deletePost);


module.exports = router;