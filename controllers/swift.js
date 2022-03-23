const conexion = require('../database/database');
const bcrypt = require('bcrypt');
const { json } = require('body-parser');

function getMensaje(req, res) {
    let query = `SELECT * FROM conteo_swift ORDER BY  tipo_msje asc, fecha desc`

    conexion.query(query, function (err,result){
        if(err){
            return res.status(500).send('err')
        }
        if(result){
            return res.status(200).send(result)
        }
    })
}

function buscarMensaje(req, res){
    let query = `SELECT * FROM conteo_swift `
    let fecha = req.query.fecha;
    let hora = req.query.hora
    if(fecha != ''){
        query +=`WHERE fecha = '${fecha}' `
    }
    if(hora != ''){
        if(fecha !=''){
        query+=`AND hora > '${hora}'`
        }else{
            query+= `where hora > '${hora}'`
        }
    }
    query += ` ORDER BY tipo_msje asc, fecha desc`;
    console.log(query);
    conexion.query(query, function(err, result){
        if(err){
            return res.status(500).send('err');
        }
        if(result){
            return res.status(200).send(result);
        }
    })
}

module.exports = {
    getMensaje,
    buscarMensaje,
}