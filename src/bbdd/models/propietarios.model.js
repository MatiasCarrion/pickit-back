const { DataTypes } = require('sequelize');
const sequelize = require('./../config/config.bbdd')


const Propietarios = sequelize.define('propietarios', {
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    apellido: {
        type: DataTypes.STRING,
        allowNull: false
    },
    telefono: {
        type: DataTypes.STRING,
        allowNull: false
    },
    mail: {
        type: DataTypes.STRING,
        allowNull: true
    }
},
    {
        sequelize,
        timestamps: true,
        underscored: true,
        paranoid: true,
        tableName: 'propietarios',
        charset: 'utf8',
        collate: 'utf8_general_ci'
    });



module.exports = Propietarios;