const coloresService = require('../services/colores.service.js');

exports.getAllColores = async (req, res, next) => {
    try {
        const colores = await coloresService.getAllColores()
        return res.status(200).send({
            success: true,
            message: 'OK',
            data: colores
        })
    }
    catch (error) {
        console.log('Error ', error.message);
        return next(error)
    }
};