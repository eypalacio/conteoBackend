const conexion = require('./database');
var errores = 0;
var error_msg
var resultados = 0;

function createTables(req, res) {
    tableUsuario();
    tableRoles();
    tableRolUsuario();
    tableRolPermisos();
    tableDocumentos();
    return res.status(200).send({ 'errores': errores, 'resultados': resultados, 'error': error_msg });
}

function tableUsuario() {
    var query = `CREATE TABLE usuarios (
        id int(11) DEFAULT NULL COMMENT "Llave Primaria",
        user varchar(255) NOT NULL,
        password varchar(255) NOT NULL,
        full_name varchar(255) DEFAULT NULL,
        register_date varchar(50) DEFAULT NULL,
        register_hour varchar(50) DEFAULT NULL,
        avatar text DEFAULT NULL
      ) ENGINE=InnoDB DEFAULT CHARSET=latin1 ROW_FORMAT=COMPACT;
     `;
    conexion.query(query, function (error, results, fields) {
        if (error) {
            error += 1;
            error_msg = error
        };
        if (results) resultados += 1;
    });

    var query2 = `ALTER TABLE usuarios
    ADD PRIMARY KEY (id) USING BTREE;
    ;`;
    conexion.query(query2, function (error, results, fields) {
        if (error) errores += 1;
        if (results) resultados += 1;
    });

    var query3 = `ALTER TABLE usuarios
    MODIFY id int(11) NOT NULL AUTO_INCREMENT COMMENT "Llave Primaria";`;
    conexion.query(query3, function (error, results, fields) {
        if (error) {
            error += 1;
            error_msg = error
        };
        if (results) resultados += 1;
    });

    var query4 = `COMMIT;`;
    conexion.query(query4, function (error, results, fields) {
        if (error) {
            error += 1;
            error_msg = error
        };
        if (results) resultados += 1;
    });
}

function tableRoles() {
    var query = `CREATE TABLE roles (
        id int(11) NOT NULL,
        rol_name varchar(255) NOT NULL,
        description varchar(255) DEFAULT NULL
      ) ENGINE=InnoDB DEFAULT CHARSET=latin1 ROW_FORMAT=COMPACT`;
    conexion.query(query, function (error, results, fields) {
        if (error) errores += 1;
        if (results) resultados += 1;
    });

    var query2 = `ALTER TABLE roles
    ADD PRIMARY KEY (id) USING BTREE`;
    conexion.query(query2, function (error, results, fields) {
        if (error) errores += 1;
        if (results) resultados += 1;
    });

    var query3 = `ALTER TABLE roles
    MODIFY id int(11) NOT NULL AUTO_INCREMENT;`;
    conexion.query(query3, function (error, results, fields) {
        if (error) {
            error += 1;
            error_msg = error
        };
        if (results) resultados += 1;
    });

    var query4 = `COMMIT;`;
    conexion.query(query4, function (error, results, fields) {
        if (error) {
            error += 1;
            error_msg = error
        };
        if (results) resultados += 1;
    });
}

function tableRolUsuario() {
    var query = `CREATE TABLE roles_usuarios (
        id int(11) NOT NULL,
        user_id int(11) NOT NULL,
        rol_id int(11) NOT NULL
      ) ENGINE=InnoDB DEFAULT CHARSET=latin1 ROW_FORMAT=COMPACT`;
    conexion.query(query, function (error, results, fields) {
        if (error) errores += 1;
        if (results) resultados += 1;
    });

    var query2 = `ALTER TABLE roles_usuarios
  ADD PRIMARY KEY (id,user_id,rol_id) USING BTREE`;
    conexion.query(query2, function (error, results, fields) {
        if (error) errores += 1;
        if (results) resultados += 1;
    });

    var query3 = `ALTER TABLE roles_usuarios
    MODIFY id int(11) NOT NULL AUTO_INCREMENT;`;
    conexion.query(query3, function (error, results, fields) {
        if (error) {
            error += 1;
            error_msg = error
        };
        if (results) resultados += 1;
    });

    var query4 = `COMMIT;`;
    conexion.query(query4, function (error, results, fields) {
        if (error) {
            error += 1;
            error_msg = error
        };
        if (results) resultados += 1;
    });
}

function tableRolPermisos() {
    var query = `CREATE TABLE roles_permisos (
        id int(11) NOT NULL,
        rol_id int(11) NOT NULL,
        is_all tinyint(1) DEFAULT NULL,
        is_create tinyint(1) DEFAULT NULL,
        is_edit tinyint(1) DEFAULT NULL,
        is_delete tinyint(1) DEFAULT NULL,
        is_read tinyint(1) DEFAULT NULL
      ) ENGINE=InnoDB DEFAULT CHARSET=latin1 ROW_FORMAT=COMPACT`;
    conexion.query(query, function (error, results, fields) {
        if (error) errores += 1;
        if (results) resultados += 1;
    });

    var query2 = `ALTER TABLE roles_permisos
    ADD PRIMARY KEY (id,rol_id) USING BTREE`;
    conexion.query(query2, function (error, results, fields) {
        if (error) errores += 1;
        if (results) resultados += 1;
    });

    var query3 = `ALTER TABLE roles_permisos
    MODIFY id int(11) NOT NULL AUTO_INCREMENT;`;
    conexion.query(query3, function (error, results, fields) {
        if (error) {
            error += 1;
            error_msg = error
        };
        if (results) resultados += 1;
    });

    var query4 = `COMMIT;`;
    conexion.query(query4, function (error, results, fields) {
        if (error) {
            error += 1;
            error_msg = error
        };
        if (results) resultados += 1;
    });
}

function tableDocumentos() {
    var query = `CREATE TABLE documentos (
        id bigint(20) UNSIGNED NOT NULL,
        title varchar(255) NOT NULL,
        descripcion text NOT NULL,
        imagen text NOT NULL,
        date text NOT NULL,
        estado tinyint(1) NOT NULL
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4`;
    conexion.query(query, function (error, results, fields) {
        if (error) errores += 1;
        if (results) resultados += 1;
    });

    var query2 = `ALTER TABLE documentos
    ADD UNIQUE KEY id (id)`;
    conexion.query(query2, function (error, results, fields) {
        if (error) errores += 1;
        if (results) resultados += 1;
    });

    var query3 = `ALTER TABLE documentos
    MODIFY id int(11) NOT NULL AUTO_INCREMENT;`;
    conexion.query(query3, function (error, results, fields) {
        if (error) {
            error += 1;
            error_msg = error
        };
        if (results) resultados += 1;
    });

    var query4 = `COMMIT;`;
    conexion.query(query4, function (error, results, fields) {
        if (error) {
            error += 1;
            error_msg = error
        };
        if (results) resultados += 1;
    });
}

module.exports = {
    createTables,
}