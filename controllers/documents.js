const conexion = require('../database/database');
const bcrypt = require('bcrypt');
const { json } = require('body-parser');

function getDocuments(req, res) {
    var id = req.params.id;
    conexion.query(`SELECT * FROM documentos`, function (error, results, fields) {
        if (error) {
            console.log(error);
            return res.status(500).send(error);
        }
        if (results.length > 0) {
            return res.status(200).json(results);
        } else {
            return res.status(200).send({ documents: 'no existe ningun documento permitido' });
        }
    });
}

module.exports = {
    getDocuments
};