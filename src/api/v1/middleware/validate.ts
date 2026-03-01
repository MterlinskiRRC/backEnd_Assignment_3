import { Request, Response, NextFunction } from "express";
import Joi from "joi";

export default function validate(schema: Joi.ObjectSchema) {
  return (req: Request, res: Response, next: NextFunction): void => {
    const { error } = schema.validate(req.body);

    if (error) {
      res.status(400).json({
        message: `Validation error: ${error.details[0].message}`
      });
      return;
    }

    next();
  };
}
