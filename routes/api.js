const express = require('express');
const articleController = require('../controllers/articleController');

const router = express.Router();

router.get('/articles', articleController.getAll);
router.post('/articles', articleController.create);
router.get('/articles/:id', articleController.getById);
router.put('/articles/:id', articleController.updateById);
router.delete('/articles/:id', articleController.delete);

module.exports = router;