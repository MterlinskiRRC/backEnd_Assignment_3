import dotenv from "dotenv";

// Load environment variables BEFORE internal imports
dotenv.config();

import express, { Express } from "express";
import cors from "cors";
import setupSwagger from "./config/swagger";
import { getHelmetConfig } from "./config/helmetConfig";
import { getCorsOptions } from "./config/corsConfig";
import { generateSwaggerSpec } from "./config/swaggerOptions";

import eventRoutes from "./api/v1/routes/eventRoutes";
import healthRoute from "./api/v1/routes/healthRoute";

const app: Express = express();

// Apply Helmet security middleware
app.use(getHelmetConfig());

// Apply CORS middleware
app.use(cors(getCorsOptions()));

// Parse JSON request bodies
app.use(express.json());

// Serve OpenAPI specification as JSON
app.get("/api-docs.json", (req, res) => {
	res.json(generateSwaggerSpec());
});

// Setup Swagger UI documentation
setupSwagger(app);

// Routes
app.use("/api/v1", healthRoute);
app.use("/api/v1/events", eventRoutes);

export default app;
