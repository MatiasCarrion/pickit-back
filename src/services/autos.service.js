const Autos = require("../bbdd/models/autos.model");
const Propietarios = require("../bbdd/models/propietarios.model");
const Colores = require('./../bbdd/models/colores.model');
const Marcas = require('./../bbdd/models/marcas.model');
const Modelos = require('./../bbdd/models/modelos.model');

exports.getAllAutos = async (req, res, next) => {
    try {
        const listado = await Autos.findAll({
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
        });
        return listado;
    } catch (error) {
        throw new Error(error.message);
    }
};

exports.getUnAuto = async (req, res, next) => {
    try {
        const patente = req.params.patente;
        const auto = await Autos.findAll({
            where: { patente: patente },
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
        });
        return auto;
    } catch (error) {
        throw new Error(error.message);
    }
};

exports.postAuto = async (req, res) => {
    try {
        const { año, patente, color_id, propietario_id } = req.body;
        const auto = await Autos.create({
            año: año,
            patente: patente,
            color_id: color_id,
            propietario_id: propietario_id,
        })
        return auto;
    } catch (error) {
        throw new Error(error.message);
    }
};

exports.updateUnAuto = async (req, res) => {
    try {
        const id = req.params.id;
        const { año, patente, color_id, propietario_id } = req.body;
        const rows = await Autos.update({
            año: año,
            patente: patente,
            color_id: color_id,
            propietario_id: propietario_id,
        }, {
            where: { id: id }
        });

        return rows;

    } catch (error) {
        throw new Error(error.message);
    }
};

exports.deleteUnAuto = async (req, res) => {
    try {
        const id = req.params.id;
        const rows = await Autos.destroy({
            where: {id: id}
        });
        return rows;

    } catch (error) {
        throw new Error(error.message);
    }
};

exports.getUnAutoInterno = async (id) => {
    try {
        const auto = await Autos.findAll({
            where: { id: id },
            include: [
                {
                    model: Colores,
                    as: "color",
                    attributes: { exclude: ["createdAt", "updatedAt", "deletedAt"] },
                }
            ],
            attributes: {
                exclude: ["createdAt", "updatedAt", "deletedAt", "propietario_id", "color_id"],
            },
        });
        return auto;
    } catch (error) {
        throw new Error(error.message);
    }
};