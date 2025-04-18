import React, { useEffect, useState } from 'react';
import './TodoItem.css';

const TodoItem = () => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/tasks/');
        if (!response.ok) {
          throw new Error('Failed to fetch tasks');
        }
        const data = await response.json();
        setTodos(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchTodos();
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/api/tasks/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete task');
      }
      setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <ul className="todo-list">
      {todos.map((todo) => (
        <li key={todo.id} className="todo-list-item">
          <span className="todo-trash" role="img" aria-label="delete" onClick={() => handleDelete(todo.id)}>🗑️</span>
          <span className={`todo-title${todo.completed ? ' completed' : ''}`}>{todo.title}</span>
          <span className="todo-icons">
            <span className="todo-icon" role="img" aria-label="complete">✔️</span>
            <span className="todo-icon" role="img" aria-label="edit">✏️</span>
            <span className="todo-icon" role="img" aria-label="cancel" >❌</span>
          </span>
        </li>
      ))}
    </ul>
  );
};

export default TodoItem;
