const Autos = require('./../models/autos.model');
const Marcas = require('./../models/marcas.model');
const Modelos = require('./../models/modelos.model');
const Colores = require('./../models/colores.model');
const Propietarios = require('../models/propietarios.model');
const Transacciones = require('../models/transacciones.model');
const Detalle_Transaccion = require('../models/detalle_transaccion.model');
const Servicios = require('../models/servicios.model');

// Auto con Marca
// Marcas.hasOne(Autos, {as:'auto', foreignKey: 'id'});
// Autos.belongsTo(Marcas, {as: 'marca', foreignKey: 'marca_id'});
Autos.hasOne(Marcas, {as:'marca', foreignKey: 'auto_id'});
Marcas.belongsTo(Autos, {as: 'auto', foreignKey: 'auto_id'});
// Marca con Modelo
// Modelos.hasOne(Marcas, {as:'marca', foreignKey: 'id'});
// Marcas.belongsTo(Modelos, {as: 'modelo', foreignKey: 'modelo_id'});
Marcas.hasOne(Modelos, {as:'modelo', foreignKey: 'marca_id'});
Modelos.belongsTo(Marcas, {as: 'marca', foreignKey: 'marca_id'});
// Autos con Colores
Colores.hasMany(Autos, {as: 'auto', foreignKey: 'color_id'});
Autos.belongsTo(Colores, {as: 'color', foreignKey: 'color_id'});
// Propietarios con Autos
Propietarios.hasMany(Autos, {as: 'auto', foreignKey: 'propietario_id'});
Autos.belongsTo(Propietarios, {as: 'propietario', foreignKey: 'propietario_id'});
// Transaccion con Detalle_Transaccion
Transacciones.hasMany(Detalle_Transaccion, {as: 'detalle_transaccion', foreignKey: 'transaccion_id'});
Detalle_Transaccion.belongsTo(Transacciones, {as: 'transaccion', foreignKey: 'transaccion_id'});
// Detalle_transaccion con Servicio
Servicios.hasMany(Detalle_Transaccion, {as: 'detalle_transaccio', foreignKey: 'servicio_id'});
Detalle_Transaccion.belongsTo(Servicios, {as: 'servicio', foreignKey: 'servicio_id'});
// Transaccion con Auto
Autos.hasMany(Transacciones, {as: 'transaccion', foreignKey: 'auto_id'});
Transacciones.belongsTo(Autos, {as: 'auto', foreignKey: 'auto_id'});
