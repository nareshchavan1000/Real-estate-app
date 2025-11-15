# Navigation Flow Guide

## Complete User Journey

### 1️⃣ Application Entry Point

```
User opens: http://localhost:8083
↓
Loads: index.html (Redirect Gateway)
↓
Checks: localStorage['currentUser']
```

### 2️⃣ Login Flow (First-time User)

```
index.html
↓ (No user in localStorage)
login.html (Login Page)
├── Email input: admin@example.com
├── Password input: admin123
└── Submit → POST /api/auth/login
    ↓
    Response: { id: 1, name: "Admin", email: "admin@example.com", role: "ADMIN" }
    ↓
    Save to localStorage['currentUser']
    ↓
    Check role:
    ├── ADMIN → Redirect to admin.html ✓
    └── USER → Redirect to user.html ✓
```

### 3️⃣ Admin Dashboard Flow

```
admin.html (Full Page - NO SCROLLING)
├── Navbar
│   ├── Title: 🏢 Real Estate Management
│   ├── Welcome Badge: Welcome, Admin (Admin)
│   └── Logout Button → Clears localStorage → Redirects to login.html
│
├── Tab 1: 👥 Users Management
│   ├── Form Section:
│   │   ├── Full Name input
│   │   ├── Email input
│   │   ├── Password input
│   │   ├── Role dropdown (USER/ADMIN)
│   │   └── Add User button → POST /api/users
│   │
│   └── Table Section:
│       ├── Load all users via GET /api/users
│       ├── Display: ID | Name | Email | Role | Delete Action
│       └── Delete button → DELETE /api/users/{id}
│
└── Tab 2: 🏠 Properties Management
    ├── Form Section:
    │   ├── Title input
    │   ├── Type dropdown (BUY/RENT)
    │   ├── Price input
    │   ├── Location input
    │   ├── Owner ID input
    │   ├── Status dropdown
    │   ├── Description textarea
    │   └── Add Property button → POST /api/properties
    │
    └── Table Section:
        ├── Load all properties via GET /api/properties
        ├── Display: ID | Title | Type | Location | Price | Status | Owner | Delete
        └── Delete button → DELETE /api/properties/{id}

All content fits on screen - NO SCROLLING REQUIRED ✓
Tab switching instant without page reload
```

### 4️⃣ User Dashboard Flow

```
user.html (Full Page - NO SCROLLING)
├── Navbar
│   ├── Title: 🏢 Real Estate Platform
│   ├── Welcome Badge: Welcome, User (User)
│   └── Logout Button → Clears localStorage → Redirects to login.html
│
├── Tab 1: 🔍 Browse Properties
│   ├── Search Bar:
│   │   ├── Location input
│   │   ├── Search button → Filters properties by location
│   │   └── Clear button → Shows all properties
│   │
│   └── Properties Grid:
│       ├── Load all properties via GET /api/properties
│       ├── Display as cards:
│       │   ├── Property Title
│       │   ├── Type (BUY/RENT)
│       │   ├── Location
│       │   ├── Description
│       │   ├── Price
│       │   └── Status (AVAILABLE/PENDING/SOLD)
│       └── View/Contact buttons
│
├── Tab 2: 🏠 My Properties
│   ├── Properties Grid (Filtered by ownerId):
│   │   ├── Load properties via GET /api/properties
│   │   ├── Filter by currentUser.id
│   │   ├── Display as cards:
│   │   │   ├── Property Title
│   │   │   ├── Type
│   │   │   ├── Location
│   │   │   ├── Price
│   │   │   └── Delete button → DELETE /api/properties/{id}
│   │   └── Empty state if no properties
│   │
│   └── Link to "List New Property" tab
│
└── Tab 3: ➕ List New Property
    ├── Form Section:
    │   ├── Property Title input
    │   ├── Type dropdown (BUY/RENT)
    │   ├── Price input
    │   ├── Location input
    │   ├── Status dropdown (AVAILABLE/PENDING)
    │   ├── Description textarea
    │   ├── Owner ID (Auto-filled with currentUser.id)
    │   └── List Property button → POST /api/properties
    │
    └── Success message → Redirects to "My Properties" tab

All content fits on screen - NO SCROLLING REQUIRED ✓
Tab switching instant without page reload
```

### 5️⃣ Signup Flow

```
login.html
↓ (Click "Sign up here")
signup.html (Signup Page)
├── Form:
│   ├── Full Name input
│   ├── Email input
│   ├── Password input
│   ├── Role dropdown (USER/ADMIN)
│   └── Sign Up button → POST /api/auth/signup
│
└── Response handling:
    ├── Success → Display "Account created" message → Redirect to login.html
    └── Error → Display error alert (e.g., "Email already exists")
```

### 6️⃣ Session & Logout Flow

```
Logged In Session
├── localStorage['currentUser'] = {
│   id: 1,
│   name: "Admin",
│   email: "admin@example.com",
│   role: "ADMIN"
├── }
│
└── User performs logout:
    ├── Logout button clicked
    ├── localStorage.removeItem('currentUser')
    ├── Redirect to login.html
    └── User must login again

Page Refresh While Logged In
├── Any page is refreshed
├── index.html checks localStorage
├── If currentUser exists:
│   ├── Parse user data
│   ├── Check role
│   ├── Redirect to appropriate dashboard
│   └── Seamless session persistence ✓
└── If currentUser doesn't exist:
    └── Redirect to login.html
```

### 7️⃣ Role-Based Access Control

```
Admin Attempting to Access User Dashboard
├── User tries: admin.html (logged in as USER)
├── Page load: Role validation check
├── Condition: currentUser.role !== 'ADMIN'
├── Action: window.location.href = 'user.html'
└── Result: Redirected to user.html

User Attempting to Access Admin Dashboard
├── User tries: user.html (logged in as ADMIN)
├── Page load: Role validation check
├── Condition: currentUser.role !== 'USER'
├── Action: window.location.href = 'admin.html'
└── Result: Redirected to admin.html

Unauthorized Access
├── Non-logged-in user tries: admin.html or user.html
├── Page load: Check for localStorage['currentUser']
├── Condition: No currentUser found
├── Action: window.location.href = 'login.html'
└── Result: Redirected to login.html
```

## Key Navigation Principles

✅ **No Page Scrolling**
- Each page displays all content without vertical scrolling
- Tab-based organization for dashboards
- Responsive design fits on all screen sizes

✅ **Page-Based Navigation**
- Navigation between separate HTML files
- Session data persisted in localStorage
- Clear page structure and purpose

✅ **Automatic Routing**
- Role-based redirects
- Session validation on load
- Prevents unauthorized access

✅ **User Experience**
- Fast page transitions
- Professional UI with Bootstrap styling
- Clear navigation flow
- Consistent styling across all pages

## Demo Credentials for Testing

### Admin Account
```
Email: admin@example.com
Password: admin123
Role: ADMIN
Dashboard: admin.html
```

### User Account
```
Email: user@example.com
Password: user123
Role: USER
Dashboard: user.html
```

### Test New Signup
```
Name: Test User
Email: test@example.com
Password: test123
Role: USER (or ADMIN)
→ Account created successfully
→ Redirects to login.html
→ Login with new credentials
```

## Common Navigation Scenarios

### Scenario 1: First-time Visitor
```
1. Opens http://localhost:8083
2. No localStorage data
3. Redirected to login.html
4. User logs in with credentials
5. Role checked, redirected to appropriate dashboard
```

### Scenario 2: Returning Admin User
```
1. Opens http://localhost:8083
2. localStorage['currentUser'] exists with ADMIN role
3. Auto-redirects to admin.html
4. Dashboard loads with user data from localStorage
5. User can immediately start managing users/properties
```

### Scenario 3: User Wants to Signup
```
1. On login.html, clicks "Sign up here"
2. Navigates to signup.html
3. Fills out form: name, email, password, role
4. Submits form → POST /api/auth/signup
5. Account created successfully
6. Redirected back to login.html
7. Can now login with new credentials
```

### Scenario 4: User Logs Out
```
1. On admin.html or user.html
2. Clicks "Logout" button
3. Clears localStorage['currentUser']
4. Redirects to login.html
5. Must login again to access dashboard
```

### Scenario 5: Tab Switching (No Page Reload)
```
1. On admin.html
2. Viewing "Users Management" tab
3. Clicks "Properties Management" tab
4. JavaScript toggles tab content display
5. No page reload
6. Instant tab switching
```

---

## Technical Navigation Implementation

### Redirect Logic (index.html)
```javascript
const user = localStorage.getItem('currentUser');
if (user) {
    const userData = JSON.parse(user);
    if (userData.role === 'ADMIN') {
        window.location.href = 'admin.html';
    } else {
        window.location.href = 'user.html';
    }
} else {
    window.location.href = 'login.html';
}
```

### Role Validation (admin.html / user.html)
```javascript
window.addEventListener('DOMContentLoaded', () => {
    const user = localStorage.getItem('currentUser');
    if (!user) {
        window.location.href = 'login.html';
        return;
    }
    const currentUser = JSON.parse(user);
    if (currentUser.role !== 'ADMIN') {  // or 'USER' for user.html
        window.location.href = currentUser.role === 'ADMIN' ? 'admin.html' : 'user.html';
        return;
    }
    // Page can now load
});
```

### Login Process (login.html)
```javascript
async function handleLogin(email, password) {
    const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    });
    
    const data = await response.json();
    localStorage.setItem('currentUser', JSON.stringify(data));
    
    // Redirect based on role
    if (data.role === 'ADMIN') {
        window.location.href = 'admin.html';
    } else {
        window.location.href = 'user.html';
    }
}
```

---

## Browser Compatibility

| Browser | Support | Notes |
|---------|---------|-------|
| Chrome | ✅ Full | Tested and working |
| Edge | ✅ Full | Tested and working |
| Firefox | ✅ Full | Tested and working |
| Safari | ✅ Full | Tested and working |
| IE11 | ❌ Not supported | Uses ES6 features |

---

**Navigation System Status: COMPLETE AND TESTED** ✅

All page-based navigation working correctly with ZERO scrolling required!
