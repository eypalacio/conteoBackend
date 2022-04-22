const conexion = require('../database/database');
const bcrypt = require('bcrypt');
const {json} = require('body-parser');


/**
 * funtcion getMensaje() busca y devuelve todos los mensajes de la base de datos ConteoT24 -- dbo.ConteoT24
 * se ordena x tipo de mensaje y fecha mas reciente
 * */
function getMensaje(req, res) {
    let query = `SELECT * FROM ConteoT24 ORDER BY tipoM asc, fecha desc`
    console.log(query)
    conexion.query(query, function (err, result) {
        if (err) {
            return res.status(500).send('err')
        }
        if (result) {
            return res.status(200).send(result.recordsets[0])
        }
    })
}

/**
 * funtcion buscarMensajeTipo() busca y devuelve todos los mensajes de la base de datos ConteoT24 -- dbo.ConteoT24 cuyo tipo sea el especificado por el usuario
 * si la fecha || hora esta especificada devuelve por el tipo de mensaje mostrando los de la fecha y hora especificadas
 * se ordena x tipo de mensajes
 * */
function buscarMensaje(req,res){
    let tipoM = req.query.tipo
    let  fecha = req.query.fecha;
    let hora = req.query.hora;
    let query = `SELECT * From ConteoT24 `
    
    if(tipoM !=-1){
        query+=`WHERE tipoM = '${tipoM}'`
    }

    if (fecha != '' && fecha != 'NaN/0NaN/NaN'){
        if(query.includes(`WHERE`)){
            query+= ` AND fecha = '${fecha}'`    
            }else
        query+=` WHERE fecha = '${fecha}'`
    }
    if (hora != ''){
        query+= ` AND hora like '%${hora}%'`
    }
    query += ` ORDER BY tipoM ASC, fecha DESC`
    console.log(query);
    console.log(req.query);

    conexion.query(query, function (error, result){
        if (error){
            return res.status(404).send(error);
        }
        if (result){
            return res.status(200).send(result.recordsets[0]);
        }
    })
}

module.exports = {
    getMensaje,
    buscarMensaje,
}