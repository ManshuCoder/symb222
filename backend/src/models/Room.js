import mongoose from "mongoose";

const roomSchema = new mongoose.Schema(
  {
    roomNo: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    capacity: {
      type: Number,
      required: true,
      min: 1
    },
    hasAC: {
      type: Boolean,
      required: true
    },
    hasAttachedWashroom: {
      type: Boolean,
      required: true
    },
    currentOccupancy: {
      type: Number,
      default: 0,
      min: 0
    }
  },
  {
    timestamps: true
  }
);

roomSchema.index({ roomNo: 1 }, { unique: true });

export const Room = mongoose.model("Room", roomSchema);


