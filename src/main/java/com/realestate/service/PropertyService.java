package com.realestate.service;

import com.realestate.entity.Property;
import com.realestate.repository.PropertyRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PropertyService {
    private final PropertyRepository propertyRepository;

    public PropertyService(PropertyRepository propertyRepository) {
        this.propertyRepository = propertyRepository;
    }

    public List<Property> findAll() {
        return propertyRepository.findAll();
    }

    public Optional<Property> findById(Long id) {
        return propertyRepository.findById(id);
    }

    public Property create(Property property) {
        property.setId(null);
        return propertyRepository.save(property);
    }

    public Optional<Property> update(Long id, Property property) {
        return propertyRepository.findById(id).map(existing -> {
            existing.setTitle(property.getTitle());
            existing.setDescription(property.getDescription());
            existing.setType(property.getType());
            existing.setPrice(property.getPrice());
            existing.setLocation(property.getLocation());
            existing.setOwnerId(property.getOwnerId());
            existing.setStatus(property.getStatus());
            return propertyRepository.save(existing);
        });
    }

    public void delete(Long id) {
        propertyRepository.deleteById(id);
    }

    public List<Property> searchByLocation(String location) {
        return propertyRepository.findByLocationContainingIgnoreCase(location == null ? "" : location);
    }
}
