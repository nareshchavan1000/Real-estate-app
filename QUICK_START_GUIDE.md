# Quick Start Guide - Real Estate Management System

## 🚀 Getting Started (5 Minutes)

### Prerequisites
- Java 17+
- Maven 3.x
- Web Browser (Chrome, Firefox, Safari, or Edge)

### Step 1: Navigate to Project Directory
```bash
cd c:\Users\naruc\OneDrive\Desktop\real-estate-management
```

### Step 2: Build the Project
```bash
mvn clean install
```

### Step 3: Start the Application
```bash
mvn spring-boot:run
```

The application will start on **http://localhost:8083**

You should see this output:
```
✓ Tomcat started on port(s): 8083 (http)
✓ Mock data seeded successfully!
```

### Step 4: Open in Browser
```
http://localhost:8083
```

You'll be automatically redirected to the login page.

---

## 👤 Login Credentials

### Admin Account (Full Access)
```
Email: admin@example.com
Password: admin123
```
✅ Redirects to admin.html (Admin Dashboard)

### User Account (Limited Access)
```
Email: user@example.com
Password: user123
```
✅ Redirects to user.html (User Dashboard)

### Additional Test Accounts
```
Admin 2:
Email: admin2@example.com
Password: admin123

User 2:
Email: user2@example.com
Password: user123

User 3:
Email: user3@example.com
Password: user123
```

---

## 🎯 What to Test

### 1. Login Flow
- [ ] Go to http://localhost:8083
- [ ] See login page (no scrolling)
- [ ] Login with admin@example.com / admin123
- [ ] Verify automatic redirect to admin.html
- [ ] Verify no scrolling required in admin dashboard

### 2. Admin Dashboard
- [ ] View admin.html - full page with no scrolling
- [ ] **Tab 1: Users Management**
  - [ ] Add a new user
  - [ ] See user appear in table
  - [ ] Delete a user
- [ ] **Tab 2: Properties Management**
  - [ ] Add a new property
  - [ ] See property appear in table
  - [ ] Delete a property
- [ ] Click logout → Redirects to login.html

### 3. User Dashboard
- [ ] Login with user@example.com / user123
- [ ] Verify automatic redirect to user.html
- [ ] **Tab 1: Browse Properties**
  - [ ] See all properties (no scrolling)
  - [ ] Search by location
  - [ ] Clear search results
- [ ] **Tab 2: My Properties**
  - [ ] See only your own properties
  - [ ] Delete your property
- [ ] **Tab 3: List New Property**
  - [ ] Add a new property
  - [ ] See it appear in "My Properties" tab
- [ ] Click logout → Redirects to login.html

### 4. Signup Flow
- [ ] Click "Sign up here" on login page
- [ ] Fill in: Name, Email, Password, Role
- [ ] Submit → Account created message
- [ ] Redirects to login.html
- [ ] Login with new credentials

### 5. Session & Security
- [ ] Login as admin
- [ ] Manually navigate to user.html
- [ ] Verify redirect to admin.html (role check)
- [ ] Login as user
- [ ] Manually navigate to admin.html
- [ ] Verify redirect to user.html (role check)

### 6. Navigation
- [ ] Verify NO SCROLLING in any dashboard
- [ ] Tab switching works instantly (no page reload)
- [ ] Forms display completely on screen
- [ ] Tables fit on screen
- [ ] Buttons and fields are accessible

---

## 📊 Pre-seeded Mock Data

### Users (5 total)
- 2 Admin accounts
- 3 Regular user accounts
- All with email/password combinations provided above

### Properties (5 total)
- Various locations (Mumbai, Bangalore, Delhi, etc.)
- Different types (BUY, RENT)
- Different statuses (AVAILABLE, PENDING, SOLD)
- Owned by different users

---

## 🔗 API Endpoints (For Postman Testing)

### Authentication
- **POST** http://localhost:8083/api/auth/login
  ```json
  {
    "email": "admin@example.com",
    "password": "admin123"
  }
  ```

- **POST** http://localhost:8083/api/auth/signup
  ```json
  {
    "name": "Test User",
    "email": "test@example.com",
    "password": "test123",
    "role": "USER"
  }
  ```

### Users Management
- **GET** http://localhost:8083/api/users - Get all users
- **POST** http://localhost:8083/api/users - Create user
- **GET** http://localhost:8083/api/users/1 - Get user by ID
- **DELETE** http://localhost:8083/api/users/1 - Delete user

### Properties Management
- **GET** http://localhost:8083/api/properties - Get all properties
- **POST** http://localhost:8083/api/properties - Create property
- **GET** http://localhost:8083/api/properties/1 - Get property by ID
- **GET** http://localhost:8083/api/properties?location=Mumbai - Search by location
- **DELETE** http://localhost:8083/api/properties/1 - Delete property

---

## 📁 Project Structure

```
real-estate-management/
├── src/
│   ├── main/
│   │   ├── java/
│   │   │   └── com/realestate/
│   │   │       ├── entity/         (User.java, Property.java)
│   │   │       ├── repository/     (UserRepository, PropertyRepository)
│   │   │       ├── service/        (UserService, PropertyService)
│   │   │       ├── controller/     (AuthController, UserController, PropertyController)
│   │   │       └── config/         (CorsConfig.java)
│   │   │
│   │   └── resources/
│   │       ├── static/             (Frontend files)
│   │       │   ├── index.html         (Redirect gateway - 80 lines)
│   │       │   ├── login.html         (Login page - 279 lines)
│   │       │   ├── signup.html        (Signup page - 300 lines)
│   │       │   ├── admin.html         (Admin dashboard - 600 lines)
│   │       │   ├── user.html          (User dashboard - 700 lines)
│   │       │   └── auth.js            (Old - not used in new pages)
│   │       │
│   │       └── application.properties
│   │
│   └── test/java/...
│
├── pom.xml                  (Maven configuration)
├── IMPLEMENTATION_SUMMARY.md
└── NAVIGATION_FLOW_GUIDE.md
```

---

## ✨ Key Features

### Frontend (NO SCROLLING)
✅ Dedicated login page
✅ Dedicated signup page
✅ Full-page admin dashboard (users + properties management)
✅ Full-page user dashboard (browse properties, my properties, list new)
✅ All content fits on screen without scrolling
✅ Tab-based organization for dashboards
✅ Responsive design for mobile/tablet/desktop
✅ Professional UI with Bootstrap styling

### Backend (Complete REST API)
✅ Spring Boot 3.1.5 with Spring Data JPA
✅ H2 in-memory database
✅ CRUD operations for Users and Properties
✅ Authentication with login/signup
✅ Role-based access control (ADMIN/USER)
✅ Location-based property search
✅ Mock data auto-seeding

### Security
✅ Role-based redirects
✅ Session validation
✅ Unauthorized access prevention
✅ localStorage session management
✅ User-specific data filtering

---

## 🐛 Troubleshooting

### Application won't start
- Verify Java 17+ is installed: `java -version`
- Check Maven is installed: `mvn -version`
- Ensure port 8083 is not in use: Change in application.properties if needed

### Cannot access http://localhost:8083
- Wait 5-10 seconds after starting app for full initialization
- Check console for "Tomcat started on port(s): 8083"
- Try refreshing browser (F5)

### Login fails
- Verify you're using correct demo credentials
- Check browser console (F12) for errors
- Ensure backend is running (check terminal)

### No scrolling but can't see content
- Try full-screen browser (F11)
- Zoom out if needed (Ctrl+-)
- Check browser window size (should be at least 1024x768)

### APIs not responding
- Ensure Spring Boot application is running
- Check terminal for error messages
- Verify correct port (8083)
- Try with Postman to test API directly

---

## 📝 Documentation

**Main Documentation Files:**
1. `IMPLEMENTATION_SUMMARY.md` - Complete feature overview
2. `NAVIGATION_FLOW_GUIDE.md` - Detailed navigation flows and user journeys

---

## 🎓 Learning Paths

### For Admins
1. Login with admin credentials
2. Explore Users Management tab
3. Explore Properties Management tab
4. Try adding/deleting users and properties
5. Test role-based access by accessing user.html directly

### For Regular Users
1. Login with user credentials
2. Explore Browse Properties tab
3. Search properties by location
4. Check My Properties tab
5. List a new property

### For Developers
1. Study backend API endpoints
2. Test APIs with Postman
3. Review frontend JavaScript navigation logic
4. Examine role-based access control implementation
5. Test signup workflow

---

## ✅ System Status

- **Backend:** ✅ Running on port 8083
- **Database:** ✅ H2 in-memory (auto-created)
- **Mock Data:** ✅ Auto-seeded on startup
- **Frontend:** ✅ 5 HTML pages with NO scrolling
- **Authentication:** ✅ Working with demo credentials
- **CRUD Operations:** ✅ All working
- **Navigation:** ✅ Page-based, no scrolling

---

## 🚀 Ready to Test!

The application is fully functional and ready for testing. Open your browser and start exploring!

**Happy Testing!** 🎉
