/**
 * Firebase Admin SDK initialization module
 *
 * This module handles the initialization of Firebase Admin SDK for server-side
 * operations. It sets up authentication and Firestore database connections.
 */

import "dotenv/config";
import { existsSync, readFileSync } from "fs";
import path from "path";
import {
  initializeApp,
  cert,
  getApps,
  App,
  AppOptions,
  ServiceAccount,
} from "firebase-admin/app";
import { getFirestore, Firestore } from "firebase-admin/firestore";
import { getAuth, Auth } from "firebase-admin/auth";

type RawServiceAccount = {
  project_id?: string;
  client_email?: string;
  private_key?: string;
};

const getServiceAccountFromFile = (): ServiceAccount | null => {
  const serviceAccountPath = path.join(process.cwd(), "serviceAccountKey.json");

  if (!existsSync(serviceAccountPath)) {
    return null;
  }

  const rawContent = readFileSync(serviceAccountPath, "utf-8");
  const parsed: RawServiceAccount = JSON.parse(rawContent);

  if (!parsed.project_id || !parsed.client_email || !parsed.private_key) {
    return null;
  }

  return {
    projectId: parsed.project_id,
    clientEmail: parsed.client_email,
    privateKey: parsed.private_key.replace(/\\n/g, "\n"),
  };
};

/**
 * Retrieves Firebase configuration from environment variables
 *
 * @returns {AppOptions} Firebase application configuration object
 * @throws {Error} If any required environment variables are missing
 */
const getFirebaseConfig = (): AppOptions => {
  // Extract Firebase credentials from environment variables
  const {
    FIREBASE_PROJECT_ID,
    FIREBASE_CLIENT_EMAIL,
    FIREBASE_PRIVATE_KEY,
  } = process.env;

  // Prefer environment variables when available
  if (FIREBASE_PROJECT_ID && FIREBASE_CLIENT_EMAIL && FIREBASE_PRIVATE_KEY) {
    const serviceAccount: ServiceAccount = {
      projectId: FIREBASE_PROJECT_ID,
      clientEmail: FIREBASE_CLIENT_EMAIL,
      privateKey: FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"),
    };

    return {
      credential: cert(serviceAccount),
    };
  }

  // Fall back to local service account JSON for local development
  const serviceAccountFromFile = getServiceAccountFromFile();
  if (serviceAccountFromFile) {
    return {
      credential: cert(serviceAccountFromFile),
    };
  }

  throw new Error(
    "Missing Firebase configuration. Set FIREBASE_PROJECT_ID/FIREBASE_CLIENT_EMAIL/FIREBASE_PRIVATE_KEY or provide serviceAccountKey.json."
  );
};

/**
 * Initializes Firebase Admin SDK if not already initialized
 *
 * This function implements the singleton pattern to ensure only
 * one Firebase app instance is created.
 *
 * @returns {App} Firebase Admin app instance
 */
const initializeFirebaseAdmin = (): App => {
  // Check if an app is already initialized
  const existingApp: App = getApps()[0];
  if (existingApp) {
    // Return existing app if found
    return existingApp;
  }
  // Otherwise create and return a new app
  return initializeApp(getFirebaseConfig());
};

// Initialize the Firebase Admin app
const app: App = initializeFirebaseAdmin();

// Get Firestore database instance
const db: Firestore = getFirestore(app);

// Get Firebase Auth instance
const auth: Auth = getAuth(app);

export { db, auth };
