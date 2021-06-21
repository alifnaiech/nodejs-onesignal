const mysql = require('mysql2');

const database = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'sirine',
    database: 'node-onesignal'
});

module.exports = database.promise();

