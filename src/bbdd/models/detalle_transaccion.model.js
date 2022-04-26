const { DataTypes } = require('sequelize');
const sequelize = require('./../config/config.bbdd')


const Detalle_Transaccion = sequelize.define('detalle_transaccion', {
    cantidad: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1
    },
    costo: {
        type: DataTypes.INTEGER,
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
        tableName: 'detalle_transaccion',
        charset: 'utf8',
        collate: 'utf8_general_ci'
    });



module.exports = Detalle_Transaccion;