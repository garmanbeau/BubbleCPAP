CREATE TABLE HospitalData (
    id INT,
    year YEAR,
    BCPAPUnitsAvailable INT,
    PediatricAdmissionsPerMonth INT,
    ChildrenOnBCPAPPerMonth INT,
    RespiratorySpecialistsAvailable INT,
    NurseToPatientRatio VARCHAR(255),
    PRIMARY KEY (id, year),
    FOREIGN KEY (id) REFERENCES Hospitals(id)
);

CREATE TABLE HospitalBCPAPUnits (
    id INT,
    year YEAR,
    unit VARCHAR(255),
    PRIMARY KEY (id, year, unit),
    FOREIGN KEY (id, year) REFERENCES HospitalData(id, year)
);