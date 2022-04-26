const { DataTypes } = require('sequelize');
const sequelize = require('../config/config.bbdd')


const Transacciones = sequelize.define('transacciones', {
    fecha: {
        type: DataTypes.DATE,
        allowNull: false
    },
    observacion: {
        type: DataTypes.STRING,
        allowNull: true
    }
},
    {
        sequelize,
        timestamps: true,
        underscored: true,
        paranoid: true,
        tableName: 'transacciones',
        charset: 'utf8',
        collate: 'utf8_general_ci'
    });



module.exports = Transacciones;