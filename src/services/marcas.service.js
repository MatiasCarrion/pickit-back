const Marcas = require("../bbdd/models/marcas.model");

exports.getAllMarcas = async (req, res, next) => {
    try {
        const listado = await Marcas.findAll({
            attributes: {
                exclude: ["createdAt", "updatedAt", "deletedAt"],
            }
        });
        return listado;
    } catch (error) {
        throw new Error(error.message);
    }
};