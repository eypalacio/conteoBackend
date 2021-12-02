'use strict'

// Cargamos el módulo de express para poder crear rutas
var express = require('express');

// Cargamos el controlador
var sistema_controller = require('../controllers/sistema')

// Llamamos al router
var api = express.Router();

//Rutas para las api de roles
api.get('/sistema', sistema_controller.getSistema)
api.post('/sistema', sistema_controller.saveSistema)
api.put('/sistema/:id', sistema_controller.updateSistema)
api.delete('/sistema/:id', sistema_controller.deleteSistema)

// Exportamos la configuración
module.exports = api;