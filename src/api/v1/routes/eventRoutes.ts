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
/**
 * @openapi
 * /api/v1/events:
 *   post:
 *     tags:
 *       - Events
 *     summary: Create event
 *     description: Creates a new event record.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateEventRequest'
 *           example:
 *             name: Tech Conference 2027
 *             date: 2027-10-15T10:00:00.000Z
 *             capacity: 200
 *             registrationCount: 30
 *             status: active
 *             category: conference
 *     responses:
 *       201:
 *         description: Event created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Event created successfully
 *                 data:
 *                   $ref: '#/components/schemas/Event'
 *       400:
 *         description: Validation error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ValidationErrorResponse'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.post("/", validate(createEventSchema), createEvent);

/**
 * @openapi
 * /api/v1/events:
 *   get:
 *     tags:
 *       - Events
 *     summary: Get all events
 *     description: Returns all event records.
 *     responses:
 *       200:
 *         description: Events retrieved
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Events retrieved
 *                 count:
 *                   type: integer
 *                   example: 2
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Event'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get("/", getAllEvents);

/**
 * @openapi
 * /api/v1/events/{id}:
 *   get:
 *     tags:
 *       - Events
 *     summary: Get event by ID
 *     description: Returns a single event by its id.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Event retrieved
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Event retrieved
 *                 data:
 *                   $ref: '#/components/schemas/Event'
 *       404:
 *         description: Event not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Event not found
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get("/:id", getEventById);

/**
 * @openapi
 * /api/v1/events/{id}:
 *   put:
 *     tags:
 *       - Events
 *     summary: Update event
 *     description: Updates fields on an existing event.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateEventRequest'
 *           example:
 *             name: Updated Tech Conference
 *             capacity: 250
 *     responses:
 *       200:
 *         description: Event updated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Event updated
 *                 data:
 *                   $ref: '#/components/schemas/Event'
 *       400:
 *         description: Validation error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ValidationErrorResponse'
 *       404:
 *         description: Event not found
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.put("/:id", validate(updateEventSchema), updateEvent);

/**
 * @openapi
 * /api/v1/events/{id}:
 *   delete:
 *     tags:
 *       - Events
 *     summary: Delete event
 *     description: Deletes an event by id.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Event deleted
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Event deleted
 *       404:
 *         description: Event not found
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.delete("/:id", deleteEvent);

// Export the router
export default router;

