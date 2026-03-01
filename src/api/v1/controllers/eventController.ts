import { Request, Response } from "express";
import * as service from "../services/eventService";
import { HTTP_STATUS } from "../../../constants/httpContstants";

export const createEvent = async (req: Request, res: Response) => {
  try {
    const event = await service.createEvent(req.body);
    res.status(HTTP_STATUS.CREATED).json({ message: "Event created successfully", data: event });
  } catch (error) {
    console.error(error);
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ message: "Internal server error" });
  }
};

export const getAllEvents = async (req: Request, res: Response) => {
  try {
    const events = await service.getAllEvents();
    res.status(HTTP_STATUS.OK).json({ message: "Events retrieved", count: events.length, data: events });
  } catch (error) {
    console.error(error);
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ message: "Internal server error" });
  }
};

export const getEventById = async (req: Request, res: Response) => {
  try {
    const event = await service.getEventById(req.params.id);
    if (!event) {
      res.status(HTTP_STATUS.NOT_FOUND).json({ message: "Event not found" });
      return;
    }

    res.status(HTTP_STATUS.OK).json({ message: "Event retrieved", data: event });
  } catch (error) {
    console.error(error);
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ message: "Internal server error" });
  }
};

export const updateEvent = async (req: Request, res: Response) => {
  try {
    const updated = await service.updateEvent(req.params.id, req.body);
    if (!updated) {
      res.status(HTTP_STATUS.NOT_FOUND).json({ message: "Event not found" });
      return;
    }

    res.status(HTTP_STATUS.OK).json({ message: "Event updated", data: updated });
  } catch (error) {
    console.error(error);
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ message: "Internal server error" });
  }
};

export const deleteEvent = async (req: Request, res: Response) => {
  try {
    const deleted = await service.deleteEvent(req.params.id);
    if (!deleted) {
      res.status(HTTP_STATUS.NOT_FOUND).json({ message: "Event not found" });
      return;
    }

    res.status(HTTP_STATUS.OK).json({ message: "Event deleted" });
  } catch (error) {
    console.error(error);
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ message: "Internal server error" });
  }
};
