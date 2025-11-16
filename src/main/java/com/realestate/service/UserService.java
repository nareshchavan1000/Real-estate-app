package com.realestate.service;

import com.realestate.entity.User;
import com.realestate.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public List<User> findAll() {
        return userRepository.findAll();
    }

    public Optional<User> findById(Long id) {
        return userRepository.findById(id);
    }

    public User create(User user) {
        user.setId(null);
        // Encrypt password if provided
        if (user.getPassword() != null && !user.getPassword().isEmpty()) {
            user.setPassword(passwordEncoder.encode(user.getPassword()));
        }
        return userRepository.save(user);
    }

    public Optional<User> update(Long id, User user) {
        return userRepository.findById(id).map(existing -> {
            existing.setName(user.getName());
            existing.setEmail(user.getEmail());
            existing.setRole(user.getRole());
            // Encrypt password if provided in update request
            if (user.getPassword() != null && !user.getPassword().isEmpty()) {
                existing.setPassword(passwordEncoder.encode(user.getPassword()));
            }
            return userRepository.save(existing);
        });
    }

    public void delete(Long id) {
        userRepository.deleteById(id);
    }
}
