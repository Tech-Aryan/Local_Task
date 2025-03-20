import React, { useState } from 'react';
const API_URL = process.env.REACT_APP_API_URL;

const PostTask = () => {
  const [task, setTask] = useState({
    title: '',
    description: '',
    location: '',
    budget: '',
    category: '',
    email: '',
    contactNo: '',
    priority: 'Normal', // Default priority
    seekerId: 'defaultSeekerId', // You can dynamically change this based on logged-in user
  });

  const handleTaskSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_URL}/api/tasks`, {  // Adjusted endpoint
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(task),
      });

      const data = await response.json();
      if (response.ok) {
        alert('Task posted successfully!');
        setTask({
          title: '',
          description: '',
          location: '',
          budget: '',
          category: '',
          email: '',
          contactNo: '',
          priority: 'Normal',
          seekerId: 'defaultSeekerId',
        });
      } else {
        alert(`Error: ${data.message}`);
      }
    } catch (error) {
      console.error('Error posting task:', error);
      alert('An error occurred while posting the task.');
    }
  };

  return (
    <form
      onSubmit={handleTaskSubmit}
      className="space-y-6 max-w-xl sm:max-w-2xl lg:max-w-4xl mx-auto p-6 sm:p-8 bg-white shadow-lg rounded-lg border border-gray-200"
    >
      <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-primary mb-6 text-center">
        Post a New Task
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* Task Title */}
        <input
          type="text"
          placeholder="Task Title"
          value={task.title}
          onChange={(e) => setTask({ ...task, title: e.target.value })}
          className="input input-bordered w-full"
        />

        {/* Task Location */}
        <input
          type="text"
          placeholder="Location"
          value={task.location}
          onChange={(e) => setTask({ ...task, location: e.target.value })}
          className="input input-bordered w-full"
        />
      </div>

      {/* Task Description */}
      <textarea
        placeholder="Task Description"
        value={task.description}
        onChange={(e) => setTask({ ...task, description: e.target.value })}
        className="textarea textarea-bordered w-full h-32"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* Budget */}
        <input
          type="number"
          placeholder="Budget"
          value={task.budget}
          onChange={(e) => setTask({ ...task, budget: e.target.value })}
          className="input input-bordered w-full"
        />

        {/* Category */}
        <div className="relative w-full">
          <select
            value={task.category}
            onChange={(e) => setTask({ ...task, category: e.target.value })}
            className="select select-bordered w-full max-w-full overflow-hidden"
            style={{
              appearance: 'none', // Hide native dropdown arrow for better styling control
            }}
          >
            <option value="">Select Category</option>
            <option value="Technology">Technology</option>
            <option value="Marketing">Marketing</option>
            <option value="design">Design</option>
            <option value="Mechanic">Mechanic</option>
            <option value="writing">Writing</option>
            <option value="Photography">Photography</option>
            <option value="Electrician">Electrician</option>
            <option value="Plumber">Plumber</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* Email */}
        <input
          type="email"
          placeholder="Your Email"
          value={task.email}
          onChange={(e) => setTask({ ...task, email: e.target.value })}
          required
          className="input input-bordered w-full"
        />

        {/* Contact Number */}
        <input
          type="text"
          placeholder="Your Contact Number"
          value={task.contactNo}
          onChange={(e) => setTask({ ...task, contactNo: e.target.value })}
          required
          className="input input-bordered w-full"
        />
      </div>

      {/* Priority */}
      <select
        value={task.priority}
        onChange={(e) => setTask({ ...task, priority: e.target.value })}
        className="select select-bordered w-full"
      >
        <option value="Normal">Normal</option>
        <option value="Urgent">Urgent</option>
      </select>

      {/* Submit Button */}
      <button
        type="submit"
        className="btn btn-primary w-full py-3 mt-4 hover:bg-primary-focus transition-all duration-200"
      >
        Post Task
      </button>
    </form>
  );
};

export default PostTask;
