'use strict';

const express           = require('express');
const app               = module.exports = express();
const server            = require('http').Server(app);
const port              = process.env.PORT || 3000;
const bodyParser        = require('body-parser');
const pug               = require('pug');
const io                = require('socket.io')(server);
const routes            = require('./app/routes/index.js');

app.use(express.static(`${__dirname}/assets`));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.engine('pug', pug.renderFile);
app.set('views', './app/views');
app.set('view engine', 'pug');

server.listen(port, () => {
    console.log('Servidor corriendo en el puerto ' + port);
});