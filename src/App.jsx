import { useState, useEffect } from 'react';
import TaskInput from './components/TaskInput';
import TaskList from './components/TaskList';
import TaskSearch from './components/TaskSearch';

const App = () => {
  const [tasks, setTasks] = useState(() => {
    const storedTasks = localStorage.getItem('tasks');
    return storedTasks ? JSON.parse(storedTasks) : [];
  });

  const [searchTerm, setSearchTerm] = useState('');
  const [sortCriteria, setSortCriteria] = useState('date');
  const [notification, setNotification] = useState('');

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (title, priority) => {
    const newTask = { id: Date.now(), title, priority, completed: false, date: new Date() };
    setTasks([...tasks, newTask]);
    setNotification('Task added successfully!');
    setTimeout(() => setNotification(''), 3000); // Hide message after 3 seconds
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
    setNotification('Task deleted successfully!');
    setTimeout(() => setNotification(''), 3000); // Hide message after 3 seconds
  };

  const toggleCompletion = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const filteredTasks = tasks
    .filter((task) =>
      task.title.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortCriteria === 'priority') return b.priority - a.priority;
      if (sortCriteria === 'date') return new Date(a.date) - new Date(b.date);
      return 0;
    });

  return (
    <div className="p-8 bg-gray-100 min-h-screen transition-all duration-300 ease-in-out">
      {/* Main Heading */}
      <h1 className="text-4xl font-bold text-center text-sky-600 mb-2">Task Manager</h1>

      {/* Subheading */}
      <h2 className="text-lg text-center text-black-600 mb-8 font-semibold">
        "Stay on top of your tasks, effortlessly."
      </h2>
      <h4 className="text-xl text-center text-gray-500 mb-6 font-medium">
        Your personal productivity partner to manage tasks with ease.
      </h4>

      {/* Notification Message */}
      {notification && (
        <div className="mb-4 p-4 text-white bg-green-500 rounded-md text-center">
          {notification}
        </div>
      )}

      {/* Add Task Section */}
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Add a New Task</h2>
        <TaskInput onAddTask={addTask} />
      </div>

      {/* Search and Sort Section */}
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Search and Sort Your Tasks</h2>
        <TaskSearch setSearchTerm={setSearchTerm} setSortCriteria={setSortCriteria} />
      </div>

      {/* Task List Section */}
      <div className="mt-6 p-4 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Your Tasks</h2>

        {/* Display No Tasks Found Message if no filtered tasks */}
        {filteredTasks.length === 0 ? (
          <div className="text-center text-lg font-semibold text-gray-600 p-6">
            <p>No tasks found for your search.</p>
            <p className="text-sm text-gray-500 mt-2">
              Try different keywords or remove the filter to view all tasks.
            </p>
          </div>
        ) : (
          <TaskList
            tasks={filteredTasks}
            onDeleteTask={deleteTask}
            onToggleCompletion={toggleCompletion}
          />
        )}
      </div>
    </div>
  );
};

export default App;
