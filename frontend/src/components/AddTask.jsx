import React, { useState } from 'react';
import { TASKS_API_URL } from '../api/TaskAPI';

const AddTask = ({ onTaskAdded }) => {
  const [showInputs, setShowInputs] = useState(false);
  const [title, setTitle] = useState('');
  const [completed, setCompleted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handlePlusClick = () => {
    setShowInputs(true);
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleRadioChange = (e) => {
    setCompleted(e.target.value === 'true');
  };

  const handleKeyDown = async (e) => {
    if (e.key === 'Enter' && title.trim() !== '') {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(TASKS_API_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ title, completed }),
        });
        if (!response.ok) {
          throw new Error('Failed to add task');
        }
        setTitle('');
        setShowInputs(false);
        if (onTaskAdded) onTaskAdded();
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    } else if (e.key === 'Escape') {
      setShowInputs(false);
      setTitle('');
      setError(null);
    }
  };

  return (
    <div style={{ marginBottom: '1rem' }}>
      {showInputs && (
        <div style={{ marginBottom: '0.5rem' }}>
          <input
            type="text"
            placeholder="Enter task title"
            value={title}
            onChange={handleTitleChange}
            onKeyDown={handleKeyDown}
            autoFocus
            disabled={loading}
            style={{ marginRight: '0.5rem' }}
          />
          <label>
            <input
              type="radio"
              name="completed"
              value="true"
              checked={completed === true}
              onChange={handleRadioChange}
              disabled={loading}
            />
            True
          </label>
          <label style={{ marginLeft: '0.5rem' }}>
            <input
              type="radio"
              name="completed"
              value="false"
              checked={completed === false}
              onChange={handleRadioChange}
              disabled={loading}
            />
            False
          </label>
        </div>
      )}
      <button onClick={handlePlusClick} disabled={showInputs || loading} aria-label="Add Task">➕</button>
      {error && <div style={{ color: 'red' }}>{error}</div>}
    </div>
  );
};

export default AddTask;
