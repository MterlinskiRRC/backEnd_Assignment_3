import { Request, Response } from "express";
import * as service from "../services/eventService";
import { HTTP_STATUS } from "../../../constants/httpContstants";

// Controller to create a new event
export const createEvent = async (req: Request, res: Response) => {
  try {
    // Call the service to create the event
    const event = await service.createEvent(req.body);
    // Send a CREATED response with the new event
    res.status(HTTP_STATUS.CREATED).json({ message: "Event created successfully", data: event });
  } catch (error) {
    // Log the error and send a response
    console.error(error);
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ message: "Internal server error" });
  }
};

// Controller to get all events
export const getAllEvents = async (req: Request, res: Response) => {
  try {
    // Call the service to get all events
    const events = await service.getAllEvents();
    // Send an OK response with the events
    res.status(HTTP_STATUS.OK).json({ message: "Events retrieved", count: events.length, data: events });
  } catch (error) {
    // Log the error and send a esponse
    console.error(error);
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ message: "Internal server error" });
  }
};

// Controller to get an event by its ID
export const getEventById = async (req: Request, res: Response) => {
  try {
    // Call the service to get the event by its ID
    const event = await service.getEventById(req.params.id);
    // If the event is not found, send a  response
    if (!event) {
      res.status(HTTP_STATUS.NOT_FOUND).json({ message: "Event not found" });
      return;
    }

    // Send an OK response with the event
    res.status(HTTP_STATUS.OK).json({ message: "Event retrieved", data: event });
  } catch (error) {
    // Log the error and send a response
    console.error(error);
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ message: "Internal server error" });
  }
};

// Controller to update an event
export const updateEvent = async (req: Request, res: Response) => {
  try {
    // Call the service to update the event
    const updated = await service.updateEvent(req.params.id, req.body);
    // If the event is not found, send a response
    if (!updated) {
      res.status(HTTP_STATUS.NOT_FOUND).json({ message: "Event not found" });
      return;
    }

    // Send an OK response with the updated event
    res.status(HTTP_STATUS.OK).json({ message: "Event updated", data: updated });
  } catch (error) {
    // Log the error and send a response
    console.error(error);
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ message: "Internal server error" });
  }
};

// Controller to delete an event
export const deleteEvent = async (req: Request, res: Response) => {
  try {
    // Call the service to delete the event
    const deleted = await service.deleteEvent(req.params.id);
    // If the event is not found, send a  response
    if (!deleted) {
      res.status(HTTP_STATUS.NOT_FOUND).json({ message: "Event not found" });
      return;
    }

    // Send an OK response
    res.status(HTTP_STATUS.OK).json({ message: "Event deleted" });
  } catch (error) {
    // Log the error and send a response
    console.error(error);
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ message: "Internal server error" });
  }
};
