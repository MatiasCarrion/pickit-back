const propietariosService = require('../services/propietarios.service')

exports.postPropietario = async (req, res, next) => {
    try {
        const { nombre, apellido, telefono, mail } = req.body;

        if (!nombre, !apellido, !telefono, !mail) {
            throw new Error('Faltan datos.')
        }
        const propietario = await propietariosService.postPropietario(req, res);
        return res.status(200).send({
            success: true,
            message: 'OK',
            data: propietario
        })
    }
    catch (error) {
        console.log('Error ', error.message);
        return next(error);
    }
};