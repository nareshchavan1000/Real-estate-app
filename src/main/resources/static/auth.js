const API_BASE = 'http://localhost:8083/api';
let currentUser = null;

// ============ Authentication Forms ============

function switchAuthForm(formType) {
    document.getElementById('loginForm').classList.toggle('active', formType === 'login');
    document.getElementById('signupForm').classList.toggle('active', formType === 'signup');
    clearAlerts();
}

function clearAlerts() {
    document.getElementById('loginAlert').innerHTML = '';
    document.getElementById('signupAlert').innerHTML = '';
}

function showAlert(elementId, message, type) {
    const alertDiv = document.getElementById(elementId);
    alertDiv.innerHTML = `<div class="alert alert-${type}">${message}</div>`;
}

async function login(event) {
    event.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    try {
        const response = await fetch(`${API_BASE}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();

        if (response.ok) {
            currentUser = data;
            localStorage.setItem('currentUser', JSON.stringify(data));
            showDashboard();
        } else {
            showAlert('loginAlert', data.message || 'Login failed', 'danger');
        }
    } catch (error) {
        console.error('Login error:', error);
        showAlert('loginAlert', 'Error connecting to server', 'danger');
    }
}

async function signup(event) {
    event.preventDefault();
    const name = document.getElementById('signupName').value;
    const email = document.getElementById('signupEmail').value;
    const password = document.getElementById('signupPassword').value;
    const role = document.getElementById('signupRole').value;

    try {
        const response = await fetch(`${API_BASE}/auth/signup`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, password, role })
        });

        const data = await response.json();

        if (response.ok) {
            showAlert('signupAlert', 'Account created! Redirecting to login...', 'success');
            setTimeout(() => switchAuthForm('login'), 2000);
        } else {
            showAlert('signupAlert', data.message || 'Signup failed', 'danger');
        }
    } catch (error) {
        console.error('Signup error:', error);
        showAlert('signupAlert', 'Error connecting to server', 'danger');
    }
}

// ============ Dashboard Navigation ============

function showDashboard() {
    document.getElementById('authContainer').classList.remove('active');
    if (currentUser.role === 'ADMIN') {
        document.getElementById('adminDashboard').classList.add('active');
        document.getElementById('adminUserName').textContent = currentUser.name;
        loadAdminUsers();
        loadAdminProperties();
    } else {
        document.getElementById('userDashboard').classList.add('active');
        document.getElementById('userUserName').textContent = currentUser.name;
        userLoadAllProperties();
    }
}

function logout() {
    currentUser = null;
    localStorage.removeItem('currentUser');
    document.getElementById('adminDashboard').classList.remove('active');
    document.getElementById('userDashboard').classList.remove('active');
    document.getElementById('authContainer').classList.add('active');
    resetForms();
}

function resetForms() {
    document.getElementById('loginForm').reset();
    document.getElementById('signupForm').reset();
    clearAlerts();
    switchAuthForm('login');
}

// ============ Admin Dashboard Functions ============

function switchAdminTab(tab) {
    document.querySelectorAll('#adminDashboard .tab-content').forEach(el => el.classList.remove('active'));
    document.querySelectorAll('#adminDashboard .tab-btn').forEach(el => el.classList.remove('active'));
    document.getElementById(tab + 'Tab').classList.add('active');
    event.target.classList.add('active');
}

async function loadAdminUsers() {
    try {
        const response = await fetch(`${API_BASE}/users`);
        const users = await response.json();
        displayAdminUsers(users);
        // Show the table container
        const tableContainer = document.getElementById('usersTableContainer');
        if (tableContainer) {
            tableContainer.style.display = 'block';
        }
    } catch (error) {
        console.error('Error loading users:', error);
        alert('Error loading users. Please check the console.');
    }
}

function displayAdminUsers(users) {
    const tbody = document.getElementById('usersTableBody');
    if (!tbody) {
        console.error('usersTableBody not found');
        return;
    }
    tbody.innerHTML = '';

    if (users.length === 0) {
        tbody.innerHTML = '<tr><td colspan="5" style="text-align: center; color: #999;">No users found</td></tr>';
        return;
    }

    users.forEach(user => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${user.id}</td>
            <td>${user.name}</td>
            <td>${user.email}</td>
            <td><span class="badge ${user.role === 'ADMIN' ? 'badge-admin' : 'badge-user'}">${user.role}</span></td>
            <td>
                <div class="action-btns">
                    <button onclick="editAdminUser(${user.id})" class="btn-secondary">Edit</button>
                    <button onclick="deleteAdminUser(${user.id})" class="btn-danger">Delete</button>
                </div>
            </td>
        `;
        tbody.appendChild(row);
    });
}

async function handleAdminUserSubmit(event) {
    event.preventDefault();
    const name = document.getElementById('adminUserName2').value;
    const email = document.getElementById('adminUserEmail').value;
    const password = document.getElementById('adminUserPassword').value;
    const role = document.getElementById('adminUserRole').value;

    try {
        const response = await fetch(`${API_BASE}/users`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, password, role })
        });

        if (response.ok) {
            event.target.reset();
            loadAdminUsers();
        } else {
            alert('Failed to add user');
        }
    } catch (error) {
        console.error('Error adding user:', error);
    }
}

async function deleteAdminUser(id) {
    if (!confirm('Are you sure you want to delete this user?')) return;

    try {
        const response = await fetch(`${API_BASE}/users/${id}`, {
            method: 'DELETE'
        });

        if (response.ok) {
            loadAdminUsers();
        } else {
            alert('Failed to delete user');
        }
    } catch (error) {
        console.error('Error deleting user:', error);
    }
}

function editAdminUser(id) {
    alert('Edit functionality would be implemented here for user ID: ' + id);
}

async function loadAdminProperties() {
    try {
        const response = await fetch(`${API_BASE}/properties`);
        const properties = await response.json();
        displayAdminProperties(properties);
        // Show the table container
        const tableContainer = document.getElementById('propertiesTableContainer');
        if (tableContainer) {
            tableContainer.style.display = 'block';
        }
    } catch (error) {
        console.error('Error loading properties:', error);
        alert('Error loading properties. Please check the console.');
    }
}

function displayAdminProperties(properties) {
    const tbody = document.getElementById('propertiesTableBody');
    if (!tbody) {
        console.error('propertiesTableBody not found');
        return;
    }
    tbody.innerHTML = '';

    if (properties.length === 0) {
        tbody.innerHTML = '<tr><td colspan="8" style="text-align: center; color: #999;">No properties found</td></tr>';
        return;
    }

    properties.forEach(prop => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${prop.id}</td>
            <td>${prop.title}</td>
            <td>${prop.type}</td>
            <td>${prop.location}</td>
            <td>₹${parseFloat(prop.price).toLocaleString()}</td>
            <td><span class="badge badge-${prop.status.toLowerCase()}">${prop.status}</span></td>
            <td>${prop.ownerId}</td>
            <td>
                <div class="action-btns">
                    <button onclick="editAdminProperty(${prop.id})" class="btn-secondary">Edit</button>
                    <button onclick="deleteAdminProperty(${prop.id})" class="btn-danger">Delete</button>
                </div>
            </td>
        `;
        tbody.appendChild(row);
    });
}

async function handleAdminPropertySubmit(event) {
    event.preventDefault();
    const title = document.getElementById('adminPropTitle').value;
    const description = document.getElementById('adminPropDesc').value;
    const type = document.getElementById('adminPropType').value;
    const price = document.getElementById('adminPropPrice').value;
    const location = document.getElementById('adminPropLocation').value;
    const ownerId = document.getElementById('adminPropOwnerId').value;
    const status = document.getElementById('adminPropStatus').value;

    try {
        const response = await fetch(`${API_BASE}/properties`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title, description, type, price, location, ownerId, status })
        });

        if (response.ok) {
            event.target.reset();
            loadAdminProperties();
        } else {
            alert('Failed to add property');
        }
    } catch (error) {
        console.error('Error adding property:', error);
    }
}

async function deleteAdminProperty(id) {
    if (!confirm('Are you sure you want to delete this property?')) return;

    try {
        const response = await fetch(`${API_BASE}/properties/${id}`, {
            method: 'DELETE'
        });

        if (response.ok) {
            loadAdminProperties();
        } else {
            alert('Failed to delete property');
        }
    } catch (error) {
        console.error('Error deleting property:', error);
    }
}

function editAdminProperty(id) {
    alert('Edit functionality would be implemented here for property ID: ' + id);
}

// ============ User Dashboard Functions ============

function switchUserTab(tab) {
    document.querySelectorAll('#userDashboard .tab-content').forEach(el => el.classList.remove('active'));
    document.querySelectorAll('#userDashboard .tab-btn').forEach(el => el.classList.remove('active'));
    document.getElementById(tab + 'Tab').classList.add('active');
    event.target.classList.add('active');
}

async function userLoadAllProperties() {
    try {
        const response = await fetch(`${API_BASE}/properties`);
        const properties = await response.json();
        displayUserBrowseProperties(properties);
    } catch (error) {
        console.error('Error loading properties:', error);
    }
}

function displayUserBrowseProperties(properties) {
    const container = document.getElementById('userBrowsePropertiesContainer');
    container.innerHTML = '';

    if (properties.length === 0) {
        container.innerHTML = '<div class="empty-state"><p>No properties available</p></div>';
        return;
    }

    const grid = document.createElement('div');
    grid.className = 'property-grid';

    properties.forEach(prop => {
        const card = document.createElement('div');
        card.className = 'property-card';
        card.innerHTML = `
            <div class="property-header">
                <h5>${prop.title}</h5>
            </div>
            <div class="property-body">
                <p><strong>Type:</strong> ${prop.type === 'BUY' ? 'For Sale' : 'For Rent'}</p>
                <p><strong>Location:</strong> ${prop.location}</p>
                <p><strong>Description:</strong> ${prop.description}</p>
                <div class="property-price">₹${parseFloat(prop.price).toLocaleString()}</div>
                <p><strong>Status:</strong> <span class="badge badge-${prop.status.toLowerCase()}">${prop.status}</span></p>
            </div>
            <div class="property-footer">
                <button class="btn-primary" onclick="viewPropertyDetails(${prop.id})">View Details</button>
                <button class="btn-success" onclick="contactSeller(${prop.id})">Contact</button>
            </div>
        `;
        grid.appendChild(card);
    });

    container.appendChild(grid);
}

async function userSearchProperties() {
    const location = document.getElementById('userSearchLocation').value;
    if (!location.trim()) {
        userLoadAllProperties();
        return;
    }

    try {
        const response = await fetch(`${API_BASE}/properties?location=${location}`);
        const properties = await response.json();
        displayUserBrowseProperties(properties);
    } catch (error) {
        console.error('Error searching properties:', error);
    }
}

async function loadUserMyProperties() {
    try {
        const response = await fetch(`${API_BASE}/properties`);
        const allProperties = await response.json();
        const myProperties = allProperties.filter(p => p.ownerId === currentUser.id);
        displayUserMyProperties(myProperties);
    } catch (error) {
        console.error('Error loading my properties:', error);
    }
}

function displayUserMyProperties(properties) {
    const container = document.getElementById('userMyPropertiesContainer');
    container.innerHTML = '';

    if (properties.length === 0) {
        container.innerHTML = '<div class="empty-state"><p>You haven\'t listed any properties yet. <a href="#" onclick="switchUserTab(\'addproperty\')" style="color: #667eea;">Start listing</a></p></div>';
        return;
    }

    const grid = document.createElement('div');
    grid.className = 'property-grid';

    properties.forEach(prop => {
        const card = document.createElement('div');
        card.className = 'property-card';
        card.innerHTML = `
            <div class="property-header">
                <h5>${prop.title}</h5>
            </div>
            <div class="property-body">
                <p><strong>Type:</strong> ${prop.type === 'BUY' ? 'For Sale' : 'For Rent'}</p>
                <p><strong>Location:</strong> ${prop.location}</p>
                <p><strong>Description:</strong> ${prop.description}</p>
                <div class="property-price">₹${parseFloat(prop.price).toLocaleString()}</div>
                <p><strong>Status:</strong> <span class="badge badge-${prop.status.toLowerCase()}">${prop.status}</span></p>
            </div>
            <div class="property-footer">
                <button class="btn-secondary" onclick="editUserProperty(${prop.id})">Edit</button>
                <button class="btn-danger" onclick="deleteUserProperty(${prop.id})">Delete</button>
            </div>
        `;
        grid.appendChild(card);
    });

    container.appendChild(grid);
}

async function handleUserPropertySubmit(event) {
    event.preventDefault();
    const title = document.getElementById('userPropTitle').value;
    const description = document.getElementById('userPropDesc').value;
    const type = document.getElementById('userPropType').value;
    const price = document.getElementById('userPropPrice').value;
    const location = document.getElementById('userPropLocation').value;
    const status = document.getElementById('userPropStatus').value;
    const ownerId = currentUser.id;

    try {
        const response = await fetch(`${API_BASE}/properties`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title, description, type, price, location, ownerId, status })
        });

        if (response.ok) {
            event.target.reset();
            loadUserMyProperties();
            alert('Property listed successfully!');
            switchUserTab('myproperties');
        } else {
            alert('Failed to list property');
        }
    } catch (error) {
        console.error('Error listing property:', error);
    }
}

async function deleteUserProperty(id) {
    if (!confirm('Are you sure you want to delete this property?')) return;

    try {
        const response = await fetch(`${API_BASE}/properties/${id}`, {
            method: 'DELETE'
        });

        if (response.ok) {
            loadUserMyProperties();
        } else {
            alert('Failed to delete property');
        }
    } catch (error) {
        console.error('Error deleting property:', error);
    }
}

function editUserProperty(id) {
    alert('Edit functionality would be implemented here for property ID: ' + id);
}

function viewPropertyDetails(id) {
    alert('Property details view would be implemented here for property ID: ' + id);
}

function contactSeller(id) {
    alert('Contact seller functionality would be implemented here for property ID: ' + id);
}

// ============ Wrapper Functions for Button Handlers ============

function loadUsers() {
    loadAdminUsers();
}

function viewAllProperties() {
    loadAdminProperties();
}

function switchTab(tabName) {
    // Hide all tabs
    document.querySelectorAll('.tab-content').forEach(tab => tab.classList.remove('active'));
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    
    // Show selected tab
    const selectedTab = document.getElementById(tabName);
    if (selectedTab) {
        selectedTab.classList.add('active');
    }
    
    // Mark button as active
    event.target.classList.add('active');
}

function switchUserTab(tabName) {
    // Hide all tabs
    document.querySelectorAll('.user-tab-content').forEach(tab => tab.classList.remove('active'));
    document.querySelectorAll('.user-tab-btn').forEach(btn => btn.classList.remove('active'));
    
    // Show selected tab
    const selectedTab = document.getElementById(tabName);
    if (selectedTab) {
        selectedTab.classList.add('active');
    }
    
    // Mark button as active
    event.target.classList.add('active');
    
    // Load data for My Properties
    if (tabName === 'userMyProps' && currentUser && currentUser.role === 'USER') {
        loadUserMyProperties();
    }
}

function handleLogout() {
    const confirmLogout = confirm('Are you sure you want to logout?');
    if (confirmLogout) {
        logout();
    }
}

// ============ Initialize on Page Load ============

document.addEventListener('DOMContentLoaded', () => {
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
        currentUser = JSON.parse(savedUser);
        showDashboard();
    }

    // Load initial data for admin
    if (currentUser && currentUser.role === 'ADMIN') {
        loadAdminUsers();
        loadAdminProperties();
    }

    // Load initial data for user
    if (currentUser && currentUser.role === 'USER') {
        userLoadAllProperties();
        loadUserMyProperties();
    }
});

// Call loadUserMyProperties when My Properties tab is opened
document.addEventListener('DOMContentLoaded', () => {
    const userDashboard = document.getElementById('userDashboard');
    if (userDashboard) {
        const observer = new MutationObserver(() => {
            const mypropertiesTab = document.getElementById('mypropertiesTab');
            if (mypropertiesTab && mypropertiesTab.classList.contains('active')) {
                if (currentUser && currentUser.role === 'USER') {
                    loadUserMyProperties();
                }
            }
        });
        observer.observe(userDashboard, { attributes: true, subtree: true });
    }
});
