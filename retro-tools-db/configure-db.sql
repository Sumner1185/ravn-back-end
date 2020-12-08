CREATE DATABASE api;
\c api
CREATE TABLE tickets ( ID SERIAL PRIMARY KEY, name VARCHAR(120), description VARCHAR(300), category VARCHAR(7) );
\q