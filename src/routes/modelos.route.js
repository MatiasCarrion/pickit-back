const express = require('express');
const router = express.Router();
const modelosController = require('../controllers/modelos.controller');

router.get('/todos', modelosController.getAllModelos);

module.exports = router;