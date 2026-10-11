// Mongoose schema + model for a Task (Assignment A3)
const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  // Text of the task - required
  title: { type: String, required: true },
  // Whether the task is done - defaults to false
  completed: { type: Boolean, default: false },
  // When the task was created - defaults to "now"
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Task", taskSchema);
