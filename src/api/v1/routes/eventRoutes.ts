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
// Create a new router
const router = Router();

// Define the routes
router.post("/", validate(createEventSchema), createEvent);
router.get("/", getAllEvents);
router.get("/:id", getEventById);
router.put("/:id", validate(updateEventSchema), updateEvent);
router.delete("/:id", deleteEvent);

// Export the router
export default router;

