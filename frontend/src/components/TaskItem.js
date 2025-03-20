import React from 'react';

const TaskItem = ({ task, type }) => {
  const handleEdit = () => {
    // Edit logic for seeker
  };

  const handleDelete = () => {
    // Delete logic for seeker
  };

  const handleMessage = () => {
    // Message logic for helper
  };

  return (
    <div className="p-4 border rounded mb-4">
      <h3 className="text-xl font-semibold">{task.title}</h3>
      <p>{task.description}</p>
      <p>Status: {task.status}</p>

      {type === 'seeker' ? (
        <div>
          <button className="btn btn-sm btn-primary" onClick={handleEdit}>
            Edit
          </button>
          <button className="btn btn-sm btn-danger" onClick={handleDelete}>
            Delete
          </button>
        </div>
      ) : (
        <button className="btn btn-sm btn-secondary" onClick={handleMessage}>
          Message Poster
        </button>
      )}
    </div>
  );
};

export default TaskItem;
