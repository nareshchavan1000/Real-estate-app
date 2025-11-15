-- Real Estate Management Database Schema and Seed Data
-- Database: real_estate_db

USE real_estate_db;

-- ========================================
-- CREATE TABLES
-- ========================================

-- Users Table
CREATE TABLE IF NOT EXISTS users (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(50) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_email (email),
    INDEX idx_role (role)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Properties Table
CREATE TABLE IF NOT EXISTS properties (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description LONGTEXT,
    type VARCHAR(50) NOT NULL,
    price DECIMAL(15, 2) NOT NULL,
    location VARCHAR(255) NOT NULL,
    owner_id BIGINT NOT NULL,
    status VARCHAR(50) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (owner_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_owner_id (owner_id),
    INDEX idx_status (status),
    INDEX idx_type (type),
    INDEX idx_location (location)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ========================================
-- SEED DATA
-- ========================================

-- Insert Admin User
INSERT INTO users (name, email, password, role) VALUES
('Admin User', 'admin@example.com', 'admin123', 'ADMIN'),
('John Doe', 'john@example.com', 'john123', 'USER'),
('Jane Smith', 'jane@example.com', 'jane123', 'USER'),
('Mike Johnson', 'mike@example.com', 'mike123', 'USER');

-- Insert Sample Properties
INSERT INTO properties (title, description, type, price, location, owner_id, status) VALUES
('Luxury Apartment in Downtown', 'Beautiful 3-bedroom luxury apartment with modern amenities', 'BUY', 750000.00, 'Downtown Manhattan', 1, 'AVAILABLE'),
('Cozy Studio for Rent', 'Comfortable studio apartment near metro station', 'RENT', 1500.00, 'Brooklyn', 1, 'AVAILABLE'),
('Beach House Villa', 'Stunning beachfront property with sea view', 'BUY', 2500000.00, 'Malibu Beach', 2, 'PENDING'),
('Modern Office Space', 'Professional office with great location and facilities', 'RENT', 5000.00, 'Midtown', 1, 'AVAILABLE'),
('Family Home', 'Spacious 4-bedroom house perfect for families', 'BUY', 1200000.00, 'Suburbs', 3, 'AVAILABLE'),
('Urban Loft', 'Trendy loft in artistic district with high ceilings', 'RENT', 2500.00, 'SoHo', 2, 'SOLD'),
('Commercial Building', 'Prime location commercial property with multiple units', 'BUY', 5000000.00, 'Financial District', 4, 'AVAILABLE'),
('Cottage Retreat', 'Peaceful cottage in quiet countryside', 'BUY', 450000.00, 'Upstate', 3, 'AVAILABLE');

-- ========================================
-- VERIFY DATA
-- ========================================

-- Show created tables
SHOW TABLES;

-- Show users count
SELECT 'Total Users:' as Info, COUNT(*) as Count FROM users;

-- Show properties count
SELECT 'Total Properties:' as Info, COUNT(*) as Count FROM properties;

-- Show sample data
SELECT '--- USERS ---' as '';
SELECT * FROM users;

SELECT '--- PROPERTIES ---' as '';
SELECT * FROM properties;

-- ========================================
-- PRINT SUCCESS MESSAGE
-- ========================================
SELECT CONCAT('✓ Database setup completed successfully!') as Status;
SELECT CONCAT('✓ Users table created with ', (SELECT COUNT(*) FROM users), ' users') as Info;
SELECT CONCAT('✓ Properties table created with ', (SELECT COUNT(*) FROM properties), ' properties') as Info;
