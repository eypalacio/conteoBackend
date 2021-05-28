'use strict'

// Cargamos el módulo de express para poder crear rutas
var express = require('express');

// Cargamos el controlador
var canal_controller = require('../controllers/canales');
var usuario_controller = require('../controllers/usuarios');
var roles_controller = require('../controllers/roles');

// Llamamos al router
var api = express.Router();

// Creamos una ruta de tipo GET para el método de pruebas
// api.put('/canales', canal_controller.saveCanal);
// api.get('/usuarios', canal_controller.getCanales);
// api.get('/canales/:id', canal_controller.getCanal);
// api.post('/canales/:id', canal_controller.updateCanal);
// api.delete('/canales/:id', canal_controller.deleteCanal);


//Rutas para las api de roles
api.get('/roles', roles_controller.getRoles);
api.post('/roles', roles_controller.saveRol);
api.post('/roles/:id', roles_controller.updateRol);
api.delete('/roles/:id', roles_controller.deleteRol);
api.post('/rolesypermisos/:rol_id', roles_controller.addRolesPermisos);
api.get('/rolesypermisos/:user_id', roles_controller.getRolesPermisos);
api.get('/rolesbyuser/:user_id', roles_controller.getRolesByUser);


// Rutas para las api de usuario
api.post('/saveUsuario', usuario_controller.saveUsuario);
api.get('/usuarios', usuario_controller.getUsuarios);
api.get('/usuarios/:id', usuario_controller.getUsuario);
api.post('/usuarios/:id', usuario_controller.updateUsuario);
api.delete('/usuarios/:id', usuario_controller.deleteUsuario);


// Exportamos la configuración
module.exports = api;