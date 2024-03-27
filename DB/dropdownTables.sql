CREATE TABLE HospAreas (
    id INT AUTO_INCREMENT,
    name VARCHAR(255),
    PRIMARY KEY (id)
);

INSERT INTO HospAreas (name)
VALUES ('PICU'), ('NICU'), ('CICU'), ('emergency department'), ('inpatient pediatric ward'), ('inpatient general ward (adults and kids)'), ('inpatient general ICU (adults and kids)'), ('Acute care unit (ACU)'), ('emergency pediatric unit (EPU)');

CREATE TABLE SexAtBirth (
    id INT AUTO_INCREMENT,
    sex VARCHAR(255),
    PRIMARY KEY (id)
);

INSERT INTO SexAtBirth (sex)
VALUES ('male'), ('female'), ('other');

CREATE TABLE bCPAPType (
    id INT AUTO_INCREMENT,
    type VARCHAR(255),
    PRIMARY KEY (id)
);

INSERT INTO bCPAPType (type)
VALUES ('industry'), ('homemade'), ('other'), ('unknown');

CREATE TABLE OxygenSource (
    id INT AUTO_INCREMENT,
    source VARCHAR(255),
    PRIMARY KEY (id)
);

INSERT INTO OxygenSource (source)
VALUES ('tank'), ('wall'), ('oxygen concentrator'), ('other');

CREATE TABLE PatientInterface (
    id INT AUTO_INCREMENT,
    interface VARCHAR(255),
    PRIMARY KEY (id)
);

INSERT INTO PatientInterface (interface)
VALUES ('nose/mouth mask'), ('nasal mask'), ('scuba/full face mask'), ('nasal prongs');

CREATE TABLE PatientOutcome (
    id INT AUTO_INCREMENT,
    outcome VARCHAR(255),
    PRIMARY KEY (id)
);

INSERT INTO PatientOutcome (outcome)
VALUES ('discharged home'), ('transferred to another hospital'), ('died'), ('intubated');

CREATE TABLE bCPAPComplications (
    id INT AUTO_INCREMENT,
    complication VARCHAR(255),
    PRIMARY KEY (id)
);

INSERT INTO bCPAPComplications (complication)
VALUES ('nasal irritation'), ('nasal septal injury'), ('abdominal distension requiring decompression'), ('aspiration'), ('pneumothorax'), ('other');

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
VALUES ('Hypoxemia'), ('Increased work of breathing/tachypnea/dyspnea'), ('Respiratory failure'), ('Hypercarbia');

CREATE TABLE StopbCPAPReasons (
    id INT AUTO_INCREMENT,
    reason VARCHAR(255),
    PRIMARY KEY (id)
);

INSERT INTO StopbCPAPReasons (reason)
VALUES ('Improved oxygenation'), ('Improved work of breathing'), ('Improved ventilation'), ('Escalation to higher form of support (Bi-level, intubation)'), ('Withdrawal of therapy/End of life'), ('Parent request');

CREATE TABLE O2BlendingOptions (
    id INT AUTO_INCREMENT,
    blend VARCHAR(255),
    PRIMARY KEY (id)
);

INSERT INTO O2BlendingOptions (blend)
VALUES ('Venturi entrainment air-oxygen mixer'), ('Oxygen concentrator'), ('Air/oxygen Y-connection mix'), ('No blending');

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
VALUES ('Passive HME (heat and moisture exchanger)'),
       ('Bubble Humidifier - Non-heated'),
       ('Heated Humidifier'),
       ('None')
       ;


