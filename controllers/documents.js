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

function saveDocument(req, res){
    var id = -1;
    var body = req.body;
    var title = body.title;
    var descripcion = body.descripcion;
    var date = body.date;
    var foto = { name: null };
    if( req.files ) foto = req.files.foto;
    foto_name = title + '.jpg';

    conexion.query(`INSERT INTO documentos(id, title, descripcion, imagen, date) VALUES (NULL,"${title}","${descripcion}","${foto_name}","${date}")`, function(error, results, fields) {
        if (error)
            return res.status(500).send({ message: error });
        if (results) {
            saveFoto(foto, title);
            return res.status(201).send({message: 'documento guardado correctamente'});
        }
    });
}


function saveFoto(foto, title) {
    if (foto.name != null) {
        foto.mv(`./public/documents/${title}.jpg`, function(err) {});
    }
}

function getFoto(req, res) {
    try {
        var id = req.params.id;
        conexion.query(`SELECT * FROM documentos WHERE id = ${id}`, function(error, results, fields) {
            if (error)
                throw error;
            if (results.length > 0) {
                var path = require('path');
                res.sendFile(path.resolve('public/documents/' + results[0].imagen));
            } else {
                return res.status(404).send({ documento: 'no existe ningun documento con ese id' });
            }
        });
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    getDocuments,
    saveDocument,
    getFoto,
};