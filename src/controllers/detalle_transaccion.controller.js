const detalleTransaccionService = require('./../services/detalle_transaccion.service');

exports.postDetalle = async (id_transaccion, data, sequelize_transaction) => {
    try {
        const  { cantidad, costo_unitario, observacion, servicio_id } = data;
        if (!id_transaccion, !cantidad, !costo_unitario, !observacion, !servicio_id, !sequelize_transaction) {
            throw new Error('Faltan datos.')
        }
        const detalle = await detalleTransaccionService.postDetalle(id_transaccion, data, sequelize_transaction);
        return detalle;
    } catch (error) {
     return error.message;   
    }
}