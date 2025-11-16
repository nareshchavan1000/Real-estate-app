# 🚀 How to Run the Project

## Prerequisites

1. **Java 17+** installed
2. **Maven 3.6+** installed
3. **MySQL 8.0+** installed and running

---

## Step-by-Step Instructions

### Step 1: Set Up MySQL Database

1. **Start MySQL service** (if not already running)

2. **Create the database:**
   ```sql
   CREATE DATABASE real_estate_db;
   ```

   Or use MySQL command line:
   ```bash
   mysql -u root -p -e "CREATE DATABASE real_estate_db;"
   ```

### Step 2: Set Environment Variables

**Windows (PowerShell):**
```powershell
$env:DB_USERNAME="root"
$env:DB_PASSWORD="your_mysql_password"
```

**Windows (Command Prompt):**
```cmd
set DB_USERNAME=root
set DB_PASSWORD=your_mysql_password
```

**Linux/Mac:**
```bash
export DB_USERNAME=root
export DB_PASSWORD=your_mysql_password
```

**Note:** Replace `your_mysql_password` with your actual MySQL root password.

### Step 3: Navigate to Project Directory

```powershell
cd c:\Users\naruc\OneDrive\Desktop\real-estate-management
```

### Step 4: Run the Application

**Option 1: Run directly with Maven (Recommended)**
```powershell
mvn spring-boot:run
```

**Option 2: Build first, then run**
```powershell
# Build the project
mvn clean package

# Run the JAR file
java -jar target/real-estate-management-0.0.1-SNAPSHOT.jar
```

**Option 3: Run with environment variables inline (Windows PowerShell)**
```powershell
$env:DB_PASSWORD="your_password"; mvn spring-boot:run
```

**Option 4: Run with environment variables inline (Linux/Mac)**
```bash
DB_PASSWORD=your_password mvn spring-boot:run
```

---

## Verify Application is Running

1. **Check console output** - You should see:
   ```
   Started RealEstateManagementApplication in X.XXX seconds
   ✓ Mock data seeded successfully!
   ```

2. **Open browser:**
   ```
   http://localhost:8083
   ```

3. **Test login with seeded accounts:**
   - **Admin:** `admin@example.com` / `admin123`
   - **User:** `user@example.com` / `user123`

---

## Troubleshooting

### Port 8083 Already in Use
```powershell
# Find process using port 8083
netstat -ano | findstr :8083

# Kill the process (replace PID with actual process ID)
taskkill /PID <PID> /F
```

Or change port in `application.properties`:
```properties
server.port=8084
```

### Database Connection Error

**Error:** `Access denied for user 'root'@'localhost'`

**Solution:**
- Verify MySQL is running
- Check username/password in environment variables
- Ensure database `real_estate_db` exists

**Test connection:**
```bash
mysql -u root -p -e "SHOW DATABASES;"
```

### Maven Not Found

**Install Maven or use Maven Wrapper:**
```powershell
# If Maven wrapper exists
.\mvnw spring-boot:run

# Or download Maven from: https://maven.apache.org/download.cgi
```

---

## Quick Start (All-in-One)

**Windows PowerShell:**
```powershell
# Set environment variable and run
$env:DB_PASSWORD="your_mysql_password"
cd c:\Users\naruc\OneDrive\Desktop\real-estate-management
mvn spring-boot:run
```

**Linux/Mac:**
```bash
export DB_PASSWORD="your_mysql_password"
cd /path/to/real-estate-management
mvn spring-boot:run
```

---

## Application URLs

- **Frontend:** http://localhost:8083
- **API Base:** http://localhost:8083/api
- **Auth Endpoints:**
  - POST `/api/auth/signup`
  - POST `/api/auth/login`
  - GET `/api/auth/user/{id}`
- **User Endpoints:** `/api/users`
- **Property Endpoints:** `/api/properties`

---

## Default Seeded Data

After first run, these accounts are available:

**Admin Accounts:**
- `admin@example.com` / `admin123`
- `admin2@example.com` / `admin123`

**User Accounts:**
- `user@example.com` / `user123`
- `user2@example.com` / `user123`
- `user3@example.com` / `user123`

**Note:** Data is only seeded on first run (when database is empty).

