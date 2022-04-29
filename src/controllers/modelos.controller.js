const modelosService = require('../services/modelos.service.js');

exports.getAllModelos = async (req, res, next) => {
    try {
        const modelos = await modelosService.getAllModelos()
        return res.status(200).send({
            success: true,
            message: 'OK',
            data: modelos
        })
    }
    catch (error) {
        console.log('Error ', error.message);
        return next(error)
    }
};