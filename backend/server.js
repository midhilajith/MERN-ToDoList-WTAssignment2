// Entry point of the Express server
require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const taskRoutes = require("./routes/tasks");

const app = express();
const PORT = process.env.PORT || 5000;

// Allow requests only from the React frontend
app.use(cors({
  origin: process.env.FRONTEND_URL || "http://localhost:5173"
}));

// Read JSON request bodies
app.use(express.json());

// All task endpoints live under /api/tasks
app.use("/api/tasks", taskRoutes);

// Simple health-check route
app.get("/", (req, res) => {
  res.json({ message: "To-Do API is running" });
});

// Connect to MongoDB Atlas using the connection string from .env
if (!process.env.MONGO_URI) {
  console.error("MONGO_URI is missing. Copy .env.example to .env and set it.");
  process.exit(1);
}

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection failed:", err.message);
    process.exit(1);
  });