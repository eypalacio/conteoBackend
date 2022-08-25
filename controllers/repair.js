const conexion = require('../database/database');
const bcrypt = require('bcrypt');
const { json } = require('body-parser');

function repair(req, res) {//trae todos los datos de repair
    let query = `SELECT * FROM Repair order by RECID DESC`

    conexion.query(query, function (error, result) {
        if (error) {
            return res.status(500).send('error');
        }
        if (res) {
            return res.status(200).send(result.recordset);
        }
    })
}

function setEstado(req, res){
    let id = req.body.id;
    let query = ``;
    if(id == -1)
      query = `UPDATE Repair set nuevo = 'x'`
    else
      query = `UPDATE Repair set nuevo = 'x' WHERE id = ${id}`;

    //   console.log(query);
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
    repair,
    setEstado,
}