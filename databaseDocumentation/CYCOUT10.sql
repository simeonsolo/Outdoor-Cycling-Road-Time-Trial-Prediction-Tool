drop database CYCOUT10
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
