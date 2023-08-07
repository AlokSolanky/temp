const mysql = require('mysql2');
const { connect } = require('../routes/admin');

const pool = mysql.createPool({
    host:"localhost",
    user:"root",
    database:"node-complete",
    password:"alok"
});


module.exports = pool.promise();