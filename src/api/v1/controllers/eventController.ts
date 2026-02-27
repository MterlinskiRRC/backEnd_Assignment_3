import { Request, Response } from "express";
import * as eventService from "../services/eventService";

export const createEvent = (req: Request, res: Response) => {
  const event = eventService.createEvent(req.body);
  res.status(201).json({
    message: "Event created",
    data: event
  });
};

export const getAllEvents = (req: Request, res: Response) => {
  const events = eventService.getAllEvents();
  res.json({
    message: "Events retrieved",
    count: events.length,
    data: events
  });
};
