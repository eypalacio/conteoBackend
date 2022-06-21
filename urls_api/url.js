'use strict'

/** Carga del módulo express para poder crear rutas */
var express = require('express');

/** controlador de la api */
var swift_controller = require('../controllers/swift')
var ejecutarETL_controller = require('../controllers/exec_ETL')
var repair_controller = require('../controllers/repair')

/** router */
var api = express.Router();

/** swift */
api.get('/conteo',swift_controller.getMensaje)
api.get('/tipoM',swift_controller.buscarMensaje)
api.get('/mostrarHoras',swift_controller.mostrarHoras)  
api.get('/execETL',ejecutarETL_controller.ejecutar)  


module.exports = api;