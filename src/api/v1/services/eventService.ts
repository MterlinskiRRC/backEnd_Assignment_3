import { db } from "../../../config/firebase";
import { Event } from "../models/Event";

const collection = db.collection("events");

export const createEvent = async (data: any): Promise<Event> => {
  const id = collection.doc().id;
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

  await collection.doc(id).set(newEvent);
  return newEvent;
};

export const getAllEvents = async (): Promise<Event[]> => {
  const snapshot = await collection.get();
  return snapshot.docs.map(doc => doc.data() as Event);
};
