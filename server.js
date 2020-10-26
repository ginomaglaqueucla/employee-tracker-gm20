const express = require('express');
const connection = require('./db/database');
const initialize = require('./queries/index');

const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Default response for any other request (Not Found)
app.use((req, res) => {s
  res.status(404).end();
});

// Start server after DB connection

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  let finishedFlag = false;
  initialize();
  
});