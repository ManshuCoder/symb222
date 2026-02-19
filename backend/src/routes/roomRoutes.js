import express from "express";
import Joi from "joi";
import {
  allocateRoom,
  createRoom,
  deleteRoom,
  getDashboardSummary,
  getRooms,
  resetOccupancy,
  searchRooms
} from "../controllers/roomController.js";
import { validateBody } from "../middlewares/validateRequest.js";

const router = express.Router();

const createRoomSchema = Joi.object({
  roomNo: Joi.string().trim().required(),
  capacity: Joi.number().integer().min(1).required(),
  hasAC: Joi.boolean().required(),
  hasAttachedWashroom: Joi.boolean().required(),
  currentOccupancy: Joi.number().integer().min(0).optional()
});

const allocateRoomSchema = Joi.object({
  students: Joi.number().integer().min(1).required(),
  needsAC: Joi.boolean().required(),
  needsWashroom: Joi.boolean().required()
});

router.post("/", validateBody(createRoomSchema), createRoom);
router.get("/", getRooms);
router.get("/search", searchRooms);
router.post("/allocate", validateBody(allocateRoomSchema), allocateRoom);
router.post("/:id/reset-occupancy", resetOccupancy);
router.delete("/:id", deleteRoom);
router.get("/dashboard/summary", getDashboardSummary);

export default router;


