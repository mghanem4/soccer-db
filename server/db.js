// database.js
const sqlite3 = require('sqlite3').verbose();
// const dotenv = require('dotenv');
// const path = require('path');

// // Load environment variables
// dotenv.config();

// Connect to SQLite database
const db = new sqlite3.Database('./database/soccer.db', (err) => {
  if (err) {
    console.error('Error connecting to sqlite3 database in db.js: ', err.message);
  } else {
    console.log('Connected to sqlite3 database in db.js');
  }
});


// Export the database connection
module.exports = db;
