'use strict'

/**** */
const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors');
const multer = require('multer');


const app = express();
const port = 3000;



const storage = multer.diskStorage({
    destination: function(req, file, cd) {
        cb(null, '/public/images')
    },
    filename: function(req, file, cb) {
        console.log(file);
        cb(null, file.fieldname + '-' + Date.now())
    }
});

const upload = multer({ storage: storage });
exports.upload = upload.single('myFile');

app.post('/upload', (req, res) => {
    console.log('upload');
    upload;
})

app.use(cors());

// Configuring body parser middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());



// Importamos las rutas
var routes = require('./urls_api/canal_url');


// Cargamos las rutas
app.use('/apis', routes);


module.exports = app;


const conexion = require('./database/database');
const api = require('./urls_api/canal_url');
conexion.connect(function(err) {
    if (err) {
        console.error(err);
        return;
    }
    console.log('connect to database');
});

app.listen(port, () => console.log(`Server is listening on port ${port}!`));