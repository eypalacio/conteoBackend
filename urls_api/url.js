'use strict'

/** Carga del módulo express para poder crear rutas */
var express = require('express');

/** controlador de la api */
var swift_controller = require('../controllers/swift');
var ejecutarETL_controller = require('../controllers/exec_ETL');
var repair_controller = require('../controllers/repair');
var slbtr_controller = require('../controllers/slbtr');
var test = require('../controllers/test');
var slbtr_controller = require('../controllers/slbtr');
var excFile_controller = require('../controllers/ejecutar_archivos_ext');

/** router */
var api = express.Router();

/** swift */
api.get('/conteo',swift_controller.getMensaje);
api.get('/tipoM',swift_controller.buscarMensaje);
api.get('/mostrarHoras',swift_controller.mostrarHoras);  
api.get('/execETL',ejecutarETL_controller.ejecutarETL);

api.get('/mensajesSLBTR',slbtr_controller.mensajesSLBTR); 
api.get('/conteoSLBTR',slbtr_controller.conteoSLBTR);

api.get('/repair',repair_controller.repair);
api.put('/estado',repair_controller.setEstado);




module.exports = api;