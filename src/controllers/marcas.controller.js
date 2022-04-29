const marcasService = require('../services/marcas.service.js');

exports.getAllMarcas = async (req, res, next) => {
    try {
        const marcas = await marcasService.getAllMarcas()
        return res.status(200).send({
            success: true,
            message: 'OK',
            data: marcas
        })
    }
    catch (error) {
        console.log('Error ', error.message);
        return next(error)
    }
};