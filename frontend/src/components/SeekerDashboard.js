import React, { useState, useEffect } from 'react';
import TaskItem from './TaskItem';
const API_URL = process.env.REACT_APP_API_URL;

const SeekerDashboard = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetch(`${API_URL}/api/seeker/tasks`, {
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
      <h2 className="text-2xl font-bold mb-4">Your Posted Tasks</h2>
      {tasks.length ? (
        tasks.map((task) => (
          <TaskItem key={task._id} task={task} type="seeker" />
        ))
      ) : (
        <p>No tasks found. Post your first task!</p>
      )}
    </div>
  );
};

export default SeekerDashboard;
