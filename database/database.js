/****
 * conexion base de datos local */

// const sql = require('mssql');
// const config = {
//     "server": '10.1.13.41',
//     "database": 'ConteoT24',
//     "user": 'swift',
//     "password": 'ok12345*',
//     "port": 1433,
//     "options": {
//         "encrypt": false,
//         "trustServerCertificate": true,
//         "enableArithAbort": true,
//         "trustedConnection": true,
//     }
// }

 const sql = require('mssql');
 const config = {
    "server": '172.16.30.1',
    "database": 'ConteoT24',
    "user": 'sa',
    "password": 'D@ta6enter2019',
    "port": 1433,
    "options": {
        "encrypt": false,
        "trustServerCertificate": true,
        "enableArithAbort": true,
        "trustedConnection": true,
    }
}

sql.connect(config, err => {
    if (err) {
        console.log(err);
    }
    console.log("Connection Successful !");
})

module.exports = sql;