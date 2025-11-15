# Real Estate Management API - Postman Testing Guide

## Server URL
**Base URL:** `http://localhost:8083`

---

## USER ENDPOINTS

### 1. CREATE USER
- **Method:** POST
- **Endpoint:** `/api/users`
- **Content-Type:** `application/json`

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "role": "OWNER"
}
```

**Fields:**
- `name` (string, required): User's full name
- `email` (string, required): User's email address
- `role` (string, required): One of: OWNER, AGENT, BUYER

**Example Response (201 Created):**
```json
{
  "id": 1,
  "name": "John Doe",
  "email": "john@example.com",
  "role": "OWNER"
}
```

---

### 2. GET ALL USERS
- **Method:** GET
- **Endpoint:** `/api/users`
- **No body required**

**Example Response (200 OK):**
```json
[
  {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "role": "OWNER"
  },
  {
    "id": 2,
    "name": "Jane Smith",
    "email": "jane@example.com",
    "role": "AGENT"
  }
]
```

---

### 3. GET USER BY ID
- **Method:** GET
- **Endpoint:** `/api/users/{id}`
- **Example:** `/api/users/1`
- **No body required**

**Example Response (200 OK):**
```json
{
  "id": 1,
  "name": "John Doe",
  "email": "john@example.com",
  "role": "OWNER"
}
```

**Response:** 404 Not Found if user doesn't exist

---

### 4. UPDATE USER
- **Method:** PUT
- **Endpoint:** `/api/users/{id}`
- **Example:** `/api/users/1`
- **Content-Type:** `application/json`

**Request Body:**
```json
{
  "name": "John Smith",
  "email": "john.smith@example.com",
  "role": "AGENT"
}
```

**Example Response (200 OK):**
```json
{
  "id": 1,
  "name": "John Smith",
  "email": "john.smith@example.com",
  "role": "AGENT"
}
```

**Response:** 404 Not Found if user doesn't exist

---

### 5. DELETE USER
- **Method:** DELETE
- **Endpoint:** `/api/users/{id}`
- **Example:** `/api/users/1`
- **No body required**

**Response:** 204 No Content (on success)
**Response:** 404 Not Found if user doesn't exist

---

## PROPERTY ENDPOINTS

### 1. CREATE PROPERTY
- **Method:** POST
- **Endpoint:** `/api/properties`
- **Content-Type:** `application/json`

**Request Body:**
```json
{
  "title": "Beautiful 3 BHK House",
  "description": "Spacious house with modern amenities, 3 bedrooms, 2 bathrooms",
  "type": "BUY",
  "price": 500000,
  "location": "New York, NY",
  "ownerId": 1,
  "status": "AVAILABLE"
}
```

**Fields:**
- `title` (string, required): Property title
- `description` (string): Property details
- `type` (string, required): BUY or RENT
- `price` (number, required): Property price
- `location` (string, required): Property location
- `ownerId` (number, required): ID of the property owner
- `status` (string): AVAILABLE, PENDING, SOLD (defaults to AVAILABLE)

**Example Response (201 Created):**
```json
{
  "id": 1,
  "title": "Beautiful 3 BHK House",
  "description": "Spacious house with modern amenities, 3 bedrooms, 2 bathrooms",
  "type": "BUY",
  "price": 500000.00,
  "location": "New York, NY",
  "ownerId": 1,
  "status": "AVAILABLE",
  "createdAt": "2025-11-15T21:47:55.813"
}
```

---

### 2. GET ALL PROPERTIES
- **Method:** GET
- **Endpoint:** `/api/properties`
- **No body required**

**Example Response (200 OK):**
```json
[
  {
    "id": 1,
    "title": "Beautiful 3 BHK House",
    "description": "Spacious house",
    "type": "BUY",
    "price": 500000.00,
    "location": "New York, NY",
    "ownerId": 1,
    "status": "AVAILABLE",
    "createdAt": "2025-11-15T21:47:55.813"
  }
]
```

---

### 3. SEARCH PROPERTIES BY LOCATION
- **Method:** GET
- **Endpoint:** `/api/properties?location=<search_term>`
- **Example:** `/api/properties?location=New York`
- **No body required**

**Query Parameters:**
- `location` (string, optional): Search term (case-insensitive)

**Example Response (200 OK):**
```json
[
  {
    "id": 1,
    "title": "Beautiful 3 BHK House",
    "description": "Spacious house",
    "type": "BUY",
    "price": 500000.00,
    "location": "New York, NY",
    "ownerId": 1,
    "status": "AVAILABLE",
    "createdAt": "2025-11-15T21:47:55.813"
  }
]
```

---

### 4. GET PROPERTY BY ID
- **Method:** GET
- **Endpoint:** `/api/properties/{id}`
- **Example:** `/api/properties/1`
- **No body required**

**Example Response (200 OK):**
```json
{
  "id": 1,
  "title": "Beautiful 3 BHK House",
  "description": "Spacious house",
  "type": "BUY",
  "price": 500000.00,
  "location": "New York, NY",
  "ownerId": 1,
  "status": "AVAILABLE",
  "createdAt": "2025-11-15T21:47:55.813"
}
```

**Response:** 404 Not Found if property doesn't exist

---

### 5. UPDATE PROPERTY
- **Method:** PUT
- **Endpoint:** `/api/properties/{id}`
- **Example:** `/api/properties/1`
- **Content-Type:** `application/json`

**Request Body:**
```json
{
  "title": "Beautiful 4 BHK House",
  "description": "Spacious house with modern amenities, 4 bedrooms, 3 bathrooms, pool",
  "type": "BUY",
  "price": 650000,
  "location": "New York, NY",
  "ownerId": 1,
  "status": "PENDING"
}
```

**Example Response (200 OK):**
```json
{
  "id": 1,
  "title": "Beautiful 4 BHK House",
  "description": "Spacious house with modern amenities, 4 bedrooms, 3 bathrooms, pool",
  "type": "BUY",
  "price": 650000.00,
  "location": "New York, NY",
  "ownerId": 1,
  "status": "PENDING",
  "createdAt": "2025-11-15T21:47:55.813"
}
```

**Response:** 404 Not Found if property doesn't exist

---

### 6. DELETE PROPERTY
- **Method:** DELETE
- **Endpoint:** `/api/properties/{id}`
- **Example:** `/api/properties/1`
- **No body required**

**Response:** 204 No Content (on success)
**Response:** 404 Not Found if property doesn't exist

---

## QUICK TEST WORKFLOW

1. **Create a User:**
   - POST to `/api/users`
   - Note the returned user `id` (e.g., `id: 1`)

2. **Create a Property:**
   - POST to `/api/properties`
   - Use the user `id` from step 1 as `ownerId`
   - Note the returned property `id` (e.g., `id: 1`)

3. **Search Properties:**
   - GET `/api/properties?location=New York`

4. **Update the Property:**
   - PUT to `/api/properties/1` (use property id)
   - Change the price or status

5. **Delete the Property:**
   - DELETE `/api/properties/1`

6. **Delete the User:**
   - DELETE `/api/users/1`

---

## HOW TO IMPORT IN POSTMAN

1. Open Postman
2. Click **Import** (top left)
3. Select **Upload Files** tab
4. Choose the `Postman_Collection.json` file from your project
5. Click **Import**
6. All requests will be loaded and ready to use!

