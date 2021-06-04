'use strict'

// Cargamos el módulo de express para poder crear rutas
var express = require('express');

// Cargamos el controlador
var usuario_controller = require('../controllers/usuarios');
var roles_controller = require('../controllers/roles');
var login_controller = require('../controllers/login');

// Llamamos al router
var api = express.Router();

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
api.get('/avatar/:id', usuario_controller.getAvatar)

//Rutas para la api de login
api.post('/login', login_controller.login);


// Exportamos la configuración
module.exports = api;