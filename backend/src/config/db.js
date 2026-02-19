import mongoose from "mongoose";

export async function connectDB(mongoUri) {
  try {
    if (!mongoUri) {
      throw new Error("MONGO_URI is not defined");
    }

    await mongoose.connect(mongoUri, {
      autoIndex: true
    });

    console.log("✅ MongoDB connected");
  } catch (err) {
    console.error("❌ MongoDB connection error:", err.message);
    process.exit(1);
  }
}


