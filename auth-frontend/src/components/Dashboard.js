import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';

const Dashboard = () => {
  const navigate = useNavigate();
  const username = localStorage.getItem('username');

  // Check if user is authenticated
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('username');
    navigate('/login');
  };

  return (
    <div className="dashboard">
      <h1>Welcome, {username}!</h1>
      <p>You have successfully logged in.</p>
      <button onClick={handleLogout} className="logout-btn">
        Logout
      </button>
    </div>
  );
};

export default Dashboard;