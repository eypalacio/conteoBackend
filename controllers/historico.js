const conexion = require('../database/database');

function saveAccion(user_id, accion) {
    let date = new Date();
    let fecha = date.getFullYear().toString() + '/' + (date.getMonth() + 1) + '/' + (date.getDate()) + ' ' + (date.getHours()) + ':' + (date.getMinutes()) + ':' + (date.getSeconds());
    conexion.query(`SELECT user FROM usuarios WHERE id=${user_id}`, function(error, resulta, fieldd) {
        if (error) {
            console.log(error);
        } else {
            let query = `INSERT INTO user_history (id, user_id, usuario, accion, fecha) VALUES (NULL, ${user_id}, "${resulta[0].user}", "${accion}", "${fecha}")`;
            conexion.query(query, function(err, result, field) {
                if (err) {
                    console.log('error', err);
                } else {}
            });
        }
    })

}

module.exports = {
    saveAccion
};