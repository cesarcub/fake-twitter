const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

//Importar rutas
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users.api');
const tweetsRouter = require('./routes/post.api');


//Importar db.manager
const dbManager = require('./database/db.manager');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/tweets', tweetsRouter);

dbManager.sequelizeCx.authenticate().then(() => {
    console.log('Conexión realizada');
    dbManager.sequelizeCx.sync().then(() => {
        console.log('BD sincronizada');
    });
}).catch( error => {
    console.log('Error al conectar BD');
});


module.exports = app;
