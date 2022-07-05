const conexion = require('../database/database');
const bcrypt = require('bcrypt');
const { json } = require('body-parser');
const { query } = require('../database/database');
const exec  = require('child_process').exec;

function ejecutarETL(req, res) {

    var cp = require('child_process');
    cp.exec('', function(e, stdout, stderr) {
      console.log(stdout);
      console.log(stderr);
      if (e) throw e;
    });
    }

    module.exports = {
    ejecutarETL,
    }