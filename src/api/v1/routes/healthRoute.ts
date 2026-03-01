import { Router } from "express";

import { getHealth } from "../controllers/healthController";
// Create a new router
const router = Router();

// Define the health route
router.get("/health", getHealth);

// Export the router
export default router;
