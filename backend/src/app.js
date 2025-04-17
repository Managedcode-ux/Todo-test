import express from "express";
import taskRoutes from "./routes/task.js"

const app = express();

// Add middleware to parse JSON bodies
app.use(express.json());

// Example route
app.get("/api/hello", (req, res) => {
  res.json({ message: "Hello, world!" });
});

app.use("/api/tasks", taskRoutes)

export default app;