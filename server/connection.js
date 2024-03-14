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

// Endpoint to get nurse patient ratios
app.get('/api/nurse-patient-ratios', (req, res) => {
  db.query('SELECT * FROM NursePatientRatio', (err, results) => {
    if (err) {
      return res.json({ error: err.message });
    }
    res.json(results);
  });
});

// Endpoint to get sex at birth
app.get('/api/sex-at-birth', (req, res) => {
  db.query('SELECT * FROM SexAtBirth', (err, results) => {
    if (err) {
      return res.json({ error: err.message });
    }
    res.json(results);
  });
});

// Endpoint to get bCPAP types
app.get('/api/bcpap-types', (req, res) => {
  db.query('SELECT * FROM bCPAPType', (err, results) => {
    if (err) {
      return res.json({ error: err.message });
    }
    res.json(results);
  });
});

// Endpoint to get oxygen sources
app.get('/api/oxygen-sources', (req, res) => {
  db.query('SELECT * FROM OxygenSource', (err, results) => {
    if (err) {
      return res.json({ error: err.message });
    }
    res.json(results);
  });
});


// Endpoint to get patient outcomes
app.get('/api/patient-outcomes', (req, res) => {
  db.query('SELECT * FROM PatientOutcome', (err, results) => {
    if (err) {
      return res.json({ error: err.message });
    }
    res.json(results);
  });
});

// Endpoint to get bCPAP complications
app.get('/api/bcpap-complications', (req, res) => {
  db.query('SELECT * FROM bCPAPComplications', (err, results) => {
    if (err) {
      return res.json({ error: err.message });
    }
    res.json(results);
  });
});

// Endpoint to get bCPAP use lengths
app.get('/api/bcpap-use-lengths', (req, res) => {
  db.query('SELECT * FROM bCPAPUseLength', (err, results) => {
    if (err) {
      return res.json({ error: err.message });
    }
    res.json(results);
  });
});

// Endpoint to get reasons to start bCPAP
app.get('/api/start-bcpap-reasons', (req, res) => {
  db.query('SELECT * FROM StartbCPAPReasons', (err, results) => {
    if (err) {
      return res.json({ error: err.message });
    }
    res.json(results);
  });
});

// Endpoint to get reasons to stop bCPAP
app.get('/api/stop-bcpap-reasons', (req, res) => {
  db.query('SELECT * FROM StopbCPAPReasons', (err, results) => {
    if (err) {
      return res.json({ error: err.message });
    }
    res.json(results);
  });
});

// Endpoint to get O2 blending options
app.get('/api/o2-blending-options', (req, res) => {
  db.query('SELECT * FROM O2BlendingOptions', (err, results) => {
    if (err) {
      return res.json({ error: err.message });
    }
    res.json(results);
  });
});

// Endpoint to get hospitals
app.get('/api/getHospitals', (req, res) => {
  db.query('SELECT * FROM Hospitals', (err, results) => {
    if (err) {
      return res.json({ error: err.message });
    }
    res.json(results);
  });
});

// Endpoint to add a hospital
app.post('/api/postHospitals', (req, res) => {
  const { country, city, name } = req.body;
  const query = 'INSERT INTO Hospitals (country, city, name) VALUES (?, ?, ?)';
  db.query(query, [country, city, name], (err, result) => {
    if (err) {
      return res.json({ error: err.message });
    }
    res.json({ success: true, message: 'Hospital added successfully' });
  });
});

//Endpoint to get patientInterface options
app.get('/api/getPatientInterfaces', (req, res) => {
  db.query('SELECT * FROM PatientInterface', (err, results) => {
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
