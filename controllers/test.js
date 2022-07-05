const conexion = require('../database/database');
const bcrypt = require('bcrypt');
const { json } = require('body-parser');

function getrepair(req, res) {//trae todos los datos de repair
    let query = `SELECT * FROM Repaiar where nuevo = 'n' order by RECID DESC`

    conexion.query(query, function (error, result) {
        if (error) {
            return res.status(500).send('error');
        }
        if (res) {
            return res.status(200).send(result.recordset[0]);
        }
    })
}

function setEstado(req, res){
    let id = req.body.id;

    let query = `UPDATE Repair set nuevo = 'x' WHERE id = ${id}`;

    conexion.query(query, function(error,result){
        if(error){
            return res.status(500).send(error);
        }
        if(result){
            return res.status(200).send(result.recordset)
        }
    })
}

module.exports = {
    getrepair,
    setEstado,
}