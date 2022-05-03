const express = require('express');
const router = express.Router();
const propietariosController = require('./../controllers/propietarios.controller');

router.get('/todos', propietariosController.getAllPropietarios);
router.post('/agregar', propietariosController.postPropietario);

module.exports = router;