'use strict'

/** Carga del módulo express para poder crear rutas */
var express = require('express');

/** controlador de la api */
var swiftController = require('../controllers/swift');
var repairController = require('../controllers/repair');
var slbtrController = require('../controllers/slbtr');
var execFileController = require('../controllers/execFileETL');

/** router */
var api = express.Router();

api.get('/mensajesT24',swiftController.mensajesT24);
api.get('/buscarMensajes',swiftController.buscarMensaje);
api.get('/mostrarHoras',swiftController.mostrarHoras);  
api.get('/ejecutarConteoT24',execFileController.ejecutarConteoT24);

api.get('/mensajesSLBTR',slbtrController.mensajesSLBTR); 
api.get('/conteoSLBTR',slbtrController.conteoSLBTR);
api.get('/ejecutarConteoSlbtr',execFileController.ejecutarConteoSLBTR)

api.get('/repair',repairController.repair);
api.put('/setEstado',repairController.setEstado);


module.exports = api;