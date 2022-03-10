const mysql = require('mysql2');

const db = mysql.createPool({
    host: 'localhost',
    port: 3308,
    user: 'root',
    password: '',
    database: 'nodeApi'
});

module.exports = db.promise();