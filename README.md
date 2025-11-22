# Useful Commands

linux acces postgres console: 
sudo -i -u postgres
psql
\c moodtracker


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

## Quit database
\q

## List all databases
\l 

## Access moodtracker database
psql -U admin -d moodtracker

## List the relations in a database
\dt

## In API folder terminal  
Install the PostgreSQL driver  
go get github.com/lib/pq  

## Command to run main.go  
go run main.go

## Golang Code 

package main

import (
	"database/sql"
	"fmt"
	"log"

	_ "github.com/lib/pq"
)

func main() {
	connStr := "user=admin password=password dbname=moodtracker sslmode=disable"
	db, err := sql.Open("postgres", connStr)
	if err != nil {
		log.Fatal(err)
	}
	defer db.Close()

	err = db.Ping()
	if err != nil {
		log.Fatal("Cannot connect to database:", err)
	}

	fmt.Println("Connected to PostgreSQL successfully!")
}



# modified database

CREATE TABLE devices (
    id SERIAL PRIMARY KEY,           -- numeric ID for JWT / foreign key
    device_id VARCHAR(64) UNIQUE NOT NULL,  -- public device name like "device1"
    password VARCHAR(255) NOT NULL,
    reminder1 TIME DEFAULT NULL,
    reminder2 TIME DEFAULT NULL,
    reminder3 TIME DEFAULT NULL
);


CREATE TABLE prototypedevice (
    id BIGSERIAL PRIMARY KEY,
    device_id INTEGER NOT NULL REFERENCES devices(id) ON DELETE CASCADE,
    entry_date DATE NOT NULL,
    mood SMALLINT NOT NULL
);


-- Replace <username> with the role your Go app uses
GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE devices TO <username>;
GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE prototypedevice TO <username>;


