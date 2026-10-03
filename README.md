# Smart PG & Hostel Management System

A web-based PG and Hostel Management System developed using Java,
Spring Boot, Spring Data JPA, MySQL, HTML, CSS, JavaScript and Bootstrap.

The system provides a simple dashboard to manage tenants, rooms,
payments and complaints.

## Features

- Tenant Management
  - Add tenant
  - View tenants
  - Edit tenant
  - Delete tenant

- Room Management
  - Add room
  - View rooms
  - Edit room
  - Delete room

- Payment Management
  - Record payments
  - View payment records
  - Update payments
  - Delete payments

- Complaint Management
  - Add complaints
  - View complaints
  - Update complaint status
  - Delete complaints

- Dashboard
  - Total tenants
  - Total rooms
  - Total payments
  - Total complaints

## Technologies Used

- Java
- Spring Boot
- Spring Data JPA
- Hibernate
- MySQL
- HTML
- CSS
- JavaScript
- Bootstrap
- Maven

## Project Architecture

```text
Frontend
HTML + CSS + JavaScript + Bootstrap
              |
              ↓
Spring Boot REST Controllers
              |
              ↓
Spring Data JPA
              |
              ↓
MySQL Database
Main Modules
Tenant
Room
Payment
Complaint
Dashboard

REST API Endpoints
Tenant
GET     /api/tenants
POST    /api/tenants
PUT     /api/tenants/{id}
DELETE  /api/tenants/{id}

Room
GET     /api/rooms
POST    /api/rooms
PUT     /api/rooms/{id}
DELETE  /api/rooms/{id}

Payment
GET     /api/payments
POST    /api/payments
PUT     /api/payments/{id}
DELETE  /api/payments/{id}

Complaint
GET     /api/complaints
POST    /api/complaints
PUT     /api/complaints/{id}
DELETE  /api/complaints/{id}

Database
Database name:
pg_hostel_management

The application uses Spring Data JPA and Hibernate to create and
update the required database tables.
How to Run
1. Create the database
Create a MySQL database:
CREATE DATABASE pg_hostel_management;

2. Configure MySQL
Update:
src/main/resources/application.properties

with your MySQL username and password.
3. Run the application
Using Maven:
mvn spring-boot:run

4. Open the application
http://localhost:8080

Future Improvements
- Tenant-room allocation
- Login and authentication
- Payment receipt generation
- Search and filtering
- Monthly payment reports
- Improved dashboard analytics