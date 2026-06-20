import React, { useEffect, useState } from 'react';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

function Dashboard({ token, email, onLogout }) {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [error, setError] = useState('');

  const headers = { Authorization: `Bearer ${token}` };

  const fetchTasks = async () => {
    try {
      const response = await axios.get(`${API_URL}/tasks`, { headers });
      setTasks(response.data);
    } catch (err) {
      setError('Failed to load tasks');
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const addTask = async (e) => {
    e.preventDefault();
    setError('');
    if (!title.trim()) return;

    try {
      const response = await axios.post(`${API_URL}/tasks`, { title }, { headers });
      setTasks([response.data, ...tasks]);
      setTitle('');
    } catch (err) {
      setError('Failed to add task');
    }
  };

  const toggleTask = async (task) => {
    try {
      const response = await axios.put(`${API_URL}/tasks/${task._id}`, { completed: !task.completed }, { headers });
      setTasks(tasks.map((t) => (t._id === task._id ? response.data : t)));
    } catch (err) {
      setError('Failed to update task');
    }
  };

  const deleteTask = async (id) => {
    try {
      await axios.delete(`${API_URL}/tasks/${id}`, { headers });
      setTasks(tasks.filter((t) => t._id !== id));
    } catch (err) {
      setError('Failed to delete task');
    }
  };

  return (
    <div className="page">
      <div className="card dashboard">
        <div className="header-row">
          <div>
            <h2>Dashboard</h2>
            <p>Welcome, {email}</p>
          </div>
          <button className="link-button" onClick={onLogout}>Logout</button>
        </div>

        <form onSubmit={addTask} className="task-form">
          <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="New task title" />
          <button type="submit">Add Task</button>
        </form>

        {error && <p className="error">{error}</p>}

        <div className="tasks">
          {tasks.length === 0 ? (
            <p>No tasks yet.</p>
          ) : (
            tasks.map((task) => (
              <div key={task._id} className={`task ${task.completed ? 'completed' : ''}`}>
                <label>
                  <input type="checkbox" checked={task.completed} onChange={() => toggleTask(task)} />
                  {task.title}
                </label>
                <button onClick={() => deleteTask(task._id)}>Delete</button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
