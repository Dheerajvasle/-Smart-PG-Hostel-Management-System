package com.dheeraj.smartpg.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.dheeraj.smartpg.model.Room;

public interface RoomRepository extends JpaRepository<Room, Long> {
}