function ejecutarETL(req, res){
    const exec  = require('node:child_process');
    exec('E:/Mio/scripts/mover_archivos.bat', (e, stdout, stderr)=>{
        if(e){throw e}
        console.log(stdout);
    })
    
    }
    
    function ejecutarETLold(req, res) {
      
    
        var cp = require('child_process');
        cp.exec('C:mover_archivos', function(e, stdout, stderr) {
          console.log(stdout);
          console.log(stderr);
          if (e) throw e;
        });
        }