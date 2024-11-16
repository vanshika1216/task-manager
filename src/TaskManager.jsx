import  { useState, useEffect } from 'react';

const TaskManager = () => {
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState([]);

  // Fetch tasks from localStorage on load
  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    setTasks(savedTasks);
  }, []);

  // Save tasks to localStorage whenever tasks change
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  // Handle task input change
  const handleInputChange = (e) => {
    setTask(e.target.value);
  };

  // Add a new task
  const addTask = () => {
    if (task.trim()) {
      setTasks([...tasks, { id: Date.now(), title: task }]);
      setTask('');
    }
  };

  // Delete a task
  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-semibold text-center mb-6">Task Manager</h1>
        
        {/* Task Input */}
        <div className="mb-4">
          <input
            type="text"
            value={task}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Add a new task"
          />
        </div>
        <button
          onClick={addTask}
          className="w-full bg-blue-500 text-white py-2 rounded-md focus:outline-none hover:bg-blue-600"
        >
          Add Task
        </button>

        {/* Task List */}
        <ul className="mt-6 space-y-4">
          {tasks.map((task) => (
            <li key={task.id} className="flex justify-between items-center bg-gray-200 p-2 rounded-md">
              <span>{task.title}</span>
              <button
                onClick={() => deleteTask(task.id)}
                className="text-red-500 hover:text-red-700"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TaskManager;
