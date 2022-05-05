const conexion = require('../database/database');
const bcrypt = require('bcrypt');
const { json } = require('body-parser');


/**
 * funtcion getMensaje() busca todos los mensajes de la base de datos ConteoT24 -- dbo.ConteoT24
 * se ordena x tipo de mensaje y fecha mas reciente
 * solo se mostraran los 8 tipos de mensajes que existen con la informacion mas actual
 * */
function getMensaje(req, res) {
    let query = `SELECT * FROM ConteoT24 ORDER BY tipoM asc, fecha desc`
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

/**
 * funtcion buscarMensaje() busca y devuelve todos los mensajes de la base de datos ConteoT24 -- dbo.ConteoT24 cuyo tipo sea el especificado por el usuario
 * tipo == tipoIn
 * fecha == fechaIn
 * hora == horaIn || rango de una hora Ej. si el usuario inserta 10:00, la busqueda se realiza de 10:00 a 10:59:59
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

    if (fecha != '' && fecha != 'NaN/0NaN/NaN') {
        if (query.includes(`WHERE`)) {
            query += ` AND fecha = '${fecha}'`
        } else
            query += ` WHERE fecha = '${fecha}'`
    }
    if (hora != '') {
        if (query.includes(`WHERE`)) {
            if (hora.substring(3, 5) == '00') {
                let h_final = parseInt(hora.substring(0, 2)) + 1;
                let hor = (h_final < 10 ? '0' + h_final : h_final) + ':00'
                query += ` AND hora BETWEEN '${hora}' AND '${hor}'`
            } else {
                query += ` AND hora > '${hora}'`
            }
        } else {
            if (hora.substring(3, 5) == '00') {
                let h_final = parseInt(hora.substring(0, 2)) + 1;
                let hor = (h_final < 10 ? '0' + h_final : h_final) + ':00'
                query += ` WHERE hora BETWEEN '${hora}' AND '${hor}'`
            } else {
                query += ` WHERE hora like '${hora}%'`
            }
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
}

module.exports = {
    getMensaje,
    buscarMensaje,
}