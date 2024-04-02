CREATE TABLE HospAreas (
    id INT AUTO_INCREMENT,
    name VARCHAR(255),
    PRIMARY KEY (id)
);

INSERT INTO HospAreas (name)
VALUES ('PICU'), ('NICU'), ('CICU'), ('Emergency Department'), ('Inpatient Pediatric Ward'), ('Inpatient General Ward (Adults and Kids)'), ('Inpatient General ICU (Adults and Kids)'), ('Acute Care Unit (ACU)'), ('Emergency Pediatric Unit (EPU)');

CREATE TABLE SexAtBirth (
    id INT AUTO_INCREMENT,
    sex VARCHAR(255),
    PRIMARY KEY (id)
);

INSERT INTO SexAtBirth (sex)
VALUES ('Male'), ('Female'), ('Other');

CREATE TABLE bCPAPType (
    id INT AUTO_INCREMENT,
    type VARCHAR(255),
    PRIMARY KEY (id)
);

INSERT INTO bCPAPType (type)
VALUES ('Industry'), ('Homemade'), ('Other'), ('Unknown');

CREATE TABLE OxygenSource (
    id INT AUTO_INCREMENT,
    source VARCHAR(255),
    PRIMARY KEY (id)
);

INSERT INTO OxygenSource (source)
VALUES ('Tank'), ('Wall'), ('Oxygen Concentrator'), ('Other');

CREATE TABLE PatientInterface (
    id INT AUTO_INCREMENT,
    interface VARCHAR(255),
    PRIMARY KEY (id)
);

INSERT INTO PatientInterface (interface)
VALUES ('Nose/Mouth Mask'), ('Nasal Mask'), ('Scuba/Full Face Mask'), ('Nasal Prongs');

CREATE TABLE PatientOutcome (
    id INT AUTO_INCREMENT,
    outcome VARCHAR(255),
    PRIMARY KEY (id)
);

INSERT INTO PatientOutcome (outcome)
VALUES ('Discharged Home'), ('Transferred to Another Hospital'), ('Died'), ('Intubated');

CREATE TABLE bCPAPComplications (
    id INT AUTO_INCREMENT,
    complication VARCHAR(255),
    PRIMARY KEY (id)
);

INSERT INTO bCPAPComplications (complication)
VALUES ('Nasal Irritation'), ('Nasal Septal Injury'), ('Abdominal Distension Requiring Decompression'), ('Aspiration'), ('Pneumothorax'), ('Other');

CREATE TABLE NursePatientRatio (
    id INT AUTO_INCREMENT,
    ratio VARCHAR(255),
    PRIMARY KEY (id)
);

INSERT INTO NursePatientRatio (ratio)
VALUES ('1:1'), ('1:2'), ('1:3'), ('1:4'), ('1:5'), ('>1:5');

CREATE TABLE bCPAPUseLength (
    id INT AUTO_INCREMENT,
    length VARCHAR(255),
    PRIMARY KEY (id)
);

INSERT INTO bCPAPUseLength (length)
VALUES ('<1 day'), ('1-3 days'), ('3-7 days'), ('>7 days');

CREATE TABLE StartbCPAPReasons (
    id INT AUTO_INCREMENT,
    reason VARCHAR(255),
    PRIMARY KEY (id)
);

INSERT INTO StartbCPAPReasons (reason)
VALUES ('Hypoxemia'), ('Increased Work of Breathing/Tachypnea/Dyspnea'), ('Respiratory Failure'), ('Hypercarbia');

CREATE TABLE StopbCPAPReasons (
    id INT AUTO_INCREMENT,
    reason VARCHAR(255),
    PRIMARY KEY (id)
);

INSERT INTO StopbCPAPReasons (reason)
VALUES ('Improved Oxygenation'), ('Improved Work of Breathing'), ('Improved Ventilation'), ('Escalation to Higher Form of Support (Bi-level, Intubation)'), ('Withdrawal of Therapy/End of Life'), ('Parent Request');

CREATE TABLE O2BlendingOptions (
    id INT AUTO_INCREMENT,
    blend VARCHAR(255),
    PRIMARY KEY (id)
);

INSERT INTO O2BlendingOptions (blend)
VALUES ('Venturi Entrainment Air-Oxygen Mixer'), ('Oxygen Concentrator'), ('Air/Oxygen Y-Connection Mix'), ('No Blending');

CREATE TABLE Hospitals (
    id INT AUTO_INCREMENT,
    country VARCHAR(255),
    city VARCHAR(255),
    name VARCHAR(255),
    LastQuestionAsked date,
    PRIMARY KEY (id)
);

CREATE TABLE HumidificationOptions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    humidOption VARCHAR(255) NOT NULL
);

INSERT INTO HumidificationOptions (humidOption)
VALUES ('Passive HME (Heat and Moisture Exchanger)'),
       ('Bubble Humidifier - Non-heated'),
       ('Heated Humidifier'),
       ('None')
       ;


