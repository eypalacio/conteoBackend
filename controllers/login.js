const { query } = require('../database/database');
const conexion = require('../database/database');
const bcrypt = require('bcrypt');

function login(req, res) {
    var body = req.body;
    var user = body.user;
    var pass = body.pass;

    let query = `SELECT usuarios.*, roles.rol_name FROM usuarios INNER JOIN roles_usuarios ON usuarios.id=roles_usuarios.user_id INNER JOIN roles ON roles_usuarios.rol_id=roles.id WHERE usuarios.user="${user}"`;
    conexion.query(query, function(error, result, field) {
        if (error)
            return res.status(500).send({ message: 'error en el servidor', status: 500, err: error });
        if (result.length > 0) {
            if (bcrypt.compareSync(pass, result[0].password)) {
                return res.status(200).json({ message: 'usuario autenticado correctamente', status: 200, usuario: result });
            } else {
                return res.status(404).send({ message: 'no existe ningun usuario con ese user y pass', status: 400 });
            }
        } else {
            return res.status(404).send({ message: 'no existe ningun usuario con ese user y pass', status: 400 });
        }
    });
}

module.exports = {
    login
};