'use strict'

/** Carga del módulo express para poder crear rutas */
var express = require('express');

/** controlador de la api */
var busquedaUsuariosController = require('../controllers/busquedaUsuarios');
var busquedasRecientesController = require('../controllers/busquedasRecientes');

/** router */
var api = express.Router();


module.exports = api;