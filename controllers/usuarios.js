const conexion = require('../database/database');
const bcrypt = require('bcrypt');

function saveUsuario(req, res) {

    // Recogemos los parametros del body
    var id = -1;
    var body = req.body;
    var user = body.user;
    var password = body.password;
    var full_name = body.full_name;
    var register_date = body.register_date;
    var register_hour = body.register_hour;
    var roles = body.roles;


    bcrypt.hash(password, 10, (err, encrypted) => {
        if (err) {
            console.log(err);
        } else {
            conexion.query(`INSERT INTO usuarios(id, user, password, full_name, register_date, register_hour) VALUES (NULL,"${user}","${encrypted}","${full_name}","${register_date}", "${register_hour}")`, function(error, results, fields) {
                if (error)
                    return res.status(500).send({ message: error });
                if (results) {
                    id = results.insertId;
                    for (let rol of roles) {
                        console.log(rol.id);
                        query_rol = `INSERT INTO roles_usuarios(id, user_id, rol_id) VALUES (NULL, ${id}, ${rol.id})`;
                        conexion.query(query_rol, function(error, results, fields) {
                            if (error)
                                console.log(error);
                            if (results) {
                                console.log(results);
                            } else {
                                console.log('asda');
                            }
                        });
                    }
                    return res.status(201).send({ message: 'agregado correctamente' });
                } else {
                    return res.status(400).send({ message: 'Datos mal insertados' });
                }
            });
        }
    })


}


function getUsuarios(req, res) {

    var body = req.query;
    var user = body.user;
    var full_name = body.full_name;
    var register_date = body.register_date;
    var register_hour = body.register_hour;

    var query = `SELECT * FROM usuarios WHERE 0=0 `;
    console.log(body);

    if (user) {
        query += `AND user LIKE "%${user}%" `;
    }
    if (full_name) {
        query += `AND full_name LIKE "%${full_name}%"`;
    }
    if (register_date) {
        query += `AND register_date LIKE "%${register_date}%"`;
    }
    if (register_hour) {
        query += `AND register_hour LIKE "%${register_hour}%"`;
    }
    conexion.query(query, function(error, results, fields) {
        if (error)
            return res.status(500).send({ message: 'Error en el servidor' });
        if (results.length > 0) {
            return res.status(200).json(results);
        } else {
            return res.status(404).send({ message: 'No hay usuarios' });
        }
    });

}

function getUsuario(req, res) {
    // Recogemos un parametro por la url
    var id = req.params.id;
    conexion.query(`SELECT * FROM usuarios WHERE id = ${id}`, function(error, results, fields) {
        if (error)
            throw error;
        if (results.length > 0) {
            return res.status(302).json(results);
        } else {
            return res.status(404).send({ canal: 'no existe ningun usuario con ese id' });
        }
    });

}

function updateUsuario(req, res) {
    // Recogemos un parámetro por la url
    var id = req.params.id;

    // Recogemos los datos que nos llegen en el body de la petición
    var update = req.body;
    var user = update.user;
    var password = update.password;
    var full_name = update.full_name;
    var roles = update.roles;

    // Buscamos por id y actualizamos el objeto y devolvemos el objeto actualizado
    conexion.query(`UPDATE usuarios SET user="${user}",password="${password}",full_name="${full_name}" WHERE id = ${id}`, function(error, results, fields) {
        if (error)
            return res.status(500).send({ message: 'error en el servidor' });
        if (results) {
            conexion.query(`DELETE FROM roles_usuarios WHERE user_id=${id}`);
            for (let rol of roles) {
                var query_rol = `INSERT INTO roles_usuarios(id, user_id, rol_id) VALUES (NULL, ${id}, ${rol.id})`;
                console.log("roles", query_rol);
                conexion.query(query_rol, function(error, results, fields) {
                    if (error)
                        console.log(error);
                    if (results) {
                        console.log(results);
                    } else {
                        console.log('asda');
                    }
                });
            }
            return res.status(201).send({ message: 'agregado correctamente' });
        } else {
            return res.status(404).send({ message: 'no existe ningun usuario con ese id' });
        }
    });
}

function deleteUsuario(req, res) {
    var id = req.params.id;
    // Buscamos por id y actualizamos el objeto y devolvemos el objeto actualizado
    conexion.query(`DELETE FROM usuarios WHERE id = ${id}`, function(error, results, fields) {
        if (error)
            return res.status(500).send({ message: 'error ssen el servidor' });
        if (results) {
            return res.status(200).json(results);
        } else {
            return res.status(404).send({ message: 'no existe ningun usuario con ese id' });
        }
    });
}



module.exports = {
    saveUsuario,
    getUsuarios,
    getUsuario,
    updateUsuario,
    deleteUsuario,
};