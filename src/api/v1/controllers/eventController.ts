import { Request, Response } from "express";
import * as service from "../services/eventService";

export const createEvent = async (req: Request, res: Response) => {
  const event = await service.createEvent(req.body);
  res.status(201).json({ message: "Event created", data: event });
};

export const getAllEvents = async (req: Request, res: Response) => {
  const events = await service.getAllEvents();
  res.json({ message: "Events retrieved", count: events.length, data: events });
};

export const getEventById = async (req: Request, res: Response) => {
  const event = await service.getEventById(req.params.id);
  if (!event) {
    res.status(404).json({ message: "Event not found" });
    return;
  }

  res.json({ message: "Event retrieved", data: event });
};

export const updateEvent = async (req: Request, res: Response) => {
  const updated = await service.updateEvent(req.params.id, req.body);
  if (!updated) {
    res.status(404).json({ message: "Event not found" });
    return;
  }

  res.json({ message: "Event updated", data: updated });
};

export const deleteEvent = async (req: Request, res: Response) => {
  const deleted = await service.deleteEvent(req.params.id);
  if (!deleted) {
    res.status(404).json({ message: "Event not found" });
    return;
  }

  res.json({ message: "Event deleted" });
};
