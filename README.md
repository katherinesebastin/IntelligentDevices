# Useful Commands

## Install PostgreSQL locally
Linux (Ubuntu/Debian):    
sudo apt update  
sudo apt install postgresql postgresql-contrib  
sudo systemctl start postgresql  

## Access the PostgreSQL command line
psql -U postgres  

## Create project database and user
Table names are case senstive, everything is in lower case  
Create your project database and user   
CREATE DATABASE moodtracker;  

CREATE USER admin WITH PASSWORD 'password';  

GRANT ALL PRIVILEGES ON DATABASE moodtracker TO admin;  

CREATE TABLE devices (  
    device_id VARCHAR(64) PRIMARY KEY,  
    password VARCHAR(255) NOT NULL,  
    reminder1 TIME DEFAULT NULL,  
    reminder2 TIME DEFAULT NULL,  
    reminder3 TIME DEFAULT NULL  
);  

CREATE TABLE prototypedevice (  
    id BIGSERIAL PRIMARY KEY,  
    entry_date DATE NOT NULL,  
    mood SMALLINT NOT NULL  
);  

## In API folder terminal  
Install the PostgreSQL driver  
go get github.com/lib/pq  

## Command to run main.go  
go run main.go
