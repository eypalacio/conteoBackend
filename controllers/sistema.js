const conexion = require('../database/database');
const bcrypt = require('bcrypt');
const { json } = require('body-parser');

function getSistema(req, res) {
    var query = ``;
    conexion.query(`SELECT * FROM sistema order by nomb_sistema asc`, function(error, results, fields) {
        if (error) {
            console.log(error);
            return res.status(500).send(error);
        }
        if (results.length > 0) {
            return res.status(200).json(results);
        } else {
            return res.status(200).send({ sistema: 'no existe ningun sistema' });
        }
    });
}

function saveSistema(req, res) {
    var id = -1;
    var body = req.body;
    var nomb_sistema = body.nomb_sistema;
    var alias_sistema = body.alias_sistema;

    conexion.query(`INSERT INTO sistema(id, nomb_sistema, alias_sistema) VALUES (NULL,"${nomb_sistema}","
    ${alias_sistema}")`, function(error, results, fields) {
        if (error)
            return res.status(500).send({ message: error });
        if (results) {
            return res.status(201).send({ message: 'sistema guardado correctamente' });
        }
    });
}

function deleteSistema(req, res) {
    const id = req.params.id;
    conexion.query(`SELECT * FROM sistema WHERE id=${id}`, function(err, result) {
        if (err)
            return res.status(500).send({ message: err });
        if (result) {
            conexion.query(`DELETE FROM sistema WHERE id = ${id}`, function(error, results, fields) {
                if (error)
                    return error;
                if (results) {
                    return res.status(200).send({ results });
                }
            });
        }
    });

}

function updateSistema(req, res) {
    // Recogemos un parámetro por la url
    var id = req.params.id;

    // Recogemos los datos que nos llegen en el body de la petición
    var update = req.body;
    var nomb_sistema = update.nomb_sistema;
    var alias_sistema = update.alias_sistema;

    // Buscamos por id y actualizamos el objeto y devolvemos el objeto actualizado
    var query = `UPDATE sistema SET `;
    if (nomb_sistema != undefined) {
        query += `nomb_sistema = "${nomb_sistema}"`
    }


    if (alias_sistema != undefined) {
        query += `alias_sistema = "${alias_sistema}"`
    }
    query += `
        WHERE id = ${ id }
        `

    conexion.query(query, function(error, results, fields) {
        if (error)
            return res.status(500).send({ message: 'error en el servidor' });
        if (results) {
            return res.status(201).send({ message: 'actualizado correctamente' });
        } else {
            return res.status(404).send({ message: 'no existe ningun sistema con ese id' });
        }
    });

}

module.exports = {
    getSistema,
    saveSistema,
    deleteSistema,
    updateSistema,
};