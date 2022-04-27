const config = require("./../config/index");
const Autos = require("../bbdd/models/autos.model");
const Propietarios = require("../bbdd/models/propietarios.model");
const Colores = require('./../bbdd/models/colores.model');

exports.getAllAutos = async (req, res, next) => {
    try {
        const listado = await Autos.findAll({
            include: [
                {
                    model: Propietarios,
                    as: "propietario",
                    attributes: { exclude: ["createdAt", "updatedAt", "deletedAt"] },
                },
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
        return listado;
    } catch (error) {
        return error.message;
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
                    attributes: { exclude: ["createdAt", "updatedAt", "deletedAt"] },
                },
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
        return error.message;
    }
};

exports.postAuto = async (req, res) => {
    try {
        const auto = await Autos.create({
            año: req.body.año,
            patente: req.body.patente,
            color_id: req.body.color_id,
            propietario_id: req.body.propietario_id,
        })
        return auto;
    } catch (error) {
        return error.message;
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
        return error.message;
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
        return error.message;
    }
};