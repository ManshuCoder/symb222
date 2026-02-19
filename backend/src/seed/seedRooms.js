import dotenv from "dotenv";
import { connectDB } from "../config/db.js";
import { Room } from "../models/Room.js";

dotenv.config();

const MONGO_URI = process.env.MONGO_URI;

async function seed() {
  await connectDB(MONGO_URI);

  const sampleRooms = [
    {
      roomNo: "A101",
      capacity: 2,
      hasAC: true,
      hasAttachedWashroom: true,
      currentOccupancy: 0
    },
    {
      roomNo: "A102",
      capacity: 3,
      hasAC: true,
      hasAttachedWashroom: false,
      currentOccupancy: 1
    },
    {
      roomNo: "B201",
      capacity: 4,
      hasAC: false,
      hasAttachedWashroom: true,
      currentOccupancy: 2
    },
    {
      roomNo: "B202",
      capacity: 1,
      hasAC: false,
      hasAttachedWashroom: false,
      currentOccupancy: 0
    }
  ];

  try {
    await Room.deleteMany({});
    await Room.insertMany(sampleRooms);
    console.log("✅ Seed data inserted");
  } catch (err) {
    console.error("❌ Seeding failed:", err);
  } finally {
    process.exit(0);
  }
}

seed();


