-- Real Estate Management System - MySQL Schema
-- Database: real_estate_db

USE real_estate_db;

-- Create Users Table
CREATE TABLE IF NOT EXISTS users (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(50) NOT NULL DEFAULT 'USER',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_email (email),
    INDEX idx_role (role)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Create Properties Table
CREATE TABLE IF NOT EXISTS properties (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description LONGTEXT,
    type VARCHAR(50) NOT NULL,
    price DECIMAL(15, 2) NOT NULL,
    location VARCHAR(255) NOT NULL,
    owner_id BIGINT NOT NULL,
    status VARCHAR(50) DEFAULT 'AVAILABLE',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_owner_id (owner_id),
    INDEX idx_status (status),
    INDEX idx_type (type),
    FOREIGN KEY (owner_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Insert Seed Data - Admin User
INSERT INTO users (name, email, password, role) VALUES 
('Admin User', 'admin@example.com', 'admin123', 'ADMIN');

-- Insert Seed Data - Regular User
INSERT INTO users (name, email, password, role) VALUES 
('John Doe', 'user@example.com', 'user123', 'USER');

-- Insert Seed Data - Sample Properties
INSERT INTO properties (title, description, type, price, location, owner_id, status) VALUES
('Luxury Apartment in Downtown', 'Beautiful 3-bedroom apartment with modern amenities', 'BUY', 500000.00, 'Downtown, City Center', 1, 'AVAILABLE'),
('Family Home with Garden', 'Spacious 4-bedroom house with large garden', 'BUY', 750000.00, 'Suburban Area', 1, 'AVAILABLE'),
('Cozy Studio for Rent', 'Fully furnished studio apartment, ready to move in', 'RENT', 15000.00, 'City Center', 2, 'AVAILABLE'),
('Commercial Office Space', 'Modern office space with parking', 'BUY', 300000.00, 'Business District', 1, 'PENDING');

-- Verify tables are created
SELECT 'Tables created successfully!' as Status;
SELECT COUNT(*) as user_count FROM users;
SELECT COUNT(*) as property_count FROM properties;
