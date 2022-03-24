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

function buscarMensajeHora(req, res){
    let query = `SELECT * FROM conteo_swift `
    let fecha = req.query.fecha
    let hora = req.query.hora

    if(fecha != ''){
        query+= `WHERE fecha = '${fecha}'`
    }
    if(hora != ''){
        if(fecha != ''){
            query+= `AND hora = '${hora}'`
        }else {
            query+= `WHERE hora = ${hora}`
        }       
    }
    query+= `ORDER BY tipo_msje asc, hora desc`

    conexion.query(query, function(error, result){
        if(error){
            res.status(500).send(error)
        }
        if(result){
            res.status(200).send(result)
        }
    })
}

module.exports = {
    getMensaje,
    buscarMensaje,
    buscarMensajeHora,
}