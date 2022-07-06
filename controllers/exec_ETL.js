const conexion = require('../database/database');
const bcrypt = require('bcrypt');
const { json } = require('body-parser');
const { reject } = require('bcrypt/promises');




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

// function ejecutarETL(){
//     return new Promise((resolved, reject)=>{
//         setTimeout(()=>{
//             resolved(ejecutar());
//         }, 3000)
//     })
// }

// ejecutarETL().then(res =>{
//     console.log(res);
// })


module.exports = {
    ejecutarETL,
    // ejecutar,
}