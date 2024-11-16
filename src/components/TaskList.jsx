import React from 'react';
import PropTypes from 'prop-types';

const TaskList = ({ tasks, onDeleteTask, onToggleCompletion }) => {
  return (
    <ul className="bg-white rounded shadow-md p-4">
      {tasks.map((task) => (
        <li
          key={task.id}
          className={`p-2 border-b last:border-b-0 flex justify-between items-center ${
            task.completed ? 'line-through text-gray-400' : ''
          }`}
        >
          <span>
            {task.title} -{' '}
            <span className="text-sm text-gray-600">Priority: {task.priority}</span>
          </span>
          <div>
            <button
              onClick={() => onToggleCompletion(task.id)}
              className="bg-green-500 text-white px-2 py-1 rounded mr-2 hover:bg-green-600 transition duration-200"
            >
              {task.completed ? 'Undo' : 'Complete'}
            </button>
            <button
              onClick={() => onDeleteTask(task.id)}
              className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 transition duration-200"
            >
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
};

TaskList.propTypes = {
  tasks: PropTypes.array.isRequired,
  onDeleteTask: PropTypes.func.isRequired,
  onToggleCompletion: PropTypes.func.isRequired,
};

export default TaskList;
