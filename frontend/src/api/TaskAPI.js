// TaskAPI.js - stores API endpoint URLs for tasks
const BASE_URL = import.meta.env.VITE_API_URL || '/api';
export const TASKS_API_URL = `${BASE_URL}/tasks/`;
