// src/components/Sidebar.js

import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/SideBar.css';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <ul>
        <li><Link to="/dashboard">Dashboard</Link></li>
        <li><Link to="/student-details">Student Details</Link></li>
        <li><Link to="/class-performance">Class Performance</Link></li>
      </ul>
    </div>
  );
};

export default Sidebar;
