const express =  require('express');
const router = express.Router();
const autosController = require('./../controllers/autos.controller');

router.get('/todos', autosController.getAllAutos);
router.get('/:patente', autosController.getUnAuto);
router.post('/agregar', autosController.postAuto);
router.put('/modificar/:id', autosController.putAuto);
router.delete('/eliminar/:id', autosController.deleteUnAuto);

module.exports = router;