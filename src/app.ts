import express from "express";
import healthRoutes from "./api/v1/routes/healthRoutes";
import eventRoutes from "./api/v1/routes/eventRoutes";

const app = express();

app.use(express.json());
app.use("/api/v1", eventRoutes);
app.use("/api/v1", healthRoutes);

// Define a route
app.get("/", (req, res) => {
    res.send("Hello, Sergei, welcome to Assignment 3!");
});

export default app;