/****
 * conexion base de datos local */

require('dotenv').config({path:'./.env'});

const sql = require('mssql');
const config = {
    "server": process.env.SERVER_DB,
    "database": process.env.DATA_BASE,
    "user": process.env.USER_DB,
    "password": process.env.PASS_DB,
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