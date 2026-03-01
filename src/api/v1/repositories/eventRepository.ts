import { db } from "../../../../firebase";
import { Event } from "../models/Event";

const collection = db.collection("events");

// Create a new event in the database
export const create = async (event: Event): Promise<void> => {
  // Set the document with the event's ID
  await collection.doc(event.id).set(event);
};

// Get all events from the database
export const getAll = async (): Promise<Event[]> => {
  // Get all documents from the collection
  const snapshot = await collection.get();
  return snapshot.docs.map((doc: any) => doc.data() as Event);
};

// Get an event by its ID from the database
export const getById = async (id: string): Promise<Event | null> => {
  // Get the document with the given ID
  const doc = await collection.doc(id).get();
  // If the document exists, return the data, otherwise return null
  return doc.exists ? (doc.data() as Event) : null;
};

// Update an event in the database
export const update = async (id: string, data: Partial<Event>): Promise<void> => {
  // Update the document with the given ID
  await collection.doc(id).update(data);
};

// Delete an event from the database
export const remove = async (id: string): Promise<void> => {
  // Delete the document with the given ID
  await collection.doc(id).delete();
};
