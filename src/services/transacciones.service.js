const sequelize = require("../bbdd/config/config.bbdd");
const { Sequelize } = require('sequelize');
const detalleTransaccionController = require("./../controllers/detalle_transaccion.controller");
const autosController = require('./../controllers/autos.controller');
const Transancciones = require("./../bbdd/models/transacciones.model");

exports.postTransaccion = async (req, res) => {
    const t = await sequelize.transaction();
    try {
        const { cabecera, detalles } = req.body;
        const fecha = new Date();
        const result_detalles = [];
        let presupuesto_total = 0;
        const auto = await autosController.getUnAutoInterno(cabecera.auto_id);
        if (!validarPinturaAutoGris(auto, detalles)) {
            throw new Error('No se puede aplicar pintura a los autos grises.')
        }
        const transaccion = await Transancciones.create(
            {
                fecha: fecha,
                auto_id: cabecera.auto_id,
                observacion: cabecera.observacion,
            },
            { transaction: t }
        );
        for (let i = 0; i < detalles.length; i++) {
            const unDetalle = detalles[i];
            result_detalles.push(await detalleTransaccionController.postDetalle(transaccion.id, unDetalle, t));
            presupuesto_total += (unDetalle.costo_unitario * unDetalle.cantidad);
        }

        await t.commit();
        return {costo_total: presupuesto_total,cabecera: transaccion, detalles: result_detalles};

    } catch (error) {
        await t.rollback();
        throw new Error(error.message)
    }
};

function validarPinturaAutoGris(auto, detalles) {
    let esta_ok = true;
    if (auto[0].dataValues.color.dataValues.nombre == "Gris") {
        detalles.map(unDetalle => {
            if (unDetalle.servicio_id === 5) {
                esta_ok = false;
                return esta_ok;
            }
        })
    }
    return esta_ok;
}