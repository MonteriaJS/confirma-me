'use strict';

const express           = require('express');
const app               = module.exports = express();
const server            = require('http').Server(app);
const port              = process.env.PORT || 3000;
const bodyParser        = require('body-parser');
const pug               = require('pug');
const io                = require('socket.io')(server);

//Llamada a las rutas
require('./app/routes/index.js');

/* Configuración especifica para el modo de desarrollo
 * 
 * Se le indica a express que sirva los archivos estaticos.
 * 
*/
if ( app.get('env') === 'development') {
    app.use(express.static(`${__dirname}/assets`));
}

app.use(bodyParser.urlencoded({ extended: false }));

//Configuramos nuestro motor de vistas: pug
app.engine('pug', pug.renderFile);
app.set('views', './app/views');
app.set('view engine', 'pug');

// Iniciamos un servidor de socket UNIX para escuchar conexiones en "port" 
server.listen(port, () => {
    console.log('Servidor corriendo en el puerto ' + port);
});