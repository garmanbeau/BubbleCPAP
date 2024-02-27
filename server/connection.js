const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const cors = require('cors');

// Create a new express application instance
const app = express();

// The port the express app will listen on
const port = 3000;

// Enable CORS
app.use(cors());

// Support JSON-encoded bodies
app.use(bodyParser.json());

// Support URL-encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));

// Database connection configuration
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '', //your password here
  database: 'bubblecpap'
});

// Connect to the database
db.connect((err) => {
  if (err) throw err;
  console.log('Connected to the database');
});

// Endpoint to get hosp areas
app.get('/api/hosp-areas', (req, res) => {
  db.query('SELECT * FROM HospAreas', (err, results) => {
    if (err) {
      return res.json({ error: err.message });
    }
    res.json(results);
  });
});

// Serve your application at the given port
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
