const conexion = require('../database/database');
const bcrypt = require('bcrypt');
const { json } = require('body-parser');
const { query } = require('../database/database');
const exec  = require('child_process').exec;


/**
 * funtcion getMensaje() busca y devuelve todos los mensajes de la base de datos ConteoT24 -- dbo.ConteoT24
 * se ordena x tipo de mensaje y fecha mas reciente
 * WHERE fecha LIKE CONVERT(VARCHAR(10),GETDATE(),111) ORDER BY tipoM asc, fecha desc
 * */
 function mensajesT24(req, res) {
    let query = `SELECT * FROM ConteoT24 where fecha LIKE CONVERT(VARCHAR(10),GETDATE(),111) order by hora desc`
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
function buscarMensaje(req, res) {
    let tipoM = req.query.tipo
    let fecha = req.query.fecha;
    let hora = req.query.hora;
    let query = `SELECT * From ConteoT24 `

    if (tipoM != -1) {
        query += `WHERE tipoM = '${tipoM}'`
    }

    if (fecha != '' && fecha != 'NaN/0NaN/NaN' && fecha != undefined && fecha != 'Invalid date') {
        if (query.includes(`WHERE`)) {
            query += ` AND fecha = '${fecha}'`
        } else
            query += ` WHERE fecha = '${fecha}'`
    }
    if (hora != '') {
        if (query.includes(`WHERE`)) {
            query += ` AND  hora = '${hora}'`
        } else {
            query += ` WHERE hora = '${hora}'`
        }
    }


    query += ` ORDER BY tipoM ASC, fecha DESC`
    // console.log(query);
    // console.log(req.query);

    conexion.query(query, function (error, result) {
        if (error) {
            console.log(error);
            return res.status(404).send(error);
        }
        if (result) {
            return res.status(200).send(result.recordsets[0]);
        }
    })
    console.log(query);
}

function mostrarHoras(req, res) {
    let fecha = req.query.fecha;
    let query = `SELECT DISTINCT hora FROM ConteoT24 `;

    if (fecha == '' || fecha == 'NaN/0NaN/NaN' || fecha == undefined || fecha == 'Invalid date') {
        query+= `where fecha LIKE CONVERT(VARCHAR(10),GETDATE(),111)`
    }
    else 
    if (fecha != '' || fecha != 'NaN/0NaN/NaN' || fecha != undefined || fecha != 'Invalid date') {
        query+= `where fecha = '${fecha}'`
    }

    conexion.query(query, function (error, result) {
        if (error) {
            return res.status(500).send(error);
        }
        if (result) {
            return res.status(200).send(result.recordset);
        }
    })
}

module.exports = {
    mensajesT24,
    buscarMensaje,
    mostrarHoras,
}
