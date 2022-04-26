const express =  require('express');
const router = express.Router();
const autosController = require('./../controllers/autos.controller');

router.get('/todos', autosController.getAllAutos);

module.exports = router;