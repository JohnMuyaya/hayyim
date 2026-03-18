# Railway Information System

## Table of Contents
1. [Introduction](#introduction)
2. [System Objectives](#system-objectives)
3. [Conceptual Modeling (ER Diagram)](#conceptual-modeling-er-diagram)
4. [Relational Model](#relational-model)
5. [DDL](#ddl)
6. [DML](#dml)
7. [Normalization (up to 3NF)](#normalization-up-to-3nf)
8. [Management Queries (15 SQL Queries)](#management-queries-15-sql-queries)
9. [Conclusion](#conclusion)

## Introduction

The Railway Information System is a comprehensive database management system designed to handle all aspects of railway operations, including train scheduling, passenger management, station information, and ticket booking. This system aims to provide efficient data management for railway companies to streamline their operations and improve customer service.

The system is built using relational database principles and follows proper normalization techniques to ensure data integrity and minimize redundancy.

## System Objectives

The primary objectives of the Railway Information System are:

- **Efficient Train Management**: Track and manage train schedules, routes, and availability
- **Passenger Information Management**: Store and retrieve passenger details and travel history
- **Station Management**: Maintain information about railway stations and their facilities
- **Ticket Booking System**: Handle ticket reservations and cancellations
- **Revenue Management**: Track ticket sales and generate financial reports
- **Data Integrity**: Ensure accurate and consistent data through proper database design
- **Performance Optimization**: Provide fast query responses for real-time operations

## Conceptual Modeling (ER Diagram)

### Entity-Relationship Diagram

```
+----------------+       +----------------+       +----------------+
|    PASSENGER   |       |    TICKET      |       |     TRAIN      |
+----------------+       +----------------+       +----------------+
| passenger_id   |<------| ticket_id      |       | train_id       |
| name           |       | passenger_id   |       | train_name     |
| email          |       | train_id       |       | capacity       |
| phone          |       | seat_number    |       | type           |
| address        |       | booking_date   |       |                |
+----------------+       | price          |       +----------------+
                         +----------------+              |
                                |                       |
                                |                       |
+----------------+       +----------------+            |
|   STATION      |       |   SCHEDULE     |            |
+----------------+       +----------------+            |
| station_id     |       | schedule_id    |<-----------+
| station_name   |       | train_id       |
| location       |       | station_id     |
| platform_count |       | departure_time |
+----------------+       | arrival_time   |
                         | date           |
                         +----------------+
```

### Entities and Relationships

- **PASSENGER**: Stores passenger information
- **TRAIN**: Contains train details and specifications
- **STATION**: Manages railway station information
- **TICKET**: Handles ticket booking information
- **SCHEDULE**: Manages train schedules and routes

Relationships:
- A passenger can book multiple tickets (1:N)
- A train can have multiple schedules (1:N)
- A station can be part of multiple schedules (1:N)
- A ticket is associated with one train and one passenger (N:1, N:1)

## Relational Model

Based on the ER diagram, the following relations are derived:

### PASSENGER(passenger_id, name, email, phone, address)
- **passenger_id**: Primary Key, INTEGER
- **name**: VARCHAR(100)
- **email**: VARCHAR(100), UNIQUE
- **phone**: VARCHAR(15)
- **address**: TEXT

### TRAIN(train_id, train_name, capacity, type)
- **train_id**: Primary Key, INTEGER
- **train_name**: VARCHAR(50), UNIQUE
- **capacity**: INTEGER
- **type**: VARCHAR(20) (Express/Passenger/Cargo)

### STATION(station_id, station_name, location, platform_count)
- **station_id**: Primary Key, INTEGER
- **station_name**: VARCHAR(100), UNIQUE
- **location**: VARCHAR(100)
- **platform_count**: INTEGER

### TICKET(ticket_id, passenger_id, train_id, seat_number, booking_date, price)
- **ticket_id**: Primary Key, INTEGER
- **passenger_id**: Foreign Key → PASSENGER(passenger_id)
- **train_id**: Foreign Key → TRAIN(train_id)
- **seat_number**: VARCHAR(10)
- **booking_date**: DATE
- **price**: DECIMAL(10,2)

### SCHEDULE(schedule_id, train_id, station_id, departure_time, arrival_time, date)
- **schedule_id**: Primary Key, INTEGER
- **train_id**: Foreign Key → TRAIN(train_id)
- **station_id**: Foreign Key → STATION(station_id)
- **departure_time**: TIME
- **arrival_time**: TIME
- **date**: DATE

## DDL

```sql
-- Create PASSENGER table
CREATE TABLE PASSENGER (
    passenger_id INTEGER PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    phone VARCHAR(15),
    address TEXT
);

-- Create TRAIN table
CREATE TABLE TRAIN (
    train_id INTEGER PRIMARY KEY AUTO_INCREMENT,
    train_name VARCHAR(50) UNIQUE NOT NULL,
    capacity INTEGER NOT NULL,
    type VARCHAR(20) NOT NULL
);

-- Create STATION table
CREATE TABLE STATION (
    station_id INTEGER PRIMARY KEY AUTO_INCREMENT,
    station_name VARCHAR(100) UNIQUE NOT NULL,
    location VARCHAR(100) NOT NULL,
    platform_count INTEGER NOT NULL
);

-- Create TICKET table
CREATE TABLE TICKET (
    ticket_id INTEGER PRIMARY KEY AUTO_INCREMENT,
    passenger_id INTEGER NOT NULL,
    train_id INTEGER NOT NULL,
    seat_number VARCHAR(10) NOT NULL,
    booking_date DATE NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    FOREIGN KEY (passenger_id) REFERENCES PASSENGER(passenger_id),
    FOREIGN KEY (train_id) REFERENCES TRAIN(train_id)
);

-- Create SCHEDULE table
CREATE TABLE SCHEDULE (
    schedule_id INTEGER PRIMARY KEY AUTO_INCREMENT,
    train_id INTEGER NOT NULL,
    station_id INTEGER NOT NULL,
    departure_time TIME NOT NULL,
    arrival_time TIME NOT NULL,
    date DATE NOT NULL,
    FOREIGN KEY (train_id) REFERENCES TRAIN(train_id),
    FOREIGN KEY (station_id) REFERENCES STATION(station_id)
);
```

## DML

### Sample Data Insertion

```sql
-- Insert sample passengers
INSERT INTO PASSENGER (name, email, phone, address) VALUES
('John Doe', 'john.doe@email.com', '123-456-7890', '123 Main St, City'),
('Jane Smith', 'jane.smith@email.com', '098-765-4321', '456 Oak Ave, Town'),
('Bob Johnson', 'bob.johnson@email.com', '555-123-4567', '789 Pine Rd, Village');

-- Insert sample trains
INSERT INTO TRAIN (train_name, capacity, type) VALUES
('Express 101', 500, 'Express'),
('Local 202', 300, 'Passenger'),
('Cargo 303', 100, 'Cargo');

-- Insert sample stations
INSERT INTO STATION (station_name, location, platform_count) VALUES
('Central Station', 'Downtown', 8),
('North Station', 'North District', 4),
('South Station', 'South District', 6);

-- Insert sample tickets
INSERT INTO TICKET (passenger_id, train_id, seat_number, booking_date, price) VALUES
(1, 1, 'A1', '2024-01-15', 75.50),
(2, 1, 'B2', '2024-01-15', 75.50),
(3, 2, 'C3', '2024-01-16', 45.00);

-- Insert sample schedules
INSERT INTO SCHEDULE (train_id, station_id, departure_time, arrival_time, date) VALUES
(1, 1, '08:00:00', '08:00:00', '2024-01-15'),
(1, 2, '10:30:00', '10:30:00', '2024-01-15'),
(1, 3, '12:00:00', '12:00:00', '2024-01-15');
```

## Normalization (up to 3NF)

### First Normal Form (1NF)
All tables satisfy 1NF as they contain only atomic values and no repeating groups.

### Second Normal Form (2NF)
All tables are in 2NF because:
- They are in 1NF
- All non-key attributes are fully functionally dependent on the primary key
- No partial dependencies exist

### Third Normal Form (3NF)
All tables are in 3NF because:
- They are in 2NF
- No transitive dependencies exist
- All non-key attributes are directly dependent on the primary key only

For example, in the TICKET table:
- ticket_id → passenger_id, train_id, seat_number, booking_date, price
- No transitive dependencies (e.g., passenger_id doesn't determine other attributes independently)

## Management Queries (15 SQL Queries)

### 1. List all passengers
```sql
SELECT * FROM PASSENGER;
```

### 2. Find trains by type
```sql
SELECT * FROM TRAIN WHERE type = 'Express';
```

### 3. Get station information
```sql
SELECT station_name, location FROM STATION;
```

### 4. Count total tickets sold
```sql
SELECT COUNT(*) AS total_tickets FROM TICKET;
```

### 5. Find passengers who booked tickets for a specific date
```sql
SELECT p.name, t.booking_date
FROM PASSENGER p
JOIN TICKET t ON p.passenger_id = t.passenger_id
WHERE t.booking_date = '2024-01-15';
```

### 6. Get train schedules for a specific date
```sql
SELECT t.train_name, s.station_name, sch.departure_time, sch.arrival_time
FROM TRAIN t
JOIN SCHEDULE sch ON t.train_id = sch.train_id
JOIN STATION s ON sch.station_id = s.station_id
WHERE sch.date = '2024-01-15'
ORDER BY sch.departure_time;
```

### 7. Calculate total revenue from tickets
```sql
SELECT SUM(price) AS total_revenue FROM TICKET;
```

### 8. Find the most popular train (by ticket count)
```sql
SELECT t.train_name, COUNT(*) AS ticket_count
FROM TRAIN t
JOIN TICKET tk ON t.train_id = tk.train_id
GROUP BY t.train_id, t.train_name
ORDER BY ticket_count DESC
LIMIT 1;
```

### 9. List passengers with their ticket details
```sql
SELECT p.name, p.email, t.seat_number, t.booking_date, t.price
FROM PASSENGER p
JOIN TICKET t ON p.passenger_id = t.passenger_id;
```

### 10. Find stations with more than 5 platforms
```sql
SELECT * FROM STATION WHERE platform_count > 5;
```

### 11. Get average ticket price by train type
```sql
SELECT tr.type, AVG(t.price) AS avg_price
FROM TRAIN tr
JOIN TICKET t ON tr.train_id = t.train_id
GROUP BY tr.type;
```

### 12. Find passengers who haven't booked any tickets
```sql
SELECT p.name, p.email
FROM PASSENGER p
LEFT JOIN TICKET t ON p.passenger_id = t.passenger_id
WHERE t.ticket_id IS NULL;
```

### 13. Get schedule information for a specific train
```sql
SELECT s.station_name, sch.departure_time, sch.arrival_time, sch.date
FROM SCHEDULE sch
JOIN STATION s ON sch.station_id = s.station_id
WHERE sch.train_id = 1
ORDER BY sch.date, sch.departure_time;
```

### 14. Calculate total capacity utilization
```sql
SELECT
    (SELECT SUM(capacity) FROM TRAIN) AS total_capacity,
    (SELECT COUNT(*) FROM TICKET) AS tickets_sold,
    ROUND((SELECT COUNT(*) FROM TICKET) / (SELECT SUM(capacity) FROM TRAIN) * 100, 2) AS utilization_percentage;
```

### 15. Find the busiest station (by schedule count)
```sql
SELECT s.station_name, COUNT(*) AS schedule_count
FROM STATION s
JOIN SCHEDULE sch ON s.station_id = sch.station_id
GROUP BY s.station_id, s.station_name
ORDER BY schedule_count DESC
LIMIT 1;
```

## Conclusion

The Railway Information System provides a robust foundation for managing railway operations through proper database design and normalization. The system ensures data integrity, efficient querying, and scalability for future enhancements.

Key achievements:
- Comprehensive ER modeling capturing all essential entities and relationships
- Properly normalized relational schema up to 3NF
- Complete DDL and DML scripts for implementation
- 15 management queries covering various operational needs
- Sample data for testing and demonstration

This database design can be extended with additional features such as user authentication, online booking interfaces, real-time schedule updates, and advanced reporting capabilities.





