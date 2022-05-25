
const mysql = require('mysql2')


// const db = mysql.createPool({
//     host : 'localhost',
//     database : 'moe',
//     user : "root",
//     password : "toor",
//     charset: 'utf8'
    
// });


const db = mysql.createPool({
    host : '212.107.17.205',
    database : 'u809334642_moe_db',
    user : "u809334642_moe_db",
    password : "##Moe@hq2022##",
    charset: 'utf8'
    
});


module.exports = db.promise()