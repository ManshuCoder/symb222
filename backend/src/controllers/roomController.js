import { Room } from "../models/Room.js";

// Create a new room
export async function createRoom(req, res, next) {
  try {
    const { roomNo, capacity, hasAC, hasAttachedWashroom, currentOccupancy } =
      req.body;

    const existing = await Room.findOne({ roomNo });
    if (existing) {
      return res.status(409).json({ message: "Room number already exists" });
    }

    const room = await Room.create({
      roomNo,
      capacity,
      hasAC,
      hasAttachedWashroom,
      currentOccupancy: currentOccupancy || 0
    });

    return res.status(201).json(room);
  } catch (err) {
    next(err);
  }
}

// Get all rooms (optionally with filters)
export async function getRooms(req, res, next) {
  try {
    const rooms = await Room.find().sort({ roomNo: 1 });
    res.json(rooms);
  } catch (err) {
    next(err);
  }
}

// Search rooms based on filters
export async function searchRooms(req, res, next) {
  try {
    const { minCapacity, needsAC, needsWashroom } = req.query;

    const query = {};

    if (minCapacity) {
      query.capacity = { $gte: Number(minCapacity) };
    }

    if (needsAC === "true") {
      query.hasAC = true;
    } else if (needsAC === "false") {
      query.hasAC = false;
    }

    if (needsWashroom === "true") {
      query.hasAttachedWashroom = true;
    } else if (needsWashroom === "false") {
      query.hasAttachedWashroom = false;
    }

    const rooms = await Room.find(query).sort({ capacity: 1 });
    res.json(rooms);
  } catch (err) {
    next(err);
  }
}

// Allocate room based on requirements
export async function allocateRoom(req, res, next) {
  try {
    const { students, needsAC, needsWashroom } = req.body;

    const studentsCount = Number(students);
    if (!studentsCount || studentsCount <= 0) {
      return res.status(400).json({ message: "Invalid students count" });
    }

    const acRequired = Boolean(needsAC);
    const washroomRequired = Boolean(needsWashroom);

    // Filter rooms that meet the capacity and feature requirements
    const candidateRooms = await Room.find({
      hasAC: acRequired,
      hasAttachedWashroom: washroomRequired,
      $expr: {
        $gte: [{ $subtract: ["$capacity", "$currentOccupancy"] }, studentsCount]
      }
    }).sort({ capacity: 1 }); // Smallest capacity first

    if (!candidateRooms.length) {
      return res.status(404).json({ message: "No room available" });
    }

    const selectedRoom = candidateRooms[0];
    selectedRoom.currentOccupancy += studentsCount;
    await selectedRoom.save();

    res.json({
      message: "Room allocated successfully",
      room: selectedRoom,
      allocatedStudents: studentsCount
    });
  } catch (err) {
    next(err);
  }
}

// Reset occupancy for a room
export async function resetOccupancy(req, res, next) {
  try {
    const { id } = req.params;
    const room = await Room.findById(id);
    if (!room) {
      return res.status(404).json({ message: "Room not found" });
    }
    room.currentOccupancy = 0;
    await room.save();
    res.json({ message: "Occupancy reset successfully", room });
  } catch (err) {
    next(err);
  }
}

// Delete a room
export async function deleteRoom(req, res, next) {
  try {
    const { id } = req.params;
    const room = await Room.findByIdAndDelete(id);
    if (!room) {
      return res.status(404).json({ message: "Room not found" });
    }
    res.json({ message: "Room deleted successfully" });
  } catch (err) {
    next(err);
  }
}

// Simple dashboard summary
export async function getDashboardSummary(req, res, next) {
  try {
    const rooms = await Room.find();
    const totalRooms = rooms.length;
    const totalCapacity = rooms.reduce((sum, r) => sum + r.capacity, 0);
    const totalOccupancy = rooms.reduce(
      (sum, r) => sum + r.currentOccupancy,
      0
    );
    const availableBeds = totalCapacity - totalOccupancy;

    res.json({
      totalRooms,
      totalCapacity,
      totalOccupancy,
      availableBeds
    });
  } catch (err) {
    next(err);
  }
}


