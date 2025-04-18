import React, { useState } from 'react';
import AddTask from './components/AddTask';
import TodoItem from './components/TodoItem.jsx';

function App() {
  const [refreshSignal, setRefreshSignal] = useState(0);

  const handleTaskAdded = () => {
    setRefreshSignal((prev) => prev + 1);
  };

  return (
    <div className="app-centered-container">
      <TodoItem refreshSignal={refreshSignal} />
      <AddTask onTaskAdded={handleTaskAdded} />
    </div>
  );
}

export default App;
