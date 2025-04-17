// Task model definition for PostgreSQL (using SQL statements)
// This file defines the structure of a Task and provides SQL for table creation

export const createTaskTableQuery = `
  CREATE TABLE IF NOT EXISTS tasks (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    completed BOOLEAN DEFAULT FALSE
  );
`;

export const deleteTaskByIdQuery = `
  DELETE FROM tasks WHERE id = $1 RETURNING *;
`;

export const updateTaskQuery = `
  UPDATE tasks SET title = $1, completed = $2 WHERE id = $3 RETURNING *;
`;

export const getAllTasksQuery = `
  SELECT * FROM tasks;
`;

