'use strict'

/**** */
const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors');
const fileUpload = require('express-fileupload');


const app = express();
const port = 3000;

app.use(cors());

// Configuring body parser middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Configuracion para subir imagenes
app.use(fileUpload());

// Importamos las rutas
var routes = require('./urls_api/url');


// Cargamos las rutas
app.use('/apis', routes);


app.post('/uploadp', (req, res) => {

    let EDFile = req.files.file;


    EDFile.mv(`./public/images-doc/${EDFile.name}`, err => {

        if (err) return res.status(500).send({ message: err })


        return res.status(200).send({ message: 'File upload' })

    })

})


module.exports = app;


const conexion = require('./database/database');
conexion.connect(function(err) {
    if (err) {
        console.error(err);
        return;
    }
    console.log('connect to database');
});

app.listen(port, () => console.log(`Server is listening on port ${port}!`));