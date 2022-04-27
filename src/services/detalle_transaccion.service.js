const DetalleTransaccion = require('./../bbdd/models/detalle_transaccion.model');

exports.postDetalle = async (id_transaccion, data, t) => {
    try {
        const  { cantidad, costo_unitario, observacion, servicio_id } = data;
        const detalle = await DetalleTransaccion.create({
            cantidad: cantidad,
            costo_unitario: costo_unitario,
            observacion: observacion,
            servicio_id: servicio_id,
            transaccion_id: id_transaccion
        },
        {transaction: t})
        return detalle;
    } catch (error) {
     return error.message;   
    }
}