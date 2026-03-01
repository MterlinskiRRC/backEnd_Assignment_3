
import express from "express";

import eventRoutes from "./api/v1/routes/eventRoutes";
import healthRoute from "./api/v1/routes/healthRoute";

const app = express();
app.use(express.json());

app.use("/api/v1", healthRoute);
app.use("/api/v1/events", eventRoutes);

export default app;
