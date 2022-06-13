const conexion = require('../database/database');
const bcrypt = require('bcrypt');
const { json } = require('body-parser');
const { query } = require('../database/database');
const exec  = require('child_process').exec;

function getMensajesSLBTR(req, res){ //funcion q trae todos los mensajes del dia
    let query = ` SELECT * FROM ConteoSLBTR_FechaHora where fecha LIKE CONVERT(VARCHAR(10),GETDATE(),23)`;
    conexion.query(query, function(error,result){
        if(error){
            return res.status(500).send('error');
        }
        if(result){
            return res.status(200).send(result.recordsets[0]);
        }
    })
}

module.exports = {
    getMensajesSLBTR,
}