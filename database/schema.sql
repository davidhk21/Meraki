DROP DATABASE IF EXISTS meraki;

CREATE DATABASE meraki;

\c meraki;

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  first_name VARCHAR(255) NOT NULL,
  last_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL
);

CREATE TABLE refresh_tokens (
  token VARCHAR(255) NOT NULL
);

INSERT INTO users (first_name, last_name, email, password) VALUES ('David', 'Kim', 'davidhk21@gmail.com', 'password');
