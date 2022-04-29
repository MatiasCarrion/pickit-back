const express = require('express');
const router = express.Router();
const marcasController = require('../controllers/marcas.controller');

router.get('/todas', marcasController.getAllMarcas);

module.exports = router;