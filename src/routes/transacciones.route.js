const express = require('express');
const router = express.Router();
const transaccionesController = require('./../controllers/transacciones.controller');

router.post('/agregar', transaccionesController.postTransaccion);

module.exports = router;