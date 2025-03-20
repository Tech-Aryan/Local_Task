import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Bar, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';

const API_URL = process.env.REACT_APP_API_URL;

// Registering required components for Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedTask, setSelectedTask] = useState(null);

  // Fetch all users and tasks from the backend
  useEffect(() => {
    fetchUsers();
    fetchTasks();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/admin/users`);
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users', error);
    }
  };

  const fetchTasks = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/admin/tasks`);
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks', error);
    }
  };

  const handleUserUpdate = async (e) => {
    e.preventDefault();
    try {
      const updatedUser = {
        name: selectedUser.name,
        email: selectedUser.email,
        role: selectedUser.role,
      };
      await axios.put(`${API_URL}/api/admin/users/${selectedUser._id}`, updatedUser);
      fetchUsers(); // Re-fetch users after update
      setSelectedUser(null); // Close the form
    } catch (error) {
      console.error('Error updating user', error);
    }
  };

  const handleTaskUpdate = async (e) => {
    e.preventDefault();
    try {
      const updatedTask = {
        title: selectedTask.title,
        description: selectedTask.description,
        location: selectedTask.location,
        budget: selectedTask.budget,
        category: selectedTask.category,
      };
      await axios.put(`${API_URL}/api/admin/tasks/${selectedTask._id}`, updatedTask);
      fetchTasks(); // Re-fetch tasks after update
      setSelectedTask(null); // Close the form
    } catch (error) {
      console.error('Error updating task', error);
    }
  };

  const handleUserDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/api/admin/users/${id}`);
      fetchUsers(); // Re-fetch users after deletion
    } catch (error) {
      console.error('Error deleting user', error);
    }
  };

  const handleTaskDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/api/admin/tasks/${id}`);
      fetchTasks(); // Re-fetch tasks after deletion
    } catch (error) {
      console.error('Error deleting task', error);
    }
  };

  // Calculate the number of Seekers and Helpers for the bar graph
  const userRolesCount = users.reduce((acc, user) => {
    if (user.role === 'seeker') {
      acc.seekers += 1;
    } else if (user.role === 'helper') {
      acc.helpers += 1;
    }
    return acc;
  }, { seekers: 0, helpers: 0 });

  // Prepare data for the Bar Chart (Number of Seekers vs Helpers)
  const barChartData = {
    labels: ['Seekers', 'Helpers'],
    datasets: [
      {
        label: 'Number of Users',
        data: [userRolesCount.seekers, userRolesCount.helpers],
        backgroundColor: ['#4F81BD', '#F1C40F'],
        borderColor: ['#4F81BD', '#F1C40F'],
        borderWidth: 1,
      },
    ],
  };

  // Prepare data for the Pie Chart (Task Categories)
  const taskCategoriesCount = tasks.reduce((acc, task) => {
    acc[task.category] = (acc[task.category] || 0) + 1;
    return acc;
  }, {});

  const pieChartData = {
    labels: Object.keys(taskCategoriesCount),
    datasets: [
      {
        label: 'Task Categories',
        data: Object.values(taskCategoriesCount),
        backgroundColor: ['#E74C3C', '#8E44AD', '#3498DB', '#2ECC71'],
      },
    ],
  };

  return (
    <div className="p-6 bg-gray-100 dark:bg-gray-900 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white">Admin Dashboard</h1>
        <button
          className="btn btn-primary"
          onClick={() => document.documentElement.classList.toggle('dark')}
        >
          Toggle Dark Mode
        </button>
      </div>

      {/* Key Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Total Users</h2>
          <p className="text-3xl font-bold text-blue-500">{users.length}</p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Total Tasks</h2>
          <p className="text-3xl font-bold text-green-500">{tasks.length}</p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Active Seekers</h2>
          <p className="text-3xl font-bold text-purple-500">{userRolesCount.seekers}</p>
        </div>
      </div>

      {/* Bar Chart: Number of Seekers vs Helpers */}
      <div className="mb-6 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">User Roles Distribution</h2>
        <div className="chart-container">
          <Bar
            data={barChartData}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: {
                  position: 'top',
                },
              },
            }}
            height={300}
          />
        </div>
      </div>

      {/* Pie Chart: Task Categories */}
      <div className="mb-6 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">Task Categories Distribution</h2>
        <div className="chart-container">
          <Pie
            data={pieChartData}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: {
                  position: 'top',
                },
              },
            }}
            height={300}
          />
        </div>
      </div>

      {/* User List */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">Users</h2>
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user._id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>
                  <button
                    className="btn btn-warning btn-sm mr-2"
                    onClick={() => setSelectedUser(user)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-error btn-sm"
                    onClick={() => handleUserDelete(user._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* User Edit Form */}
      {selectedUser && (
        <div className="mt-6 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Edit User</h3>
          <form onSubmit={handleUserUpdate}>
            <label className="block mb-2 text-gray-900 dark:text-white">Name:</label>
            <input
              type="text"
              value={selectedUser.name}
              onChange={(e) => setSelectedUser({ ...selectedUser, name: e.target.value })}
              className="input input-bordered w-full mb-4"
            />
            <label className="block mb-2 text-gray-900 dark:text-white">Email:</label>
            <input
              type="email"
              value={selectedUser.email}
              onChange={(e) => setSelectedUser({ ...selectedUser, email: e.target.value })}
              className="input input-bordered w-full mb-4"
            />
            <label className="block mb-2 text-gray-900 dark:text-white">Role:</label>
            <select
              value={selectedUser.role}
              onChange={(e) => setSelectedUser({ ...selectedUser, role: e.target.value })}
              className="select select-bordered w-full mb-4"
            >
              <option value="seeker">Seeker</option>
              <option value="helper">Helper</option>
            </select>
            <div className="flex space-x-4">
              <button type="submit" className="btn btn-primary">Update User</button>
              <button type="button" className="btn btn-secondary" onClick={() => setSelectedUser(null)}>Cancel</button>
            </div>
          </form>
        </div>
      )}

      {/* Task List */}
      <div className="mt-10 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">Tasks</h2>
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>Title</th>
              <th>Description</th>
              <th>Budget</th>
              <th>Category</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map(task => (
              <tr key={task._id}>
                <td>{task.title}</td>
                <td>{task.description}</td>
                <td>{task.budget}</td>
                <td>{task.category}</td>
                <td>
                  <button
                    className="btn btn-warning btn-sm w-full"
                    onClick={() => setSelectedTask(task)}
                  >
                    Edit
                  </button>
                </td>
                <td>
                  <button
                    className="btn btn-error btn-sm w-full"
                    onClick={() => handleTaskDelete(task._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Task Edit Form */}
      {selectedTask && (
        <div className="mt-6 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Edit Task</h3>
          <form onSubmit={handleTaskUpdate}>
            <label className="block mb-2 text-gray-900 dark:text-white">Title:</label>
            <input
              type="text"
              value={selectedTask.title}
              onChange={(e) => setSelectedTask({ ...selectedTask, title: e.target.value })}
              className="input input-bordered w-full mb-4"
            />
            <label className="block mb-2 text-gray-900 dark:text-white">Description:</label>
            <input
              type="text"
              value={selectedTask.description}
              onChange={(e) => setSelectedTask({ ...selectedTask, description: e.target.value })}
              className="input input-bordered w-full mb-4"
            />
            <label className="block mb-2 text-gray-900 dark:text-white">Location:</label>
            <input
              type="text"
              value={selectedTask.location}
              onChange={(e) => setSelectedTask({ ...selectedTask, location: e.target.value })}
              className="input input-bordered w-full mb-4"
            />
            <label className="block mb-2 text-gray-900 dark:text-white">Budget:</label>
            <input
              type="number"
              value={selectedTask.budget}
              onChange={(e) => setSelectedTask({ ...selectedTask, budget: e.target.value })}
              className="input input-bordered w-full mb-4"
            />
            <label className="block mb-2 text-gray-900 dark:text-white">Category:</label>
            <input
              type="text"
              value={selectedTask.category}
              onChange={(e) => setSelectedTask({ ...selectedTask, category: e.target.value })}
              className="input input-bordered w-full mb-4"
            />
            <div className="flex space-x-4">
              <button type="submit" className="btn btn-primary">Update Task</button>
              <button type="button" className="btn btn-secondary" onClick={() => setSelectedTask(null)}>Cancel</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;