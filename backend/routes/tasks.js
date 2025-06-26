const express = require("express");
const Task = require("../models/Task");
const auth = require("../middleware/auth");
const { validateTask } = require("../middleware/validation");

const router = express.Router();

//  GET /api/tasks
//   Get all tasks for the authenticated user
router.get("/", auth, async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user._id }).sort({
      createdAt: -1,
    });
    res.json(tasks);
  } catch (error) {
    console.error("Get tasks error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// POST /api/tasks
// Create a new task
router.post("/", auth, validateTask, async (req, res) => {
  try {
    const { taskName, description, dueDate } = req.body;

    const task = new Task({
      taskName,
      description,
      dueDate,
      user: req.user._id,
    });

    await task.save();
    res.status(201).json(task);
  } catch (error) {
    console.error("Create task error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

//  PUT /api/tasks/:id
//  Update a task
router.put("/:id", auth, validateTask, async (req, res) => {
  try {
    const { taskName, description, dueDate } = req.body;
    const taskId = req.params.id;

    const task = await Task.findOne({ _id: taskId, user: req.user._id });

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    task.taskName = taskName;
    task.description = description;
    task.dueDate = dueDate;

    await task.save();
    res.json(task);
  } catch (error) {
    console.error("Update task error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

//  DELETE /api/tasks/:id
//   Delete a task
router.delete("/:id", auth, async (req, res) => {
  try {
    const taskId = req.params.id;

    const task = await Task.findOneAndDelete({
      _id: taskId,
      user: req.user._id,
    });

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.json({ message: "Task deleted successfully" });
  } catch (error) {
    console.error("Delete task error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

//  GET /api/tasks/:id
//  Get a specific task
router.get("/:id", auth, async (req, res) => {
  try {
    const taskId = req.params.id;

    const task = await Task.findOne({ _id: taskId, user: req.user._id });

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.json(task);
  } catch (error) {
    console.error("Get task error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
