// src/components/StudentDetails.js

import React from 'react';
import '../styles/StudentDetails.css';

const StudentDetails = () => {
  const students = [
    { name: "Hrishabh", grade: 9, performance: "Good", attendance: "95%" },
    { name: "Summit", grade: 9.8, performance: "Excellent", attendance: "95%" },
  ];

  return (
    <div className="student-details">
      <h2>Student Details</h2>
      <div className="student-info">
        {students.map((student, index) => (
          <div key={index} className="student-card">
            <p><strong>Name:</strong> {student.name}</p>
            <p><strong>Grade:</strong> {student.grade}</p>
            <p><strong>Performance:</strong> {student.performance}</p>
            <p><strong>Attendance:</strong> {student.attendance}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StudentDetails;
