const conexion = require('../database/database');
const bcrypt = require('bcrypt');
const { json } = require('body-parser');
const { reject } = require('bcrypt/promises');


function ejecutarConteoT24(req, res) {
    const { spawn } = require('child_process');
    const child = spawn('"C:/newApps-BACKEND/app_Spoon/ConteoT24.bat"', { shell: true });
    child.stdout.on('data', (data) => {
        console.log(`stdout: ${data}`);
        let test = data
        console.log('data', test);
    });
    child.stderr.on('data', (data) => {
        console.error(`stderr: ${data}`);
    });
    child.on('close', (code) => {
        return res.status(200).send(`child process existed with code ${code}`);
    })

}

function ejecutarConteoSLBTR(req, res) {
    const { spawn } = require('child_process');
    const child = spawn('"C:/newApps-BACKEND/app_Spoon/ConteoSLBTR.bat"', { shell: true });
    child.stdout.on('data', (data) => {
        console.log(`stdout: ${data}`);
    });
    child.stderr.on('data', (data) => {
        console.error(`stderr: ${data}`);
    });
    child.on('close', (code) => {
        return res.status(200).send(`child process existed with code ${code}`);
    })
}


module.exports = {
    ejecutarConteoT24,
    ejecutarConteoSLBTR,
}