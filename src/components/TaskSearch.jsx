import React from 'react';
import PropTypes from 'prop-types';

const TaskSearch = ({ setSearchTerm, setSortCriteria }) => {
  return (
    <div className="mb-4 bg-white p-4 rounded shadow-md">
      <input
        type="text"
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search tasks..."
        className="border p-2 rounded w-full mb-2 shadow-md"
      />
      <select
        onChange={(e) => setSortCriteria(e.target.value)}
        className="border p-2 rounded w-full shadow-md"
      >
        <option value="date">Sort by Date</option>
        <option value="priority">Sort by Priority</option>
      </select>
    </div>
  );
};

TaskSearch.propTypes = {
  setSearchTerm: PropTypes.func.isRequired,
  setSortCriteria: PropTypes.func.isRequired,
};

export default TaskSearch;
