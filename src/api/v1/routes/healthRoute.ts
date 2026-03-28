import { Router } from "express";

import { getHealth } from "../controllers/healthController";
// Create a new router
const router = Router();

/**
 * @openapi
 * /api/v1/health:
 *   get:
 *     tags:
 *       - Health
 *     summary: Health check
 *     description: Returns service health information and uptime.
 *     responses:
 *       200:
 *         description: API is healthy
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/HealthResponse'
 */
// Define the health route
router.get("/health", getHealth);

// Export the router
export default router;
