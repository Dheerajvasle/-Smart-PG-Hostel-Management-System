package com.dheeraj.smartpg.controller;

import java.util.List;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.dheeraj.smartpg.model.Tenant;
import com.dheeraj.smartpg.repository.TenantRepository;

@RestController
@RequestMapping("/api/tenants")
public class TenantController {

    private final TenantRepository tenantRepository;

    public TenantController(TenantRepository tenantRepository) {
        this.tenantRepository = tenantRepository;
    }
    @DeleteMapping("/{id}")
public String deleteTenant(@PathVariable Long id) {
    tenantRepository.deleteById(id);
    return "Tenant deleted successfully";
}

    @GetMapping
    public List<Tenant> getAllTenants() {
        return tenantRepository.findAll();
    }
    @PutMapping("/{id}")
public Tenant updateTenant(@PathVariable Long id, @RequestBody Tenant tenant) {

    Tenant existingTenant = tenantRepository.findById(id).orElseThrow();

    existingTenant.setName(tenant.getName());
    existingTenant.setPhone(tenant.getPhone());
    existingTenant.setEmail(tenant.getEmail());
    existingTenant.setGender(tenant.getGender());
    existingTenant.setAddress(tenant.getAddress());

    return tenantRepository.save(existingTenant);
}
    @PostMapping
public Tenant addTenant(@RequestBody Tenant tenant) {
    return tenantRepository.save(tenant);
}
}