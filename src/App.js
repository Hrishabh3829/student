// src/App.js

import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import StudentDetails from './components/StudentDetails';
import ClassPerformance from './components/ClassPerformance';
import Login from './components/Login';
import Admin from './components/Admin';
import ProtectedRoute from './components/ProtectedRoute'; // For protecting routes
import './styles/App.css';

function App() {
  // State to manage if the user is authenticated
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Handle login, set authentication status to true
  const handleLogin = (status) => {
    setIsAuthenticated(status);
  };

  return (
    <Router>
      <div className="app">
        {/* Conditionally render Navbar and Sidebar only if user is authenticated */}
        {isAuthenticated && <Navbar />}
        {isAuthenticated && (
          <div className="main-content">
            <Sidebar />
            <div className="content">
              <Routes>
                {/* Routes for authenticated users */}
                <Route
                  path="/dashboard"
                  element={
                    <ProtectedRoute isAuthenticated={isAuthenticated}>
                      <Dashboard />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/student-details"
                  element={
                    <ProtectedRoute isAuthenticated={isAuthenticated}>
                      <StudentDetails />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/class-performance"
                  element={
                    <ProtectedRoute isAuthenticated={isAuthenticated}>
                      <ClassPerformance />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/admin"
                  element={
                    <ProtectedRoute isAuthenticated={isAuthenticated}>
                      <Admin />
                    </ProtectedRoute>
                  }
                />
                {/* Fallback route for authenticated users */}
                <Route path="*" element={<Navigate to="/dashboard" />} />
              </Routes>
            </div>
          </div>
        )}

        {/* Display login if not authenticated */}
        {!isAuthenticated && (
          <Routes>
            <Route path="/" element={<Login onLogin={handleLogin} />} />
            {/* Redirect any authenticated page back to login */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        )}
      </div>
    </Router>
  );
}

export default App;
