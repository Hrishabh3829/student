import React from 'react';
import BarChart from '../charts/BarChart';

const Dashboard = ({ isAdmin }) => {
  return (
    <div>
      {isAdmin ? (
        <h2>Welcome, Admin!</h2>
      ) : (
        <><h2>Welcome, User!</h2><BarChart /></>
      )}
    </div>
  );
};

export default Dashboard;
