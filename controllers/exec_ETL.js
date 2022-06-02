const conexion = require('../database/database');
const bcrypt = require('bcrypt');
const { json } = require('body-parser');



function ejecutarETL(req, res){
    const { spawn } = require('child_process');
    const child = spawn('"E:/Mio/desarrollo web/Project/SwiftMensajes/backend/mover_archivos.bat"', {shell: true});
    child.stdout.on('data', (data) =>{
        console.log(`stdout: ${data}`);
    });
    child.stderr.on('data', (data)=>{
        console.error(`stderr: ${data}`);
    });
    child.on('close', (code) =>{
        console.log(`child process existed with code ${code}`);
    })
    }


module.exports = {
    ejecutarETL,
}