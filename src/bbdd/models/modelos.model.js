const { DataTypes } = require('sequelize');
const sequelize = require('./../config/config.bbdd')


const Modelos = sequelize.define('modelos', {
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    descripcion: {
        type: DataTypes.STRING,
        allowNull: true
    }
},
    {
        sequelize,
        timestamps: true,
        underscored: true,
        paranoid: true,
        tableName: 'modelos',
        charset: 'utf8',
        collate: 'utf8_general_ci'
    });



module.exports = Modelos;