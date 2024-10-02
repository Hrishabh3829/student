// src/components/Dashboard.js

import React from 'react';
import BarChart from '../charts/BarChart';

const Dashboard = () => {
  return (
    <div className="dashboard">
      <h2>Class Performance Overview</h2>
      <div className="chart-container">
        <BarChart />
      </div>
    </div>
  );
};

export default Dashboard;
