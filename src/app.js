import express      from 'express';
import { Server }   from 'http';
import bodyParser   from 'body-parser';
import pug          from 'pug'; 
import io           from 'socket.io';
import Routes       from './routes';
import mongoose     from 'mongoose';
import config       from './config';
import passport     from 'passport';
import session      from 'express-session';
import methodOverride from 'method-override';
import cookieParser from 'cookie-parser';
import {passport as PassportController} from './controllers/passport';
import rootDir from 'app-root-dir';

PassportController(passport);

mongoose.connect(config.db, ( err, res ) => {
    if (err) console.log(`DB: Error al conectar ${err}`);
    console.log('DB: Conectado.');
});

const port = process.env.PORT || 3000;
const app  = express();
const server = Server(app);

io(server);

/* Configuración especifica para el modo de desarrollo
 * 
 * Se le indica a express que sirva los archivos estaticos.
 * 
*/
if ( app.get('env') === 'development') {
    app.use(express.static(`${rootDir.get()}/assets`));
}

app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(methodOverride());
app.use(session({
    secret: "somosmonteriajs",
    resave: false,
    saveUninitialized: true 
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(Routes);

//Configuramos nuestro motor de vistas: pug
app.set('view cache', false);
app.engine('pug', pug.renderFile);
app.set('views', `${__dirname}/views`);
app.set('view engine', 'pug');

// Iniciamos un servidor de socket UNIX para escuchar conexiones en "port" 
server.listen(port, () => {
    console.log(`Servidor corriendo en el puerto ${port}`);
});