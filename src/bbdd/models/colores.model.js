const { DataTypes } = require('sequelize');
const sequelize = require('./../config/config.bbdd')


const Colores = sequelize.define('colores', {
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    descripcion: {
        type: DataTypes.STRING,
        allowNull: true
    },
    codigo_HTML: {
        type: DataTypes.STRING,
        allowNull: true
    }
},
    {
        sequelize,
        timestamps: true,
        underscored: true,
        paranoid: true,
        tableName: 'colores',
        charset: 'utf8',
        collate: 'utf8_general_ci'
    });



module.exports = Colores;