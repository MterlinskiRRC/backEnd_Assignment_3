import { db } from "../../../../config/firebase";
import { Event } from "../models/Event";

const collection = db.collection("events");

export const create = async (event: Event): Promise<void> => {
  await collection.doc(event.id).set(event);
};

export const getAll = async (): Promise<Event[]> => {
  const snapshot = await collection.get();
  return snapshot.docs.map(doc => doc.data() as Event);
};

export const getById = async (id: string): Promise<Event | null> => {
  const doc = await collection.doc(id).get();
  return doc.exists ? (doc.data() as Event) : null;
};

export const update = async (id: string, data: Partial<Event>): Promise<void> => {
  await collection.doc(id).update(data);
};

export const remove = async (id: string): Promise<void> => {
  await collection.doc(id).delete();
};
