-- Update existing users with encrypted passwords using BCrypt
-- Note: These are BCrypt hashed versions of the plain text passwords

USE real_estate_db;

-- Delete existing users and properties to start fresh with encrypted passwords
DELETE FROM properties;
DELETE FROM users;

-- Insert users with BCrypt encrypted passwords
-- Admin password: admin123 (BCrypt hash)
-- User passwords: john123, jane123, mike123
INSERT INTO users (id, name, email, password, role, created_at, updated_at) VALUES
(1, 'Admin User', 'admin@example.com', '$2a$10$slYQmyNdGzin7olVN.Bb3.qK5g7jDKJMNP.oO6tZ9W6VCLvVqBvNm', 'ADMIN', NOW(), NOW()),
(2, 'John Doe', 'john@example.com', '$2a$10$kX.vfyBQQZMIpQZ7yRNHn.ygqA5QVGLWJNhzpn5LNv.Vj9DhEy6b6', 'USER', NOW(), NOW()),
(3, 'Jane Smith', 'jane@example.com', '$2a$10$5bx5D8YczChxPKKKXnOzKOiU0GnGVJrLLzPqPWZ2zL8cXVjVxHhNC', 'USER', NOW(), NOW()),
(4, 'Mike Johnson', 'mike@example.com', '$2a$10$wQNhILBCQgIrJmFqQG7K0e9xZ7I9r8M5KVK8V5n5M6Q8e5C9f7r.S', 'USER', NOW(), NOW());

-- Re-insert properties
INSERT INTO properties (id, title, description, type, price, location, owner_id, status, created_at, updated_at) VALUES
(1, 'Luxury Apartment in Downtown', 'Beautiful 3-bedroom luxury apartment with modern amenities', 'BUY', 750000.00, 'Downtown Manhattan', 1, 'AVAILABLE', NOW(), NOW()),
(2, 'Cozy Studio for Rent', 'Comfortable studio apartment near metro station', 'RENT', 1500.00, 'Brooklyn', 1, 'AVAILABLE', NOW(), NOW()),
(3, 'Beach House Villa', 'Stunning beachfront property with sea view', 'BUY', 2500000.00, 'Malibu Beach', 2, 'PENDING', NOW(), NOW()),
(4, 'Modern Office Space', 'Professional office with great location and facilities', 'RENT', 5000.00, 'Midtown', 1, 'AVAILABLE', NOW(), NOW()),
(5, 'Family Home', 'Spacious 4-bedroom house perfect for families', 'BUY', 1200000.00, 'Suburbs', 3, 'AVAILABLE', NOW(), NOW()),
(6, 'Urban Loft', 'Trendy loft in artistic district with high ceilings', 'RENT', 2500.00, 'SoHo', 2, 'SOLD', NOW(), NOW()),
(7, 'Commercial Building', 'Prime location commercial property with multiple units', 'BUY', 5000000.00, 'Financial District', 4, 'AVAILABLE', NOW(), NOW()),
(8, 'Cottage Retreat', 'Peaceful cottage in quiet countryside', 'BUY', 450000.00, 'Upstate', 3, 'AVAILABLE', NOW(), NOW());

-- Verify data
SELECT 'Users with encrypted passwords:' as '';
SELECT id, name, email, role FROM users;

SELECT 'Properties:' as '';
SELECT id, title, type, location, owner_id, status FROM properties LIMIT 5;

SELECT '✓ Password encryption setup completed!' as Status;
