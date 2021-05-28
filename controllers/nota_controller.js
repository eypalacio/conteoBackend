function saveNota(req, res) {

    // Creamos el objeto Nota
    var nota = new Nota();

    // Recogemos los datos que nos llegan por POST
    var params = req.body;

    // Comprobamos que nos llega el nombre
    if (params.nombre) {

        // Asignamos un valor a las propiedades del objeto Nota
        nota.nombre = params.nombre;
        nota.descripcion = params.descripcion;

        // Guardamos el documento en la base de datos
        nota.save((err, notaStored) => {

            // Si se produce un error lo devolvemos
            if (err) return res.status(500).send({ message: 'Error en el servidor' });

            // En el caso de que el documento se guarde tambien devolvemos el objeto guardado
            if (notaStored) {
                return res.status(200).send({
                    nota: notaStored
                });
            } else {
                return res.status(200).send({
                    message: 'No se ha guardado la nota'
                });
            }

        });
    } else {
        return res.status(200).send({
            message: 'El nombre de la fruta es obligatorio'
        });
    }
}

function getNotas(req, res) {

    // Usamos el método find sobre nuesta entidad Nota y ordenamos los resultados
    Nota.find({}).sort({ '_id': -1 }).exec((err, notas) => {
        if (err) return res.status(500).send({ message: 'Error en el servidor' });

        // Devolvemos el resultado de la query en json
        if (notas) {
            return res.status(200).send({
                notas
            });
        } else {
            return res.status(404).send({
                message: 'No hay notas'
            });
        }

    });
}

function getNota(req, res) {
    // Recogemos un parametro por la url
    var notaId = req.params.id;

    // Buscamos por ID
    Nota.findById(notaId).exec((err, nota) => {
        if (err) return res.status(500).send({ message: 'Error en el servidor' });

        // Devolvemos el resultado
        if (nota) {
            return res.status(200).send({
                nota
            });
        } else {
            return res.status(404).send({
                message: 'No existe la nota'
            });
        }

    });
}

function updateNota(req, res) {
    // Recogemos un parámetro por la url
    var notaId = req.params.id;

    // Recogemos los datos que nos llegen en el body de la petición
    var update = req.body;

    // Buscamos por id y actualizamos el objeto y devolvemos el objeto actualizado
    Nota.findByIdAndUpdate(notaId, update, { new: true }, (err, notaUpdated) => {
        if (err) return res.status(500).send({ message: 'Error en el servidor' });

        if (notaUpdated) {
            return res.status(200).send({
                nota: notaUpdated
            });
        } else {
            return res.status(404).send({
                message: 'No existe la nota'
            });
        }
    });
}

function deleteNota(req, res) {
    var notaId = req.params.id;

    // Buscamos por ID, eliminamos el objeto y devolvemos el objeto borrado en un JSON
    Nota.findByIdAndRemove(notaId, (err, notaRemoved) => {
        if (err) return res.status(500).send({ message: 'Error en el servidor' });

        if (frutaRemoved) {
            return res.status(200).send({
                nota: notaRemoved
            });
        } else {
            return res.status(404).send({
                message: 'No existe la nota'
            });
        }

    });
}

module.exports = {
    saveNota,
    getNotas,
    getNota,
    updateNota,
    deleteNota
};