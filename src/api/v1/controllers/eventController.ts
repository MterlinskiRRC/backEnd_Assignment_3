import { Request, Response } from "express";
import * as eventService from "../services/eventService";

export const createEvent = async (req: Request, res: Response) => {
  try {
    const event = await eventService.createEvent(req.body);
    res.status(201).json({
      message: "Event created",
      data: event
    });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

export const getAllEvents = async (req: Request, res: Response) => {
  try {
    const events = await eventService.getAllEvents();
    res.json({
      message: "Events retrieved",
      count: events.length,
      data: events
    });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

