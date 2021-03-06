DROP DATABASE IF EXISTS meraki;

CREATE DATABASE meraki;

\c meraki;

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  first_name VARCHAR(50) NOT NULL,
  last_name VARCHAR(50) NOT NULL,
  email VARCHAR(50) NOT NULL,
  password VARCHAR(255) NOT NULL,
  UNIQUE(email)
);

CREATE TABLE refresh_tokens (
  token VARCHAR(255) NOT NULL
);
