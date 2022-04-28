const Propietarios = require("../bbdd/models/propietarios.model");

exports.postPropietario = async (req, res) => {
    try {
        const { nombre, apellido, telefono, mail } = req.body;
        const propietario = await Propietarios.create({
            nombre: nombre,
            apellido: apellido,
            telefono: telefono,
            mail: mail
        })
        return propietario;
    } catch (error) {
        console.log("Error"+error.message);
        throw new Error(error.message);
    }
};