// get the client
const mysql = require('mysql2');

// create the connection to database
const connection = mysql.createConnection({
    host: 'localhost',
    // port: 3306,
    user: 'root',
    password: 'UCLABootCamp',
    database: 'employeeTrackerDB'
});
connection.connect(err => {
    if (err) throw err;
});

module.exports = connection;