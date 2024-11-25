// index.js
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Debugging: Check if the database and routes folder exist
console.log('Database file exists:', fs.existsSync('./database/soccer.db'));
console.log('Routes folder exists:', fs.existsSync('./routes'));
console.log('Players route exists:', fs.existsSync('./routes/players.js'));
console.log('Teams route exists:', fs.existsSync('./routes/teams.js'));

// Connect to SQLite database
const db = new sqlite3.Database('./database/soccer.db', (err) => {
  if (err) {
    console.error('Error connecting to sqlite3 database in index.js: ', err.message);
  } else {
    console.log('Connected to sqlite3 database in index.js');
  }
});

// Routes
try {
  app.use('/players', require('./routes/players'));
  app.use('/teams', require('./routes/teams'));
} 
catch (error) {
  console.error('Error loading routes:', error.message);
}

// Default route
app.get('/', (req, res) => {
  res.send('Soccer database API is running.');
});
// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
