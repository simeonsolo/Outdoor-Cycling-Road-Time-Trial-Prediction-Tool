drop database CYCOUT10;
create database CYCOUT10;
use CYCOUT10;
CREATE TABLE users (
    username VARCHAR(63) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    firstName VARCHAR(63),
    lastName VARCHAR(63),
    phoneNum VARCHAR(10),
    email VARCHAR(255),
    PRIMARY KEY (username)
);
CREATE TABLE administrators (
    admin_id INT NOT NULL AUTO_INCREMENT,
    user VARCHAR(63),
    PRIMARY KEY (admin_id),
    FOREIGN KEY (user) REFERENCES users(username) ON DELETE CASCADE
);
CREATE TABLE athletes (
    athleteID INT NOT NULL AUTO_INCREMENT,
    firstName VARCHAR(63),
    lastName VARCHAR(63),
    experience VARCHAR(63),
    trainingElevation VARCHAR(63),
    height float,
    weight float,
    DOB DATE,
    gender VARCHAR(63),
    FTP float,
    MaxHR float,
    PRIMARY KEY (athleteID)
);
CREATE TABLE courses (
    courseID INT NOT NULL AUTO_INCREMENT,
    courseName VARCHAR(63),
    courseType VARCHAR(63),
    roadCondition VARCHAR(63),
    courseTerrain VARCHAR(63),
    courseDistance INT,
    averageAltitude INT,
    weatherCondition VARCHAR(63),
    PRIMARY KEY (courseID)
);
CREATE TABLE bikes (
    bikeID INT NOT NULL auto_increment,
    bikeName VARCHAR(63),
    bikeWeight float,
    frontWheelType VARCHAR(63),
    frontWheelWidth float,
    rearWheelType VARCHAR(63),
    rearWheelWidth float,
    helmetType VARCHAR(63),
    rollingAssistance float,
    CdA_Racing float,
    CdA_Climbing float,
    PRIMARY KEY (bikeID)
);
CREATE TABLE races (
    raceName VARCHAR(63) NOT NULL,
    user VARCHAR(63) NOT NULL,
    athleteID INT,
    courseID INT,
    bikeID INT,
    raceTime float,
    PRIMARY KEY (raceName, user),
    FOREIGN KEY (user) REFERENCES users(username) ON DELETE CASCADE,
    FOREIGN KEY (athleteID) REFERENCES athletes(athleteID) ON DELETE CASCADE,
    FOREIGN KEY (courseID) REFERENCES courses(courseID) ON DELETE CASCADE,
    FOREIGN KEY (bikeID) REFERENCES bikes(bikeID) ON DELETE CASCADE
);