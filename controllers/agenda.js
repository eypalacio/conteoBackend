const conexion = require('../database/database');
const bcrypt = require('bcrypt');
const { json } = require('body-parser');

function getAgenda(req, res) {
    const query = `SELECT * FROM agenda`;
    conexion.query(query, function (error, result) {
        if (error) {
            return res.status(500).send('error');
        }
        if (result) {
            return res.status(200).send(result);
        }
    })
}

function postAgenda(req, res) {

    let body = req.body;
    let nombre = body.nombre;
    let telefono = body.telefono;
    let marcaje = body.marcaje;
    console.log(body)

    const query = `INSERT INTO agenda (id,nombre,telefono,marcaje) 
                   VALUES (null,'${nombre}', ${telefono}, ${marcaje})`
    
                   console.log(query)
    conexion.query(query, function(error, result){
        if(error){
            return res.status(500).send('error')
        }
        if(result){
            return res.status(200).send(result)
        }
       })
}

function updateAgenda(req, res){

    let body = req.body;
    let nombre = body.nombre;
    let telefono = body.telefono;
    let marcaje = body.marcaje;

    let id = req.params.id;

    let query = `UPDATE agenda SET `;
    if(nombre != undefined){query += `nombre = '${nombre}', `}
    if(telefono != undefined){query += `telefono = ${telefono}, `}
    if(marcaje != undefined){query += `marcaje = ${marcaje} `}

    query += `WHERE id = ${id}`;

    conexion.query(query, function(error,result){
        if(error){
            return res.status(500).send('')
        }
        if(result){
            return res.status(200).send(result)
        }
    })
                     
}

function deleteAgenda(req, res){
    let id = req.params.id

    const comprobar = `SELECT * FROM agenda WHERE id = ${id}`
    const query = `DELETE FROM agenda   WHERE id = ${id}`

    conexion.query(comprobar, function(error, result){
        if(error){
            return res.status(500).send('')
        }
        if(result.length > 0){
            conexion.query(query,function(err,resultado){
                if(err){
                    return res.status(500).send('')
                }
                if(resultado){
                    return res.status(200).send('se elimino sucefully')
                }
            })
        }else {
            return res.status(404).send('no se esta')
        }
    })
}

function getAgendaByID(req, res){
    let id = req.params.id;

    const query = `SELECT * FROM agenda WHERE id = ${id}`;

    conexion.query(query,function(error,result){
        if(error){
            return res.status(500).send("");
        }
        if(result){
            return res.status(200).send(result[0]);
        }
    })
}




module.exports = {
    getAgenda,
    postAgenda,
    updateAgenda,
    deleteAgenda,
    getAgendaByID,
}