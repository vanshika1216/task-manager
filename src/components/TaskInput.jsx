import { useState } from 'react';
import PropTypes from 'prop-types';

const TaskInput = ({ onAddTask }) => {
  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState(1);

  const handleAdd = () => {
    if (title.trim()) {
      onAddTask(title, priority);
      setTitle('');
      setPriority(1);
    }
  };

  return (
    <div className="mb-6 p-4 bg-white rounded-lg shadow-md">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter task..."
        className="border p-3 rounded w-full mb-3 focus:ring-2 focus:ring-blue-500"
      />
      <select
        value={priority}
        onChange={(e) => setPriority(Number(e.target.value))}
        className="border p-3 rounded w-full mb-3 focus:ring-2 focus:ring-blue-500"
      >
        <option value="1">Low</option>
        <option value="2">Medium</option>
        <option value="3">High</option>
      </select>
      <button
        onClick={handleAdd}
        className="bg-blue-500 text-white px-6 py-2 rounded-full transition-all duration-200 ease-in-out hover:bg-blue-600 w-full"
      >
        Add Task
      </button>
    </div>
  );
};

TaskInput.propTypes = {
  onAddTask: PropTypes.func.isRequired,
};

export default TaskInput;
