import express from "express"
import pool from "../config/db.js"
import { createTaskTableQuery, deleteTaskByIdQuery } from "../models/Task.js"
import { createTask, deleteTask, updateTask, getAllTasks } from "../controllers/todoController.js";
const router = express.Router()

// Create a new todo task
router.post("/", createTask)

// Delete a task by id
router.delete("/:id", deleteTask)

// Update a task by id
router.put("/:id", updateTask)

// Fetch all tasks
router.get("/", getAllTasks)

export default router
