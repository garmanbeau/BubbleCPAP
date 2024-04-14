CREATE TABLE Patients (
    PatientID INT AUTO_INCREMENT PRIMARY KEY,
    AssignedSexAtBirth VARCHAR(15),
    Diagnosis VARCHAR(255),
    Age VARCHAR(255), 
    GestationalAge VARCHAR(255),
    MedicalHistory VARCHAR(255),
    BubbleCPAPExpiratoryLimbSizeMM INT,
    BCPAPTypeDeviceUsed VARCHAR(255),
    DurationOfBubbleCPAPUse VARCHAR(255),
    MinPressure INT,
    MaxPressure INT,
    PrimarySourceOfOxygen VARCHAR(255),
    PatientInterface VARCHAR(255),
    MethodOfOxygenBlending VARCHAR(255),
    MethodOfHumidification VARCHAR(255),
    Hospital_Id INT, 
    FOREIGN KEY (Hospital_Id) REFERENCES Hospitals(id)
);

CREATE TABLE Patient_Outcome (
    patient_id INT,
    outcome VARCHAR(255),
    PRIMARY KEY (patient_id, outcome),
    FOREIGN KEY (patient_id) REFERENCES Patients(PatientID)
);

CREATE TABLE Patient_Complication (
    patient_id INT,
    complication VARCHAR(255),
    severity INT,
    PRIMARY KEY (patient_id, complication),
    FOREIGN KEY (patient_id) REFERENCES Patients(PatientID)
);

CREATE TABLE Patient_Start_Reasons (
    patient_id INT,
    startReasons VARCHAR(255),
    PRIMARY KEY (patient_id, startReasons),
    FOREIGN KEY (patient_id) REFERENCES Patients(PatientID)
);

CREATE TABLE Patient_Stop_Reasons (
    patient_id INT,
    stopReasons VARCHAR(255),
    PRIMARY KEY (patient_id, stopReasons),
    FOREIGN KEY (patient_id) REFERENCES Patients(PatientID)
);
-- CREATE TABLE PatientData (
--     id INT AUTO_INCREMENT,
--     hospArea_id INT,
--     sexAtBirth_id INT,
--     bCPAPType_id INT,
--     oxygenSource_id INT,
--     patientInterface_id INT,
--     nursePatientRatio_id INT,
--     PRIMARY KEY (id),
--     FOREIGN KEY (hospArea_id) REFERENCES HospAreas(id),
--     FOREIGN KEY (sexAtBirth_id) REFERENCES SexAtBirth(id),
--     FOREIGN KEY (bCPAPType_id) REFERENCES bCPAPType(id),
--     FOREIGN KEY (oxygenSource_id) REFERENCES OxygenSource(id),
--     FOREIGN KEY (patientInterface_id) REFERENCES PatientInterface(id),
--     FOREIGN KEY (nursePatientRatio_id) REFERENCES NursePatientRatio(id)
-- );
