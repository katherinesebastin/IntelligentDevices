# IntelligentDevices

Linux (Ubuntu/Debian):  

sudo apt update  
sudo apt install postgresql postgresql-contrib  
sudo systemctl start postgresql  

Access the PostgreSQL command line
psql -U postgres

Create your project database and user
-- Create database
CREATE DATABASE school_project;

CREATE USER admin WITH PASSWORD 'password';

GRANT ALL PRIVILEGES ON DATABASE MoodTracker TO admin;

CREATE TABLE devices (
    device_id VARCHAR(64) PRIMARY KEY,
    password VARCHAR(255) NOT NULL,
    reminder1 TIME DEFAULT NULL,
    reminder2 TIME DEFAULT NULL,
    reminder3 TIME DEFAULT NULL
);

CREATE TABLE
postgres=# CREATE TABLE PrototypeDevice (
    id BIGSERIAL PRIMARY KEY,
    entry_date DATE NOT NULL,
    mood SMALLINT NOT NULL
);

In API 
Install the PostgreSQL driver
go get github.com/lib/pq
