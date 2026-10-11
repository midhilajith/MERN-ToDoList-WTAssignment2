// REST API routes for tasks, mounted at /api/tasks (Assignment A4, A5)
const express = require("express");
const mongoose = require("mongoose");
const Task = require("../models/Task");

const router = express.Router();

// Turn any incoming value into a trimmed string (A5)
const cleanTitle = (value) => String(value ?? "").trim();

// Reject ids that are not valid MongoDB ObjectIds, so we answer 404 instead of crashing
const isValidId = (id) => mongoose.Types.ObjectId.isValid(id);

// GET /api/tasks - fetch all tasks (newest first)
router.get("/", async (req, res) => {
  try {
    const tasks = await Task.find().sort({ createdAt: -1 });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: "Could not fetch tasks" });
  }
});

// POST /api/tasks - add a new task
router.post("/", async (req, res) => {
  try {
    const title = cleanTitle(req.body.title);
    if (!title) {
      return res.status(400).json({ error: "Title must not be empty" });
    }
    const task = await Task.create({ title });
    res.status(201).json(task); // 201 = Created
  } catch (err) {
    res.status(500).json({ error: "Could not create task" });
  }
});

// PUT /api/tasks/:id - edit the title and/or mark complete/incomplete
router.put("/:id", async (req, res) => {
  try {
    if (!isValidId(req.params.id)) {
      return res.status(404).json({ error: "Task not found" });
    }

    const updates = {};

    // Only touch the title if the client sent one
    if (req.body.title !== undefined) {
      const title = cleanTitle(req.body.title);
      if (!title) {
        return res.status(400).json({ error: "Title must not be empty" });
      }
      updates.title = title;
    }

    // Only touch "completed" if the client sent a boolean
    if (typeof req.body.completed === "boolean") {
      updates.completed = req.body.completed;
    }

    // { new: true } returns the document after the update
    const task = await Task.findByIdAndUpdate(req.params.id, updates, { new: true });
    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }
    res.json(task);
  } catch (err) {
    res.status(500).json({ error: "Could not update task" });
  }
});

// DELETE /api/tasks/:id - delete a task
router.delete("/:id", async (req, res) => {
  try {
    if (!isValidId(req.params.id)) {
      return res.status(404).json({ error: "Task not found" });
    }
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }
    res.json({ message: "Task deleted", id: task._id });
  } catch (err) {
    res.status(500).json({ error: "Could not delete task" });
  }
});

module.exports = router;
