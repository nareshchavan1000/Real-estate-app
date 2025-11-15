# MySQL Setup Guide for Real Estate Management

## Prerequisites
- MySQL Server installed and running
- MySQL Command Line or MySQL Workbench

## Setup Steps

### 1. Create Database
Run this command in MySQL:

```sql
CREATE DATABASE IF NOT EXISTS real_estate_db;
USE real_estate_db;
```

### 2. Create MySQL User (Optional but Recommended)
For security, create a dedicated user:

```sql
CREATE USER 'realestateuser'@'localhost' IDENTIFIED BY 'your_password';
GRANT ALL PRIVILEGES ON real_estate_db.* TO 'realestateuser'@'localhost';
FLUSH PRIVILEGES;
```

### 3. Update Application Properties
If using the dedicated user, update `src/main/resources/application.properties`:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/real_estate_db
spring.datasource.username=realestateuser
spring.datasource.password=your_password
```

### 4. Verify MySQL Connection
Make sure MySQL is running:
- **Windows:** MySQL service should be started
- **Linux/Mac:** Run `sudo service mysql start` or similar

### 5. Build and Run Project

```bash
mvn clean install
mvn spring-boot:run
```

The application will:
- Connect to MySQL database
- Auto-create tables based on your entities
- Start server on `http://localhost:8083`

### 6. Verify Data Persistence
- Add a user or property via the UI
- Restart the application
- Data should still be there!

## Troubleshooting

**Error: Can't connect to MySQL server**
- Ensure MySQL is running
- Check username/password in application.properties
- Verify database name matches

**Error: Access denied for user**
- Check MySQL user credentials
- Ensure user has permissions on the database

**Data not persisting**
- Verify `spring.jpa.hibernate.ddl-auto=update`
- Check MySQL logs for errors

## Default Configuration
- **Host:** localhost
- **Port:** 3306
- **Database:** real_estate_db
- **Username:** root
- **Password:** (empty)

Modify as needed based on your MySQL setup.
