const { DataTypes } = require('sequelize');
const sequelize = require('./../config/config.bbdd')


const Servicios = sequelize.define('servicios', {
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    descripcion: {
        type: DataTypes.STRING,
        allowNull: true
    },
    costo: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
},
    {
        sequelize,
        timestamps: true,
        underscored: true,
        paranoid: true,
        tableName: 'servicios',
        charset: 'utf8',
        collate: 'utf8_general_ci'
    });



module.exports = Servicios;