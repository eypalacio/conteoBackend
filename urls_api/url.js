'use strict'

// Cargamos el módulo de express para poder crear rutas
var express = require('express');

// Cargamos el controlador
var usuario_controller = require('../controllers/usuarios');
var roles_controller = require('../controllers/roles');
var login_controller = require('../controllers/login');
var document_controller = require('../controllers/documents');
var managedb_controller = require('../database/manageDB');
var superuser_controller = require('../database/superuser');
var historico_controller = require('../controllers/historico');

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
api.get('/rolypermisos/:rol_id', roles_controller.getPermisosRol);
api.get('/rolbyrolname', roles_controller.RolbyRolName);


// Rutas para las api de usuario
api.post('/saveUsuario', usuario_controller.saveUsuario);
api.get('/usuarios', usuario_controller.getUsuarios);
api.get('/usuarios/:id', usuario_controller.getUsuario);
api.post('/usuarios/:id', usuario_controller.updateUsuario);
api.delete('/usuarios/:id', usuario_controller.deleteUsuario);
api.get('/avatar/:id', usuario_controller.getAvatar);
api.delete('/avatar/:id', usuario_controller.deleteAvatarApi);
api.get('/userhistory/:id', usuario_controller.getUserHistory);

//Rutas para la api de login
api.post('/login', login_controller.login);
api.delete('/logout/:id', login_controller.logout);
api.get('/useronline', login_controller.userOnline);

//Rutas para el api de documentos
api.get('/documents/:id', document_controller.getDocuments);
api.post('/documents', document_controller.saveDocument);
api.get('/documentsFoto/:id', document_controller.getFoto);
api.delete('/documents/:id', document_controller.deleteDocument);
api.post('/documents/:id', document_controller.updateDocument);

//Rutas para manejar base de datos
api.get('/database', managedb_controller.createTables);

//Rutas para crear el primer superuser
api.get('/superuser', superuser_controller.createSuperUser);
api.post('/superuser', superuser_controller.saveSuperUsuario);

//Rutas para historico
api.post('/userhistory', historico_controller.saveActionAPI);


// Exportamos la configuración
module.exports = api;