const autosService = require('./../services/autos.service');


exports.getAllAutos = async (req, res, next) => {
    try {
        const autos = await autosService.getAllAutos()
        return res.status(200).send({
            success: true,
            message: 'OK',
            data: autos
        })
    }
    catch (error) {
        console.log('Error ', error.message);
        return res.status(500).send({
            success: false,
            message: 'Operación fallida'
        })
    }
};

exports.getUnAuto = async (req, res, next) => {
    try {
        const auto = await autosService.getUnAuto(req, res)
        return res.status(200).send({
            success: true,
            message: 'OK',
            data: auto
        })
    }
    catch (error) {
        console.log('Error ', error.message);
        return res.status(500).json({
            success: false,
            message: 'Operación fallida'
        })
    }
};

exports.postAuto = async (req, res, next) => {
    try {
        const { año, patente, color_id, propietario_id } = req.body;

        if (!año, !patente, !color_id, !propietario_id) {
            throw new Error('Faltan datos.')
        }
        const auto = await autosService.postAuto(req, res);
        return res.status(200).send({
            success: true,
            message: 'OK',
            data: auto
        })
    }
    catch (error) {
        console.log('Error ', error.message);
        return res.status(500).json({
            success: false,
            message: 'Operación fallida'
        })
    }
};

exports.putAuto = async (req, res, next) => {
    try {
        const { año, patente, color_id, propietario_id } = req.body;

        if (!año, !patente, !color_id, !propietario_id) {
            throw new Error('Faltan datos.')
        }
        const rows = await autosService.updateUnAuto(req, res);
        return res.status(200).send({
            success: true,
            message: 'OK',
            rows: rows[0]
        })
    }
    catch (error) {
        console.log('Error ', error.message);
        return res.status(500).json({
            success: false,
            message: 'Operación fallida'
        })
    }
};