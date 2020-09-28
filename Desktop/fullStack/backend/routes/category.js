const express = require('express');
const router = express.Router();
const {userById} = require('../controllers/authController');

const { list, create, remove, update, categoryById } = require('../controllers/categoryController');

router.get('/categories', list);
router.post('/create/', create);
router.delete('/:categoryId/', remove);
router.put('/update/:categoryId/', update);

router.param('categoryId', categoryById);
router.param('userId', userById);

module.exports = router;