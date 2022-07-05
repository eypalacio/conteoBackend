const conexion = require('../database/database');
const bcrypt = require('bcrypt');
const { json } = require('body-parser');


function getMensaje(req, res) { // busca todos los mensajes de la base de datos ConteoT24 -- dbo.ConteoT24 
    /**
     * solo se mostraran los 9 tipos de mensajes que existen con la informacion mas actual
     **/

    let query = `SELECT * FROM ConteoT24 where fecha LIKE CONVERT(VARCHAR(10),GETDATE(),111) ORDER BY tipoM asc, fecha desc, hora desc`
    // console.log(query)
    conexion.query(query, function (err, result) {
        if (err) {
            return res.status(500).send('err')
        }
        if (result) {
            return res.status(200).send(result.recordsets[0])
        }
    })
}


function buscarMensaje(req, res) {
    /**
     * funtcion buscarMensaje() busca y devuelve todos los mensajes de la base de datos ConteoT24 -- dbo.ConteoT24 cuyo tipo sea el especificado por el usuario
     * tipo == tipoIn
     * fecha == fechaIn
     * hora == horaIn || rango de una hora Ej. si el usuario inserta 10:00, la busqueda se realiza de 10:00 a 10:59:59
     * se ordena x tipo de mensajes
     * */

    let tipoM = req.query.tipo;
    let fecha = req.query.fecha;
    let hora = req.query.hora;
    let query = `SELECT * From ConteoT24 `

    if (tipoM != -1) {
        query += `WHERE tipoM = '${tipoM}'`
    }

    if (fecha != '' && fecha != 'NaN/0NaN/NaN' && fecha != undefined && fecha != 'Invalid date') {
        if (query.includes(`WHERE`)) {
            query += ` AND fecha = '${fecha}'`
        } else { query += ` WHERE fecha = '${fecha}'` }
    }
    if (hora != '') {
        if (query.includes(`WHERE`)) {
            query += ` AND  hora = '${hora}'`
        } else {
            query += ` WHERE hora = '${hora}' and fecha LIKE CONVERT(VARCHAR(10),GETDATE(),111)`
        }
    }

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
}

function mostrarHoras(req, res) {
    let fecha = req.query.fecha;

    let query = `SELECT DISTINCT hora FROM ConteoT24 `

    if (fecha == 'Invalid date' || fecha == 'NaN/0NaN/NaN' || fecha == undefined || fecha == '') {
        query += ` where fecha LIKE CONVERT(VARCHAR(10),GETDATE(),111)`;
    } else
        if (fecha != '' || fecha != 'NaN/0NaN/NaN' || fecha != undefined || fecha != 'Invalid date') {
            query += ` where fecha = '${fecha}'`
        }
    // console.log(query);
    // console.log(req.query);

    conexion.query(query, function (error, result) {
        if (error) {
            console.log(error)
            return res.status(500).send(error);
        }
        if (result) {
            //   console.log(result);
            return res.status(200).send(result.recordset);
        }
    })
}


module.exports = {
    getMensaje,
    buscarMensaje,
    mostrarHoras,
}