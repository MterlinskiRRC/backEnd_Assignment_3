import { Event } from "../models/Event";
import * as repo from "../repositories/eventRepository";
import { randomUUID } from 'crypto';

export const createEvent = async (data: any): Promise<Event> => {
  // Generate a unique ID for the event
  const id: string = randomUUID();
  // Get the current timestamp
  const now = new Date().toISOString();

  // Create a new event object
  const newEvent: Event = {
    id,
    name: data.name,
    date: data.date,
    capacity: data.capacity,
    registrationCount: data.registrationCount ?? 0,
    status: data.status ?? "active",
    category: data.category ?? "general",
    createdAt: now,
    updatedAt: now
  };

  // Call the repository to create the event
  await repo.create(newEvent);
  // Return the new event
  return newEvent;
};

// Service to get all events
export const getAllEvents = async (): Promise<Event[]> => {
  // Call the repository to get all events
  return repo.getAll();
};

// Service to get an event by its ID
export const getEventById = async (id: string): Promise<Event | null> => {
  // Call the repository to get the event by its ID
  return repo.getById(id);
};

// Service to update an event
export const updateEvent = async (id: string, data: any): Promise<Event | null> => {
  // Get the existing event from the repository
  const existing = await repo.getById(id);
  // If the event is not found, return null
  if (!existing) return null;

  // Create an updated event object
  const updated: Event = {
    ...existing,
    ...data,
    updatedAt: new Date().toISOString()
  };

  // Call the repository to update the event
  await repo.update(id, updated);
  // Return the updated event
  return updated;
};

// Service to delete an event
export const deleteEvent = async (id: string): Promise<boolean> => {
  // Get the existing event from the repository
  const existing = await repo.getById(id);
  // If the event is not found, return false
  if (!existing) return false;

  // Call the repository to delete the event
  await repo.remove(id);
  // Return true to indicate success
  return true;
};
