const express =  require('express');
const router = express.Router();
const autosController = require('./../controllers/autos.controller');

router.get('/todos', autosController.getAllAutos);
router.get('/:patente', autosController.getUnAuto);
router.post('/postAuto', autosController.postAuto);

module.exports = router;