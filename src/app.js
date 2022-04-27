const express = require('express');
const port = process.env.PORT || 3000;
const app = express();
const sequelize = require("./bbdd/config/config.bbdd");
const cors = require('cors');
require('dotenv').config();
const bodyParser = require('body-parser');

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ limit: '50mb' }))
require('./bbdd/config/associations.bbdd')

// rutas
app.use('/api/autos', require('./routes/autos.route.js'));
app.use('/api/propietarios', require('./routes/propietarios.route.js'));

app.listen(port, (error) => {
    if (error) {
        console.log("Error al iniciar el servidor.")
    }
    else {
        console.log(`Escuchando en puerto ${port}`)
        conectarse();
    }
})


async function conectarse() {
    console.log('Iniciando conexión a base de datos...')
    try {
        await sequelize.sync({ force: false });
        console.log('Conexión exitosa.');
      } catch (error) {
        console.error('Error en conexión:', error.message);
      }
}