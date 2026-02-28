import Joi from "joi";

export const createEventSchema = Joi.object({
  name: Joi.string().min(3).required(),

  date: Joi.string()
    .isoDate()
    .greater("now")
    .required(),

  capacity: Joi.number()
    .integer()
    .min(5)
    .required(),

  registrationCount: Joi.number()
    .integer()
    .max(Joi.ref("capacity"))
    .optional(),

  status: Joi.string()
    .valid("active", "cancelled", "completed")
    .optional(),

  category: Joi.string()
    .valid("conference", "workshop", "meetup", "seminar", "general")
    .optional()
});


export const updateEventSchema = Joi.object({
  name: Joi.string().min(3),
  date: Joi.string().isoDate().greater("now"),
  capacity: Joi.number().integer().min(5),
  registrationCount: Joi.number().integer().max(Joi.ref("capacity")),
  status: Joi.string().valid("active", "cancelled", "completed"),
  category: Joi.string().valid("conference", "workshop", "meetup", "seminar", "general")
});
