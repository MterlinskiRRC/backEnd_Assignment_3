import Joi from "joi";

/**
 * @openapi
 * components:
 *   schemas:
 *     CreateEventRequest:
 *       type: object
 *       required:
 *         - name
 *         - date
 *         - capacity
 *       properties:
 *         name:
 *           type: string
 *           minLength: 3
 *           maxLength: 150
 *           example: Tech Conference 2027
 *         date:
 *           type: string
 *           format: date-time
 *           example: 2027-10-15T10:00:00.000Z
 *         capacity:
 *           type: integer
 *           minimum: 5
 *           example: 150
 *         registrationCount:
 *           type: integer
 *           minimum: 0
 *           example: 50
 *         status:
 *           type: string
 *           enum: [active, cancelled, completed]
 *           example: active
 *         category:
 *           type: string
 *           enum: [conference, workshop, meetup, seminar, general]
 *           example: conference
 *     UpdateEventRequest:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           minLength: 3
 *           maxLength: 150
 *         date:
 *           type: string
 *           format: date-time
 *         capacity:
 *           type: integer
 *           minimum: 5
 *         registrationCount:
 *           type: integer
 *           minimum: 0
 *         status:
 *           type: string
 *           enum: [active, cancelled, completed]
 *         category:
 *           type: string
 *           enum: [conference, workshop, meetup, seminar, general]
 */
export const createEventSchema = Joi.object({
  // name is a required string with a minimum length of 3 and a maximum length of 150
  name: Joi.string().min(3).max(150).required(),

  // date is a required ISO date that must be in the future
  date: Joi.date()
    .iso()
    .greater("now")
    .required(),

  // capacity is a required integer with a minimum value of 5
  capacity: Joi.number()
    .integer()
    .min(5)
    .required(),

  // registrationCount is an optional integer that cannot exceed the capacity
  registrationCount: Joi.number()
    .integer()
    .max(Joi.ref("capacity"))
    .optional(),

  // status is an optional string that must be one of the specified values
  status: Joi.string()
    .valid("active", "cancelled", "completed")
    .optional(),

  // category is an optional string that must be one of the specified values
  category: Joi.string()
    .valid("conference", "workshop", "meetup", "seminar", "general")
    .optional()
});

// Define the validation schema for updating an event
export const updateEventSchema = Joi.object({
  // name is an optional string with a minimum length of 3 and a maximum length of 150
  name: Joi.string().min(3).max(150).optional(),
  // date is an optional ISO date that must be in the future
  date: Joi.date().iso().greater("now").optional(),
  // capacity is an optional integer with a minimum value of 5
  capacity: Joi.number().integer().min(5).optional(),
  // registrationCount is an optional integer that cannot exceed the capacity
  registrationCount: Joi.number().integer().max(Joi.ref("capacity")).optional(),
  // status is an optional string that must be one of the specified values
  status: Joi.string().valid("active", "cancelled", "completed").optional(),
  // category is an optional string that must be one of the specified values
  category: Joi.string().valid("conference", "workshop", "meetup", "seminar", "general").optional()
});
