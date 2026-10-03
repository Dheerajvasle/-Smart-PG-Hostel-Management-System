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

import com.dheeraj.smartpg.model.Room;
import com.dheeraj.smartpg.repository.RoomRepository;

@RestController
@RequestMapping("/api/rooms")
public class RoomController {

    private final RoomRepository roomRepository;

    public RoomController(RoomRepository roomRepository) {
        this.roomRepository = roomRepository;
    }

    @GetMapping
    public List<Room> getAllRooms() {
        return roomRepository.findAll();
    }
    @PostMapping
public Room addRoom(@RequestBody Room room) {
    return roomRepository.save(room);
}   
@PutMapping("/{id}")
public Room updateRoom(@PathVariable Long id, @RequestBody Room room) {

    Room existingRoom = roomRepository.findById(id).orElseThrow();

    existingRoom.setRoomNumber(room.getRoomNumber());
    existingRoom.setCapacity(room.getCapacity());
    existingRoom.setOccupied(room.getOccupied());
    existingRoom.setMonthlyRent(room.getMonthlyRent());

    return roomRepository.save(existingRoom);
}
@DeleteMapping("/{id}")
public String deleteRoom(@PathVariable Long id) {
    roomRepository.deleteById(id);
    return "Room deleted successfully";
}
}