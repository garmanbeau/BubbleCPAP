CREATE TABLE Patients (
    PatientID INT PRIMARY KEY,
    AssignedSexAtBirth VARCHAR(15),
    Diagnosis VARCHAR(255),
    AgeYears INT,
    AgeMonths INT,
    AgeDays INT,
    MedicalHistory VARCHAR(255),
    BubbleCPAPExpiratoryLimbSizeMM INT,
    BCPAPTypeDeviceUsed VARCHAR(255),
    DurationOfBubbleCPAPUse VARCHAR(255),
    MinPressure INT,
    MaxPressure INT,
    PrimarySourceOfOxygen VARCHAR(255),
    PatientInterface VARCHAR(255),
    MethodOfOxygenBlending VARCHAR(255),
    MethodOfHumidification VARCHAR(255)
);



-- CREATE TABLE Patient_Outcome (
--     patient_id INT,
--     outcome_id INT,
--     PRIMARY KEY (patient_id, outcome_id),
--     FOREIGN KEY (patient_id) REFERENCES PatientData(id),
--     FOREIGN KEY (outcome_id) REFERENCES PatientOutcome(id)
-- );

-- CREATE TABLE Patient_Complication (
--     patient_id INT,
--     complication_id INT,
--     PRIMARY KEY (patient_id, complication_id),
--     FOREIGN KEY (patient_id) REFERENCES PatientData(id),
--     FOREIGN KEY (complication_id) REFERENCES bCPAPComplications(id)
-- );

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
