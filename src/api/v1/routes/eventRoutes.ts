import { Router } from "express";
import { createEvent, getAllEvents } from "../controllers/eventController";
import validate from "../middleware/validate";
import { createEventSchema } from "../validation/eventValidation";

const router = Router();

router.post("/", validate(createEventSchema), createEvent);
router.get("/", getAllEvents);

export default router;
