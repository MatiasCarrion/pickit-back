const Modelos = require("../bbdd/models/modelos.model");

exports.getAllModelos = async (req, res, next) => {
    try {
        const listado = await Modelos.findAll({
            attributes: {
                exclude: ["createdAt", "updatedAt", "deletedAt"],
            }
        });
        return listado;
    } catch (error) {
        throw new Error(error.message);
    }
};