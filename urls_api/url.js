'use strict'

/** Carga del módulo express para poder crear rutas */
var express = require('express');

/** controlador de la api */
var swift_controller = require('../controllers/swift')
var excFile_controller = require('../controllers/ejecutar_archivos_ext')

/** router */
var api = express.Router();

/** swift */
api.get('/conteo',swift_controller.getMensaje);
api.get('/mostrarHoras',swift_controller.mostrarHoras);
api.get('/tipoM',swift_controller.buscarMensaje);

api.get('/execETL',excFile_controller.ejecutarETL);


module.exports = api;