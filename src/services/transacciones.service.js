const sequelize = require("../bbdd/config/config.bbdd");
const { Sequelize } = require('sequelize');
const detalleTransaccionController = require("./../controllers/detalle_transaccion.controller");
const Transancciones = require("./../bbdd/models/transacciones.model");

// exports.postTransaccion = async (req, res) => {
//     try {
//         const t = await sequelize.transaction();
//         const { cabecera, detalles } = req.body;
//         const fecha = new Date();
//         const transaccion = await Transancciones.create(
//             {
//                 fecha: fecha,
//                 auto_id: cabecera.auto_id,
//                 observacion: cabecera.observacion,
//             },
//             { transaction: t }
//         )
//             .then(async (result) => {
//                 for (let i = 0; i < detalles.length; i++) {
//                     const unDetalle = detalles[i];
//                     await detalleTransaccionController.postDetalle(result.id,unDetalle,t);
//                 }
//             })
//             .catch((error) => {
//                 return error.message;
//             });
//         await t.commit();
//         console.log(transaccion)
//         return transaccion;

//     } catch (error) {
//         t.rollback();
//         return error.message;
//     }
// };

exports.postTransaccion = async (req, res) => {
    try {
        const t = await sequelize.transaction();
        const { cabecera, detalles } = req.body;
        const fecha = new Date();
        const result_detalles = [];
        let presupuesto_total = 0;
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
        t.rollback();
        return error.message;
    }
};