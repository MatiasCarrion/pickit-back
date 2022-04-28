const sequelize = require("../bbdd/config/config.bbdd");
const detalleTransaccionController = require("./../controllers/detalle_transaccion.controller");
const autosController = require('./../controllers/autos.controller');
const Transancciones = require("./../bbdd/models/transacciones.model");
const Detalle_Transaccion = require("../bbdd/models/detalle_transaccion.model");
const Propietarios = require("../bbdd/models/propietarios.model");
const Colores = require("../bbdd/models/colores.model");
const Autos = require("../bbdd/models/autos.model");
const Modelos = require("../bbdd/models/modelos.model");
const Servicios = require("../bbdd/models/servicios.model");
const Marcas = require("../bbdd/models/marcas.model");

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
        throw new Error(error.message);
    }
};

exports.getHistoricoPorAuto = async (req, res, next) => {
    try {
        const id = req.params.id;
        const auto = await Transancciones.findAll({
            where: { auto_id: id },
            include: [
                {
                    model: Autos,
                    as: "auto",
                    include: [
                        {
                            model: Propietarios,
                            as: "propietario",
                            attributes: { exclude: ["createdAt", "updatedAt", "deletedAt", "id"] },
                        },
                        {
                            model: Colores,
                            as: "color",
                            attributes: { exclude: ["createdAt", "updatedAt", "deletedAt","id"] },
                        },
                        {
                            model: Marcas,
                            as: "marca",
                            include: [
                                {
                                    model: Modelos,
                                    as: "modelo",
                                    attributes: { exclude: ["createdAt", "updatedAt", "deletedAt","id","marca_id"] },
                                }
                            ],
                            attributes: { exclude: ["createdAt", "updatedAt", "deletedAt","id","auto_id"] },
                        }
                    ],
                    attributes: {
                        exclude: ["createdAt", "updatedAt", "deletedAt", "propietario_id", "color_id"],
                    }
                },
                {
                    model: Detalle_Transaccion,
                    as: "detalle_transaccion",
                    include: [
                        {
                            model: Servicios,
                            as: "servicio",
                            attributes: { exclude: ["createdAt", "updatedAt", "deletedAt","id"] },
                        }
                    ],
                    attributes: { exclude: ["createdAt", "updatedAt", "deletedAt", "id","transaccion_id","servicio_id"] },
                }
            ],
            attributes: {
                exclude: ["createdAt", "updatedAt", "deletedAt","auto_id"],
            },
        });
        return auto;
    } catch (error) {
        throw new Error(error.message);
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