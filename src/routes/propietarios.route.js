const express = require('express');
const router = express.Router();
const propietariosController = require('./../controllers/propietarios.controller');

router.post('/agregar', propietariosController.postPropietario);

module.exports = router;