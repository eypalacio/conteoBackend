/****
 * conexion base de datos local */

require('dotenv').config({path:'./.env'});

const sql = require('mssql');
const config = {
    "server": process.env.LOCAL_SERVER_DB,
    "database": process.env.LOCAL_DATA_BASE,
    "user": process.env.LOCAL_USER_DB,
    "password": process.env.LOCAL_PASS_DB,
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
    console.log("Successful Connection!");
})

module.exports = sql;