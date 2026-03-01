import { Router } from "express";
import {
  createEvent,
  getAllEvents,
  getEventById,
  updateEvent,
  deleteEvent
} from "../controllers/eventController";

import validate from "../middleware/validate";
import { createEventSchema, updateEventSchema } from "../validation/eventValidation";
import { getHealth } from "../controllers/healthController";
const router = Router();

router.get("/health", getHealth);
router.post("/", validate(createEventSchema), createEvent);
router.get("/", getAllEvents);
router.get("/:id", getEventById);
router.put("/:id", validate(updateEventSchema), updateEvent);
router.delete("/:id", deleteEvent);

export default router;

