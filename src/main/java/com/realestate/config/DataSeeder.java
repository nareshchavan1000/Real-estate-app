package com.realestate.config;

import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import com.realestate.entity.User;
import com.realestate.entity.Property;
import com.realestate.repository.UserRepository;
import com.realestate.repository.PropertyRepository;
import java.math.BigDecimal;

@Component
public class DataSeeder implements CommandLineRunner {

    private final UserRepository userRepository;
    private final PropertyRepository propertyRepository;
    private final PasswordEncoder passwordEncoder;

    public DataSeeder(UserRepository userRepository, PropertyRepository propertyRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.propertyRepository = propertyRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(String... args) throws Exception {
        // Check if data already exists
        if (userRepository.count() > 0) {
            return;
        }

        // Create Admin Users (with encrypted passwords)
        User admin1 = new User(null, "Admin User", "admin@example.com", passwordEncoder.encode("admin123"), "ADMIN");
        User admin2 = new User(null, "Property Manager", "admin2@example.com", passwordEncoder.encode("admin123"), "ADMIN");

        // Create Regular Users (with encrypted passwords)
        User user1 = new User(null, "John Doe", "user@example.com", passwordEncoder.encode("user123"), "USER");
        User user2 = new User(null, "Jane Smith", "user2@example.com", passwordEncoder.encode("user123"), "USER");
        User user3 = new User(null, "Mike Johnson", "user3@example.com", passwordEncoder.encode("user123"), "USER");

        // Save users
        admin1 = userRepository.save(admin1);
        admin2 = userRepository.save(admin2);
        user1 = userRepository.save(user1);
        user2 = userRepository.save(user2);
        user3 = userRepository.save(user3);

        // Create Properties for users
        Property prop1 = new Property();
        prop1.setTitle("Beautiful 3BHK Apartment");
        prop1.setDescription("Spacious apartment with modern amenities in a prime location");
        prop1.setType("BUY");
        prop1.setPrice(java.math.BigDecimal.valueOf(5000000.00));
        prop1.setLocation("New York, NY");
        prop1.setOwnerId(user1.getId());
        prop1.setStatus("AVAILABLE");

        Property prop2 = new Property();
        prop2.setTitle("Cozy 2BHK Apartment");
        prop2.setDescription("Perfect for couples or small family. Fully furnished");
        prop2.setType("RENT");
        prop2.setPrice(java.math.BigDecimal.valueOf(50000.00));
        prop2.setLocation("Los Angeles, CA");
        prop2.setOwnerId(user2.getId());
        prop2.setStatus("AVAILABLE");

        Property prop3 = new Property();
        prop3.setTitle("Luxury 5BHK Villa");
        prop3.setDescription("Premium villa with swimming pool and garden. Located in upscale neighborhood");
        prop3.setType("BUY");
        prop3.setPrice(java.math.BigDecimal.valueOf(15000000.00));
        prop3.setLocation("Miami, FL");
        prop3.setOwnerId(user1.getId());
        prop3.setStatus("PENDING");

        Property prop4 = new Property();
        prop4.setTitle("Modern Studio");
        prop4.setDescription("Studio apartment perfect for professionals. Close to metro");
        prop4.setType("RENT");
        prop4.setPrice(java.math.BigDecimal.valueOf(35000.00));
        prop4.setLocation("Chicago, IL");
        prop4.setOwnerId(user3.getId());
        prop4.setStatus("AVAILABLE");

        Property prop5 = new Property();
        prop5.setTitle("House with Garden");
        prop5.setDescription("4BHK house with large garden and parking. Great for families");
        prop5.setType("BUY");
        prop5.setPrice(java.math.BigDecimal.valueOf(8000000.00));
        prop5.setLocation("Boston, MA");
        prop5.setOwnerId(user2.getId());
        prop5.setStatus("SOLD");

        // Save properties
        propertyRepository.save(prop1);
        propertyRepository.save(prop2);
        propertyRepository.save(prop3);
        propertyRepository.save(prop4);
        propertyRepository.save(prop5);

        System.out.println("✓ Mock data seeded successfully!");
        System.out.println("  - Admin accounts created (admin@example.com, admin2@example.com)");
        System.out.println("  - User accounts created (user@example.com, user2@example.com, user3@example.com)");
        System.out.println("  - 5 sample properties created");
    }
}
