const conexion = require('../database/database');
const bcrypt = require('bcrypt');
const { json } = require('body-parser');
const { query } = require('../database/database');
const exec  = require('child_process').exec;


