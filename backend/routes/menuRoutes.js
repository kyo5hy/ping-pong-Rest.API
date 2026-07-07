const express = require('express');
const router = express.Router();
const menuController = require('../controllers/menuController');

// Mapeamento das rotas para o Controller (Organização RESTful)
router.get('/', menuController.getAllItems);
router.post('/', menuController.createItem);
router.put('/:id', menuController.updateItem);
router.delete('/:id', menuController.deleteItem);

module.exports = router;