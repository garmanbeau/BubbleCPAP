const express = require('express');
const bodyParser = require('body-parser');
const mysqlPromise = require('mysql2/promise');
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

let dbPromise;

async function connectToDatabase() {
  dbPromise = await mysqlPromise.createConnection({
    host: 'localhost',
  user: 'root',
  password: '', //your password here
  database: 'bubblecpap'
  });
}

connectToDatabase().catch(error => {
  console.error('Error connecting to the database:', error);
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

// Endpoint to get humidification options
app.get('/api/humidification-options', (req, res) => {
  db.query('SELECT * FROM HumidificationOptions', (err, results) => {
    if (err) {
      return res.json({ error: err.message });
    }
    res.json(results);
  });
});


app.post('/api/submitPatient', async (req, res) => {
  try {
    // Insert patient data into Patients table
    const { AssignedSexAtBirth, Diagnosis,AgeYears,
      AgeMonths,
      AgeDays,
      MedicalHistory,
      BubbleCPAPExpiratoryLimbSizeMM,
      BCPAPTypeDeviceUsed,
      DurationOfBubbleCPAPUse,
      MinPressure,
      MaxPressure,
      PrimarySourceOfOxygen,
      PatientInterface,
      MethodOfOxygenBlending,
      MethodOfHumidification,
      Hospital_Id,
       StartBCPAPReasons,
      StopBCPAPReasons,
      PatientOutcomes, 
      PatientComplications,} = req.body;
    const insertPatientQuery = 'INSERT INTO Patients (AssignedSexAtBirth, Diagnosis, AgeYears, AgeMonths, AgeDays, MedicalHistory, BubbleCPAPExpiratoryLimbSizeMM, BCPAPTypeDeviceUsed, DurationOfBubbleCPAPUse, MinPressure, MaxPressure, PrimarySourceOfOxygen, PatientInterface, MethodOfOxygenBlending, MethodOfHumidification, Hospital_Id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
   const [patientResult] = await dbPromise.query(insertPatientQuery, [
      AssignedSexAtBirth,
      Diagnosis,
      AgeYears,
      AgeMonths,
      AgeDays,
      MedicalHistory,
      BubbleCPAPExpiratoryLimbSizeMM,
      BCPAPTypeDeviceUsed,
      DurationOfBubbleCPAPUse,
      MinPressure,
      MaxPressure,
      PrimarySourceOfOxygen,
      PatientInterface,
      MethodOfOxygenBlending,
      MethodOfHumidification,
      Hospital_Id,
    ]);

    const patientId = patientResult.insertId;
    console.log(patientResult)
console.log("Submitted");
console.log(patientId);
    // Get the auto-incremented PatientID
    //const patientId = patientResult.insertId;

    // Insert data into other tables (Patient_Outcome, Patient_Complication, Patient_Start_Reasons, Patient_Stop_Reasons)
    // ...

    for (const startReason of StartBCPAPReasons) {
      if (startReason.value) {
        // Insert the row into the table (replace with your actual query)
        const insertQuery = 'INSERT INTO Patient_Start_Reasons (patient_id, startReasons) VALUES (?, ?)';
        await dbPromise.query(insertQuery, [patientId, startReason.label]);
      }
    }
    for (const stopReason of StopBCPAPReasons) {
      if (stopReason.value) {
        // Insert the row into the table (replace with your actual query)
        const insertQuery = 'INSERT INTO Patient_Stop_Reasons (patient_id, stopReasons) VALUES (?, ?)';
        await dbPromise.query(insertQuery, [patientId, stopReason.label]);
      }
    }
    for (const outcome of PatientOutcomes) {
      if (outcome.value) {
        // Insert the row into the table (replace with your actual query)
        const insertQuery = 'INSERT INTO Patient_Outcome (patient_id, outcome) VALUES (?, ?)';
        await dbPromise.query(insertQuery, [patientId, outcome.label]);
      }
    }
    for (const complication of PatientComplications) {
      if (complication.value) {
        // Insert the row into the table (replace with your actual query)
        const insertQuery = 'INSERT INTO Patient_Complication (patient_id, complication, severity) VALUES (?, ?, ?)';
        await dbPromise.query(insertQuery, [patientId, complication.label, complication.severity]);
      }
    }

    res.json({ success: true });
  } catch (error) {
    console.error('Error submitting patient data:', error);
    res.status(500).json({ error: 'Error submitting patient data' });
  }
});

app.post('/api/add-hospital-data', async (req, res) => {
  const { id, year, BCPAPUnitsAvailable, PediatricAdmissionsPerMonth, ChildrenOnBCPAPPerMonth, RespiratorySpecialistsAvailable, NurseToPatientRatio, units } = req.body;
  
  try {
    // Insert into HospitalData
    const insertHospitalDataQuery = 'INSERT INTO HospitalData VALUES (?, ?, ?, ?, ?, ?, ?)';
    await dbPromise.query(insertHospitalDataQuery, [id, year, BCPAPUnitsAvailable, PediatricAdmissionsPerMonth, ChildrenOnBCPAPPerMonth, RespiratorySpecialistsAvailable, NurseToPatientRatio]);

    // Insert into HospitalBCPAPUnits
    for (const unit of units) {
      if (unit.value) {
        const insertUnitQuery = 'INSERT INTO HospitalBCPAPUnits VALUES (?, ?, ?)';
        await dbPromise.query(insertUnitQuery, [id, year, unit.label]);
      }
    }

    // Update LastQuestionAsked in Hospitals
    const updateLastQuestionAskedQuery = 'UPDATE Hospitals SET LastQuestionAsked = CURDATE() WHERE id = ?';
    await dbPromise.query(updateLastQuestionAskedQuery, [id]);

    res.json({ success: true });
  } catch (err) {
    console.error('Error adding hospital data:', err);
    res.status(500).json({ error: 'Error adding hospital data' });
  }
});

// Serve your application at the given port
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
