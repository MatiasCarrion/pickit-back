const { DataTypes } = require('sequelize');
const sequelize = require('./../config/config.bbdd')


const Marcas = sequelize.define('marcas', {
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    }
},
    {
        sequelize,
        timestamps: true,
        underscored: true,
        paranoid: true,
        tableName: 'marcas',
        charset: 'utf8',
        collate: 'utf8_general_ci'
    });



module.exports = Marcas;