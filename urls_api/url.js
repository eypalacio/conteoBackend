'use strict'

// Cargamos el módulo de express para poder crear rutas
var express = require('express');

// Cargamos el controlador
var sistema_controller = require('../controllers/sistema')

//controlador de la api
var agenda_controller = require('../controllers/agenda')

var swift_controller = require('../controllers/swift')

// Llamamos al router
var api = express.Router();

//Rutas para las api de roles
api.get('/sistema', sistema_controller.getSistema)
api.post('/sistema', sistema_controller.saveSistema)
api.put('/sistema/:id', sistema_controller.updateSistema)
api.delete('/sistema/:id', sistema_controller.deleteSistema)

//rutas para la api agenda

api.get('/agenda',agenda_controller.getAgenda)
api.post('/agenda', agenda_controller.postAgenda)
api.put('/agenda/:id',agenda_controller.updateAgenda )
api.delete('/agenda/:id', agenda_controller.deleteAgenda)
api.get('/agenda/:id',agenda_controller.getAgendaByID)

//swift
api.get('/conteo',swift_controller.getMensaje)
api.get('/conteob',swift_controller.buscarMensaje)

// Exportamos la configuración
module.exports = api;