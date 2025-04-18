import React, { useEffect, useState } from 'react';
import './TodoItem.css';

const TodoItem = () => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [editValue, setEditValue] = useState('');

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

  const markComplete = async (todo) => {
    try {
      const response = await fetch(`http://localhost:3000/api/tasks/${todo.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: todo.title,
          completed: true,
        }),
      });
      if (!response.ok) {
        throw new Error('Failed to mark task as complete');
      }
      setTodos((prevTodos) =>
        prevTodos.map((t) =>
          t.id === todo.id ? { ...t, completed: true } : t
        )
      );
    } catch (err) {
      setError(err.message);
    }
  };

  const markIncomplete = async (todo) => {
    try {
      const response = await fetch(`http://localhost:3000/api/tasks/${todo.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: todo.title,
          completed: false,
        }),
      });
      if (!response.ok) {
        throw new Error('Failed to mark task as incomplete');
      }
      setTodos((prevTodos) =>
        prevTodos.map((t) =>
          t.id === todo.id ? { ...t, completed: false } : t
        )
      );
    } catch (err) {
      setError(err.message);
    }
  };

  const handleEditClick = (todo) => {
    setEditingId(todo.id);
    setEditValue(todo.title);
  };

  const handleEditChange = (e) => {
    setEditValue(e.target.value);
  };

  const handleEditKeyDown = async (e, todo) => {
    if (e.key === 'Enter') {
      try {
        const response = await fetch(`http://localhost:3000/api/tasks/${todo.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            title: editValue,
            completed: todo.completed,
          }),
        });
        if (!response.ok) {
          throw new Error('Failed to update task');
        }
        setTodos((prevTodos) =>
          prevTodos.map((t) =>
            t.id === todo.id ? { ...t, title: editValue } : t
          )
        );
        setEditingId(null);
      } catch (err) {
        setError(err.message);
      }
    } else if (e.key === 'Escape') {
      setEditingId(null);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <ul className="todo-list">
      {todos.map((todo) => (
        <li key={todo.id} className="todo-list-item">
          <span className="todo-trash" role="img" aria-label="delete" onClick={() => handleDelete(todo.id)}>🗑️</span>
          {editingId === todo.id ? (
            <input
              className="todo-title"
              value={editValue}
              onChange={handleEditChange}
              onKeyDown={(e) => handleEditKeyDown(e, todo)}
              autoFocus
            />
          ) : (
            <span className={`todo-title${todo.completed ? ' completed' : ''}`}>{todo.title}</span>
          )}
          <span className="todo-icons">
            {todo.completed ? 
              <span className="todo-icon" role="img" aria-label="cancel" onClick={() => markIncomplete(todo)}>❌</span>:
              <span className="todo-icon" role="img" aria-label="complete" onClick={() => markComplete(todo)}>✔️</span>
            }
            <span className="todo-icon" role="img" aria-label="edit" onClick={() => handleEditClick(todo)}>✏️</span>
          </span>
        </li>
      ))}
    </ul>
  );
};

export default TodoItem;
