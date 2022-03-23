const mysql = require('mysql');
const host = 'localhost';
const database = 'test';
const user = 'root';
const password = '';

const conexion = mysql.createConnection({
    host: host,
    database: database,
    user: user,
    password: password,
});



// const sql = require('mssql');
// const config = {
//     "server": 'localhost',
//     "database": 'aa',
//     "user": 'sa',
//     "password": 'sq!server',
//     "port": 1433,
//     "options": {
//         "encrypt": false,
//         // "trustServerCertificate": true,
//         // "enableArithAbort": true,
//         // "trustedConnection": true,
//     }
// }

// sql.connect(config, err => {
//     if (err) {
//         console.log(err);
//     }
//     console.log("Connection Successful !");
// })

//var conexion = mssql.connect(config);

module.exports = conexion;