const conexion = require('../database/database');

function saveCanal(req, res) {

    // Recogemos los parametros del body
    var body = req.body;
    var nombre = body.nombre;
    var pais = body.pais;


    conexion.query(`SELECT * FROM paises WHERE pais="${pais}"`, function(error, results, fields) {
        if (error) {
            return res.status(500).send({ message: error });
        }
        if (results.length > 0) {
            if (nombre) {
                conexion.query(`SELECT * FROM canales WHERE nombre = "${nombre}"`, function(error, results, fields) {
                    if (error) {
                        return res.status(500).send({ message: error });
                    }
                    if (results.length > 0) {
                        return res.status(400).send({ message: 'Canal existente' });
                    } else {
                        conexion.query(`INSERT INTO canales(id, nombre, pais) VALUES (NULL,"${nombre}","${pais}")`, function(error, results, fields) {
                            if (error)
                                return res.status(500).send({ message: error });
                            if (results) {
                                return res.status(201).json(results);
                            } else {
                                return res.status(400).send({ message: 'Datos mal insertados' });
                            }
                        });
                    }
                });
            } else {
                return res.status(400).send({ message: 'El nombre es un campo obligatorio' });
            }
        } else {
            return res.status(400).send({ message: 'El pais no esta permitido o esta vacio' });
        }
    });


}

function getCanales(req, res) {
    conexion.query('SELECT * FROM usuarios', function(error, results, fields) {
        if (error)
            return res.status(500).send({ message: 'Error en el servidor' });
        if (results.length > 0) {
            return res.status(200).json(results);
        } else {
            return res.status(404).send({ message: 'No hay canale' });
        }
    });

}

function getCanal(req, res) {
    // Recogemos un parametro por la url
    var id = req.params.id;
    conexion.query(`SELECT * FROM canales WHERE id = ${id}`, function(error, results, fields) {
        if (error)
            throw error;
        if (results.length > 0) {
            return res.status(302).json(results);
        } else {
            return res.status(404).send({ canal: 'no existe ningun canal con ese nombre' });
        }
    });

}

function updateCanal(req, res) {
    // Recogemos un parámetro por la url
    var id = req.params.id;

    // Recogemos los datos que nos llegen en el body de la petición
    var update = req.body;
    var nombre = update.nombre;
    var pais = update.pais;

    // Buscamos por id y actualizamos el objeto y devolvemos el objeto actualizado
    conexion.query(`UPDATE canales SET nombre="${nombre}",pais="${pais}" WHERE id = ${id}`, function(error, results, fields) {
        if (error)
            return res.status(500).send({ message: 'error en el servidor' });
        if (results) {
            return res.status(200).json(results);
        } else {
            return res.status(404).send({ message: 'no existe ningun canal con ese nombre' });
        }
    });
}

function deleteCanal(req, res) {
    var id = req.params.id;
    // Buscamos por id y actualizamos el objeto y devolvemos el objeto actualizado
    conexion.query(`DELETE FROM canales WHERE id = ${id}`, function(error, results, fields) {
        if (error)
            return res.status(500).send({ message: 'error ssen el servidor' });
        if (results) {
            return res.status(200).json(results);
        } else {
            return res.status(404).send({ message: 'no existe ningun canal con ese nombre' });
        }
    });
}

module.exports = {
    saveCanal,
    getCanales,
    getCanal,
    updateCanal,
    deleteCanal
};