'use strict'

/**** */
const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());

// Configuring body parser middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// Importamos las rutas
var routes = require('./urls_api/url');


// Cargamos las rutas
app.use('/apis', routes);
module.exports = app;


const conection = require('./database/database');
// const api = require('./urls_api/url');
conection.connect(function(err) {
    if (err) {
        console.error(err);
        return;
    }
    console.log('connect to database');
});

app.listen(port, () => console.log(`Server is listening on port ${port}!`));