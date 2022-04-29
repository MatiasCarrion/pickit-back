const Colores = require("../bbdd/models/colores.model");

exports.getAllColores = async (req, res, next) => {
    try {
        const listado = await Colores.findAll({
            attributes: {
                exclude: ["createdAt", "updatedAt", "deletedAt"],
            }
        });
        return listado;
    } catch (error) {
        throw new Error(error.message);
    }
};