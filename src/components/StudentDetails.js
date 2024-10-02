// src/components/StudentDetails.js

import React from 'react';
import '../styles/StudentDetails.css';

const StudentDetails = () => {
  return (
    <div className="student-details">
      <h2>Student Details</h2>
      <div className="student-info">
        <p><strong>Name:</strong> Hrishabh</p>
        <p><strong>Grade:</strong> 9</p>
        <p><strong>Performance:</strong> good</p>
        <p><strong>Attendance:</strong> 95%</p>
      </div>
    </div>
  );
};

export default StudentDetails;
