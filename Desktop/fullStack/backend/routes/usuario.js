const express = require('express');
const router = express.Router();

const { list, create, remove, userById, photo } = require('../controllers/usuariosController');

// list 
router.get('/usuarios', list);
router.post('/create', create)
router.get('/photo/:userId', photo);

router.delete('/:userId', remove)
router.param("userId", userById);


module.exports = router;