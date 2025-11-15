# MySQL Database Setup for Real Estate Management

## Quick Setup Steps

### Step 1: Open MySQL Command Line
Run this in PowerShell or Command Prompt:

```powershell
mysql -u root -p
```

If that doesn't work, try:
```powershell
"C:\Program Files\MySQL\MySQL Server 8.0\bin\mysql.exe" -u root -p
```

### Step 2: Enter Your MySQL Password
When prompted, enter your MySQL root password. If you don't remember it or haven't set one, you may need to:
- Reset MySQL password
- Use MySQL Workbench GUI instead

### Step 3: Create Database
Once connected to MySQL, paste these commands:

```sql
CREATE DATABASE IF NOT EXISTS real_estate_db;
USE real_estate_db;
SHOW TABLES;
```

### Step 4: Verify Connection
Run this command from PowerShell to test MySQL connection:

```powershell
mysql -u root -p -e "SHOW DATABASES;" | findstr real_estate
```

## If MySQL Prompts for Password

Your MySQL root account is password-protected. You have two options:

### Option A: Use Password in Connection String (Update application.properties)

Update `src/main/resources/application.properties`:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/real_estate_db
spring.datasource.username=root
spring.datasource.password=YOUR_PASSWORD_HERE
```

Replace `YOUR_PASSWORD_HERE` with your actual MySQL root password.

### Option B: Create a New MySQL User

Connect to MySQL and run:

```sql
CREATE USER 'realestateuser'@'localhost' IDENTIFIED BY 'password123';
GRANT ALL PRIVILEGES ON real_estate_db.* TO 'realestateuser'@'localhost';
FLUSH PRIVILEGES;
```

Then update application.properties:

```properties
spring.datasource.username=realestateuser
spring.datasource.password=password123
```

## Using MySQL Workbench GUI (Easiest)

1. Open MySQL Workbench
2. Connect to your MySQL Server
3. Create new connection/query
4. Run this SQL:
   ```sql
   CREATE DATABASE IF NOT EXISTS real_estate_db;
   ```
5. Execute (Ctrl+Enter)

## Troubleshooting

**Error: Access denied for user 'root'**
- You need to enter your MySQL root password
- Or create a new user with a known password

**Error: MySQL Server has gone away**
- MySQL service is not running
- Start MySQL service in Windows Services

**Cannot find mysql command**
- Add MySQL bin to your PATH
- Or use full path: `"C:\Program Files\MySQL\MySQL Server 8.0\bin\mysql.exe"`

## Next Steps After Creating Database

1. Verify connection works
2. Run: `mvn clean install`
3. Run: `mvn spring-boot:run`
4. Application will auto-create tables!
