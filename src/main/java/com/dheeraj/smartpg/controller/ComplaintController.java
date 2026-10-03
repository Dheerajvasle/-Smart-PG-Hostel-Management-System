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

import com.dheeraj.smartpg.model.Complaint;
import com.dheeraj.smartpg.repository.ComplaintRepository;

@RestController
@RequestMapping("/api/complaints")
public class ComplaintController {

    private final ComplaintRepository complaintRepository;

    public ComplaintController(ComplaintRepository complaintRepository) {
        this.complaintRepository = complaintRepository;
    }

    @GetMapping
    public List<Complaint> getAllComplaints() {
        return complaintRepository.findAll();
    }
    @PostMapping
public Complaint addComplaint(@RequestBody Complaint complaint) {
    return complaintRepository.save(complaint);
}
@PutMapping("/{id}")
public Complaint updateComplaint(@PathVariable Long id, @RequestBody Complaint complaint) {

    Complaint existingComplaint = complaintRepository.findById(id).orElseThrow();

    existingComplaint.setTenantId(complaint.getTenantId());
    existingComplaint.setDescription(complaint.getDescription());
    existingComplaint.setComplaintDate(complaint.getComplaintDate());
    existingComplaint.setStatus(complaint.getStatus());

    return complaintRepository.save(existingComplaint);
}
@DeleteMapping("/{id}")
public String deleteComplaint(@PathVariable Long id) {
    complaintRepository.deleteById(id);
    return "Complaint deleted successfully";
}
}