import React from 'react';
import '../styles/Dashboard.css';

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <div className="card">Overall Performance</div>
      <div className="card">Recent Activity</div>
      <div className="card">Student Rankings</div>
    </div>
  );
};

export default Dashboard;
