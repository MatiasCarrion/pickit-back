const transaccionesService = require('./../services/transacciones.service');

exports.postTransaccion = async (req, res) => {
    try {
        const { cabecera, detalles } = req.body;
        if (!cabecera.auto_id, !detalles) {
            throw new Error('Faltan datos.')
        }
        const transaccion = await transaccionesService.postTransaccion(req, res);
        return res.status(200).send({
            success: true,
            message: 'OK',
            data: transaccion
        })
    } catch (error) {
        return error.message;
    }
}