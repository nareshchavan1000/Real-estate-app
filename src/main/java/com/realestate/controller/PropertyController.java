package com.realestate.controller;

import com.realestate.entity.Property;
import com.realestate.service.PropertyService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/api/properties")
public class PropertyController {
    private final PropertyService propertyService;

    public PropertyController(PropertyService propertyService) {
        this.propertyService = propertyService;
    }

    @GetMapping
    public List<Property> list(@RequestParam(required = false) String location) {
        if (location != null && !location.isBlank()) return propertyService.searchByLocation(location);
        return propertyService.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Property> get(@PathVariable Long id) {
        return propertyService.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Property> create(@Valid @RequestBody Property property) {
        Property created = propertyService.create(property);
        return ResponseEntity.created(URI.create("/api/properties/" + created.getId())).body(created);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Property> update(@PathVariable Long id, @Valid @RequestBody Property property) {
        return propertyService.update(id, property)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        propertyService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
