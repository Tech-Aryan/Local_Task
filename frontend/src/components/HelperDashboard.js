import React, { useState, useEffect } from 'react';
import TaskItem from './TaskItem';
const API_URL = process.env.REACT_APP_API_URL;

const HelperDashboard = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetch(`${API_URL}/api/helper/tasks`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setTasks(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="container mx-auto">
      <h2 className="text-2xl font-bold mb-4">Tasks You've Applied For</h2>
      {tasks.length ? (
        tasks.map((task) => (
          <TaskItem key={task._id} task={task} type="helper" />
        ))
      ) : (
        <p>No applications found. Start applying for tasks!</p>
      )}
    </div>
  );
};

export default HelperDashboard;
