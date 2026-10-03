package com.dheeraj.smartpg.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.dheeraj.smartpg.model.Tenant;

public interface TenantRepository extends JpaRepository<Tenant, Long> {
}