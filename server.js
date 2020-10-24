// get the client
const mysql = require('mysql2');
const express = require('express');

// create the connection to database
const connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'ginMAN202036$',
  database: 'employeeTrackerDB'
});

connection.connect(err => {
  if (err) throw err;
  console.log('connected as id ' + connection.threadId + '\n');
  schemaDB();
});

schemaDB = () => {
  console.log('Establishing Database....\n');
  const query = connection.query(
    'SELECT * FROM employee',
    function(err, res) {
      if (err) throw err;
      console.log(res);
      // seedsDB();
    }
  );
};

// seedsDB = () => {
//   console.log('Loading Database....\n');
//   const query = connection.query(
//     'source db/seeds.sql;',
//     function(err, res) {
//       if (err) throw err;
//       console.log('seeds successful!\n');
//       displayDB();
//     }
//   );
//   // logs the actual query being run
//   console.log(query.sql);
// };

// displayDB = () => {
//   const query = connection.query(
//     'SELECT * FROM employee',
//     function(err, res) {
//       if (err) throw err;
//     }
//   );
//   // logs the actual query being run
//   console.log(query.sql);
// };

// const db = require('./db/database');

const PORT = process.env.PORT || 3001;
const app = express();

const apiRoutes = require('./routes/apiRoutes');

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Use apiRoutes
app.use('/api', apiRoutes);

// Default response for any other request (Not Found)
app.use((req, res) => {
  res.status(404).end();
});

// Start server after DB connection
// db.on('open', () => {
//   app.listen(PORT, () => {
//     console.log(`Server running on port ${PORT}`);
//   });
// });