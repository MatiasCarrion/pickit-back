const express =  require('express');
const router = express.Router();
const autosController = require('./../controllers/autos.controller');

router.get('/todos', autosController.getAllAutos);
router.get('/:patente', autosController.getUnAuto);
router.post('/agregarAuto', autosController.postAuto);
router.put('/modificarAuto/:id', autosController.putAuto);

module.exports = router;