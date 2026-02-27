import { Event } from "../models/Event";
import * as repo from "../repositories/eventRepository";

export const createEvent = async (data: any): Promise<Event> => {
  const id = `evt_${Math.random().toString().slice(2, 8).padStart(6, "0")}`;
  const now = new Date().toISOString();

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

  await repo.create(newEvent);
  return newEvent;
};

export const getAllEvents = async (): Promise<Event[]> => {
  return repo.getAll();
};

export const getEventById = async (id: string): Promise<Event | null> => {
  return repo.getById(id);
};

export const updateEvent = async (id: string, data: any): Promise<Event | null> => {
  const existing = await repo.getById(id);
  if (!existing) return null;

  const updated: Event = {
    ...existing,
    ...data,
    updatedAt: new Date().toISOString()
  };

  await repo.update(id, updated);
  return updated;
};

export const deleteEvent = async (id: string): Promise<boolean> => {
  const existing = await repo.getById(id);
  if (!existing) return false;

  await repo.remove(id);
  return true;
};
