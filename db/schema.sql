DROP TABLE IF EXISTS employee;

CREATE DATABASE employeeTrackerDB;

USE employeeTrackerDB

CREATE TABLE employee (
  id INTEGER PRIMARY KEY,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INTEGER UNSIGNED NOT NULL,
  manager_id INTEGER UNSIGNED
);