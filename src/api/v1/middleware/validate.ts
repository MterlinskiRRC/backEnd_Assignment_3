import { Request, Response, NextFunction } from "express";
import Joi from "joi";

// Middleware to validate the request body against a Joi schema
export default function validate(schema: Joi.ObjectSchema) {
  // Return a middleware function
  return (req: Request, res: Response, next: NextFunction): void => {
    // Validate the request body against the schema
    const { error } = schema.validate(req.body);

    // If there is an error, send a 400 response with the error message
    if (error) {
      res.status(400).json({
        message: `Validation error: ${error.details[0].message}`
      });
      return;
    }

    // If there is no error, call the next middleware
    next();
  };
}
