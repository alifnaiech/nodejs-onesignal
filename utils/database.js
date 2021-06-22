const mysql = require('mysql2');

const database = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'burro100',
    database: 'node-onesignal'
});

module.exports = database.promise();

