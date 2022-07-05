const conexion = require('../database/database');
const bcrypt = require('bcrypt');
const { json } = require('body-parser');
const { query } = require('../database/database');
const exec  = require('child_process').exec;

function mensajesSLBTR(req, res) { //funcion q trae todos los mensajes del dia where fecha LIKE CONVERT(VARCHAR(10),GETDATE(),23)
    let query = ` SELECT * FROM ConteoSLBTR_FechaHora where fecha LIKE CONVERT(VARCHAR(10),GETDATE(),23)`;
    conexion.query(query, function (error, result) {
        if (error) {
            return res.status(500).send('error');
        }
        if (result) {
            return res.status(200).send(result.recordsets[0]);
        }
    })
}


function conteoSLBTR(req, res) {
    let query = `SELECT * FROM ConteoSLBTRConsolidado WHERE fecha LIKE CONVERT(VARCHAR(10),GETDATE(),23) `;
console.log(query);
    conexion.query(query, function (error, result) {
        if (error) {
            return res.status(500).send(error);
        }
        if(result){
            return res.status(200).send(result.recordset[0]);
        }
    })
}

module.exports = {
    mensajesSLBTR,
    conteoSLBTR,
}