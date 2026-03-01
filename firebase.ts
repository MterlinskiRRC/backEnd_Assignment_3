import admin from "firebase-admin";
import path from "path";

// Get the path to the service account key
const serviceAccountPath = path.join(__dirname, "serviceAccountKey.json");

const serviceAccount = require(serviceAccountPath);

// Initialize the firebase admin 
admin.initializeApp({
  // Authenticate with the service account
  credential: admin.credential.cert(serviceAccount)
});

// Export the firestore database instance
export const db = admin.firestore();
