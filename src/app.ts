
import express from "express";
import helmet from "helmet";
import cors, { CorsOptions } from "cors";

import eventRoutes from "./api/v1/routes/eventRoutes";
import healthRoute from "./api/v1/routes/healthRoute";

const app = express();

const allowedOrigins = (process.env.CORS_ALLOWED_ORIGINS ?? "http://localhost:3000")
	.split(",")
	.map((origin) => origin.trim())
	.filter(Boolean);

const corsOptions: CorsOptions = {
	origin(origin, callback) {
		if (!origin) {
			callback(null, true);
			return;
		}

		if (allowedOrigins.includes(origin)) {
			callback(null, true);
			return;
		}

		callback(new Error("Origin not allowed by CORS"));
	},
	methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
	allowedHeaders: ["Content-Type", "Authorization"],
	credentials: false,
	maxAge: 600
};

app.use(
	helmet({
		contentSecurityPolicy: false,
		crossOriginEmbedderPolicy: false,
		frameguard: { action: "deny" },
		hsts: {
			maxAge: 31536000,
			includeSubDomains: true,
			preload: false
		},
		referrerPolicy: { policy: "no-referrer" },
		xDnsPrefetchControl: { allow: false }
	})
);

app.use(cors(corsOptions));
app.use(express.json());

app.use("/api/v1", healthRoute);
app.use("/api/v1/events", eventRoutes);

export default app;
