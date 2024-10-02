// src/components/ClassPerformance.js

import React from 'react';
import BarChart from '../charts/BarChart';
import '../styles/ClassPerformance.css';

const ClassPerformance = () => {
  return (
    <div className="class-performance">
      <h2>Class Performance</h2>
      <BarChart />
    </div>
  );
};

export default ClassPerformance;
