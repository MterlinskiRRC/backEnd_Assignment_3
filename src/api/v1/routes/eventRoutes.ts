import { Router } from "express";
import {
  createEvent,
  getAllEvents,
  getEventById,
  updateEvent,
  deleteEvent
} from "../controllers/eventController";

import validate from "../middleware/validate";
import { createEventSchema } from "../validation/eventValidation";
import { updateEventSchema } from "../validation/updateEventValidation";
import { getHealth } from "../controllers/healthController";
const router = Router();

router.get("/health", getHealth);
router.post("/", validate(createEventSchema), createEvent);
router.get("/", getAllEvents);
router.get("/:id", getEventById);
router.put("/:id", validate(updateEventSchema), updateEvent);
router.delete("/:id", deleteEvent);

export default router;

