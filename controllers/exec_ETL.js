const conexion = require('../database/database');
const bcrypt = require('bcrypt');
const { json } = require('body-parser');
const { reject } = require('bcrypt/promises');




function ejecutarETL(req, res){
    try{
    const { spawn } = require('child_process');
    const child = spawn('"C:/proyectos/conteoBackend/mover_archivos.bat"', {shell: true});
    child.stdout.on('data', (data) =>{
        console.log(`stdout: ${data}`);
    });
    child.stderr.on('data', (data)=>{
        console.error(`stderr: ${data}`);
      
    });
    child.on('close', (code) =>{
        console.log(`child process existed with code ${code}`);
        return res.status(200).send(`child process existed with code ${code}`);

    })
}catch(e){
    console.log('esto es una puta mierda',e);
}
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