const connection = require('../database/database');
const bcrypt = require('bcrypt');
const { json } = require('body-parser');
const { query } = require('../database/database');

function getMT299(req, res){
    let query =  `SELECT * FROM MT299 ORDER BY RECID DESC `

    connection.query(query, function(error, result){
        if(error){
            return res.status(500).send(error);
        }
        if(result){
            res.status(200).send(result.recordset)
        }
    })
}

function getMT206SLBTR(req, res){
    let query =  `SELECT * FROM MT206SLBTR ORDER BY REF_206_ENV DESC `

    connection.query(query, function(error, result){
        if(error){
            return res.status(500).send(error);
        }
        if(result){
            res.status(200).send(result.recordset)
        }
    })
}

module.exports = {
    getMT299,
    getMT206SLBTR,
}