const { DataTypes } = require('sequelize');
const sequelize = require('./../config/config.bbdd')

const Autos = sequelize.define('autos', {
    año: {
        type: DataTypes.INTEGER,
        allowNull: false,
        min: 1980,
        max: new Date().getFullYear()
    },
    patente: {
        type: DataTypes.STRING,
        allowNull: false
    }
},
{
    sequelize,
    timestamps: true,
    underscored: true,
    paranoid: true,
    tableName: 'autos',
    charset: 'utf8',
    collate: 'utf8_general_ci'
});


module.exports = Autos;