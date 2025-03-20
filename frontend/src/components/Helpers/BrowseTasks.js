import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Footer from '../Footer';

const categoryImages = {
  Technology: '/images/tech.jpg',
  Marketing: '/images/marketing.jpg',
  design: '/images/design.jpg',
  writing: '/images/writing.jpg',
  Mechanic: '/images/mechanic.jpg',
  Electrician: '/images/electricisan.jpg', // Fixed spelling
  Plumber: '/images/plumbing.jpg',
  Photography: '/images/photo.jpg',
};

const BrowseTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [bookmarkedTasks, setBookmarkedTasks] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const location = useLocation();
  const API_URL = process.env.REACT_APP_API_URL;

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        if (!API_URL) {
          throw new Error('API URL is missing');
        }
        const response = await fetch(`${API_URL}/api/tasks`);
        if (!response.ok) throw new Error('Failed to fetch tasks');
        const data = await response.json();
        setTasks(data);

        // Load bookmarks from localStorage or set all as unbookmarked
        const savedBookmarks = JSON.parse(localStorage.getItem('bookmarkedTasks')) || [];
        setBookmarkedTasks(
          data.map((task) => ({
            taskId: task._id,
            isBookmarked: savedBookmarks.includes(task._id),
          }))
        );
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };

    fetchTasks();
  }, [API_URL]); // API_URL added as a dependency

  useEffect(() => {
    if (tasks.length === 0) return;

    const queryParams = new URLSearchParams(location.search);
    const category = queryParams.get('category');

    if (category && category !== 'All') {
      setFilteredTasks(tasks.filter((task) => task.category === category));
    } else {
      setFilteredTasks(tasks);
    }
  }, [tasks, location.search]);

  const handleContactClick = (task) => {
    setSelectedTask(task);
    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);

  const toggleBookmark = (taskId) => {
    setBookmarkedTasks((prev) =>
      prev.map((item) =>
        item.taskId === taskId ? { ...item, isBookmarked: !item.isBookmarked } : item
      )
    );

    // Update localStorage for bookmark persistence
    setTimeout(() => {
      const updatedBookmarks = bookmarkedTasks
        .filter((item) => item.isBookmarked)
        .map((item) => item.taskId);
      localStorage.setItem('bookmarkedTasks', JSON.stringify(updatedBookmarks));
    }, 100);
  };

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4 sm:p-6 lg:p-8">
        {filteredTasks.length === 0 ? (
          <p className="text-xl font-semibold text-center text-gray-500">
            No tasks available for the selected category.
          </p>
        ) : (
          filteredTasks.map((task) => {
            const isBookmarked = bookmarkedTasks.find((item) => item.taskId === task._id)?.isBookmarked || false;

            return (
              <div
                key={task._id}
                className="card bg-white shadow-lg hover:shadow-2xl transition-all duration-300 rounded-lg"
              >
                <figure className="px-4 pt-4">
                  <img
                    src={categoryImages[task.category] || '/images/default.jpg'} // Default image if category not found
                    alt={task.category}
                    className="rounded-xl w-full h-48 sm:h-64 object-cover"
                  />
                </figure>
                <div className="card-body p-4 text-center">
                  <h2 className="card-title text-xl sm:text-2xl font-semibold text-primary mb-2">{task.title}</h2>
                  <p className="text-base sm:text-lg text-gray-600 mb-2">{task.description}</p>
                  <p className="text-sm text-gray-500 mb-2">Location: {task.location}</p>
                  <p className="text-sm text-gray-500 mb-2">Budget: Rs.{task.budget}</p>
                  <p className="text-sm text-gray-500 mb-4">Category: {task.category}</p>
                  <div className="card-actions justify-between items-center">
                    <button
                      className="btn btn-primary hover:bg-primary-focus hover:scale-105 transition-all duration-200"
                      onClick={() => handleContactClick(task)}
                    >
                      CONTACT
                    </button>
                    <button
                      className={`btn ${isBookmarked ? 'btn-warning' : 'btn-outline'}`}
                      onClick={() => toggleBookmark(task._id)}
                    >
                      {isBookmarked ? 'Unbookmark' : 'Bookmark'}
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Contact Modal */}
      {isModalOpen && selectedTask && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-4 sm:p-6 rounded-lg shadow-lg w-11/12 max-w-md">
            <h3 className="text-xl font-semibold mb-4">Contact the Poster</h3>
            <p>
              <strong>Email:</strong> {selectedTask.email}
            </p>
            <p>
              <strong>Contact No:</strong> {selectedTask.contactNo}
            </p>
            <div className="mt-4 flex justify-end space-x-4">
              <button className="btn btn-secondary" onClick={closeModal}>
                Close
              </button>
              <button
                className="btn btn-primary"
                onClick={() => alert('Feature to contact the seeker will be implemented here')}
              >
                Send Message
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
};

export default BrowseTasks;
