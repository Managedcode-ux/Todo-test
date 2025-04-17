import pool from "../config/db.js";
import { createTaskTableQuery, deleteTaskByIdQuery, updateTaskQuery, getAllTasksQuery } from "../models/Task.js";

export const createTask = async (req, res) => {
  const { title, completed } = req.body;
  if (typeof title !== "string" || typeof completed !== "boolean") {
    return res.status(400).json({ error: "Invalid task format" });
  }
  try {
    // Ensure the tasks table exists
    await pool.query(createTaskTableQuery);
    // Insert the new task
    const result = await pool.query(
      "INSERT INTO tasks (title, completed) VALUES ($1, $2) RETURNING *",
      [title, completed]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: "Database error", details: err.message });
  }
};

export const deleteTask = async (req, res) => {
  const { id } = req.params;
  if (!id || isNaN(Number(id))) {
    return res.status(400).json({ error: "Invalid or missing task id" });
  }
  try {
    const result = await pool.query(deleteTaskByIdQuery, [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Task not found" });
    }
    res.json({ message: "Task deleted", task: result.rows[0] });
  } catch (err) {
    res.status(500).json({ error: "Database error", details: err.message });
  }
};

export const updateTask = async (req, res) => {
  const { id } = req.params;
  const { title, completed } = req.body;
  if (!id || isNaN(Number(id))) {
    return res.status(400).json({ error: "Invalid or missing task id" });
  }
  if (typeof title !== "string" || typeof completed !== "boolean") {
    return res.status(400).json({ error: "Invalid task format" });
  }
  try {
    const result = await pool.query(
      updateTaskQuery,
      [title, completed, id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Task not found" });
    }
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: "Database error", details: err.message });
  }
};

export const getAllTasks = async (req, res) => {
  try {
    const tableCheck = await pool.query(
      `SELECT to_regclass('public.tasks') as table_exists;`
    );
    if (!tableCheck.rows[0].table_exists) {
      return res.status(500).json({ error: "Table 'tasks' does not exist" });
    }
    const result = await pool.query(getAllTasksQuery);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: "Database error", details: err.message });
  }
};