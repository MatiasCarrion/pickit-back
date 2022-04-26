require('dotenv').config(); // carga el archivo .env

module.exports = {
    bbdd: {
        dbname: process.env.DBNAME,
        user: process.env.DBUSER,
        password: process.env.PASSWORD,
        host: process.env.HOST,
        dialect: process.env.DIALECT
    }
}
