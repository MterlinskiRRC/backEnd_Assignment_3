import Joi from "joi";

export const createEventSchema = Joi.object({
  // name is a required string with a minimum length of 3
  name: Joi.string().min(3).required(),

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
  // name is an optional string with a minimum length of 3
  name: Joi.string().min(3).optional(),
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
