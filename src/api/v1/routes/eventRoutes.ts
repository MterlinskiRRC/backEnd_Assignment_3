import { Router } from "express";
import {
  createEvent,
  getAllEvents,
  getEventById,
  updateEvent,
  deleteEvent
} from "../controllers/eventController";

import getHealth from "../controllers/healthController";

import validate from "../middleware/validate";
import { createEventSchema } from "../validation/eventValidation";

const router = Router();
router.post("/health", getHealth);
router.post("/", validate(createEventSchema), createEvent);
router.get("/", getAllEvents);
router.get("/:id", getEventById);
router.put("/:id", updateEvent);
router.delete("/:id", deleteEvent);

export default router;
