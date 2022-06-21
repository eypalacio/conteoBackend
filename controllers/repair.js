const conexion = require('../database/database');
const bcrypt = require('bcrypt');
const { json } = require('body-parser');

function getData(req, res) {//trae todos los datos de repair
    let query = `SELECT * FROM Repaiar where nuevo = 'n' order by `

    conexion.query(query, function (error, result) {
        if (error) {
            return res.status(500).send('error');
        }
        if (res) {
            return res.status(200).send(result.recordset[0]);
        }
    })
}

function cambiarEstado(req,res){
    let visto = req.query.visto;
    let query = ``


}

module.exports = {
    getData,
    cambiarEstado,
}