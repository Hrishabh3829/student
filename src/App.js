import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import StudentDetails from './components/StudentDetails';
import ClassPerformance from './components/ClassPerformance';
import Login from './components/Login';
import ProtectedRoute from './components/ProtectedRoute';
import './styles/App.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  const handleLogin = (status, adminStatus) => {
    setIsAuthenticated(status);
    setIsAdmin(adminStatus);
  };

  return (
    <Router>
      <div className="app">
        {isAuthenticated && <Navbar />}
        {isAuthenticated && (
          <div className="main-content">
            <Sidebar />
            <div className="content">
              <Routes>
                <Route
                  path="/dashboard"
                  element={
                    <ProtectedRoute isAuthenticated={isAuthenticated}>
                      <Dashboard isAdmin={isAdmin} />
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
                <Route path="*" element={<Navigate to="/dashboard" />} />
              </Routes>
            </div>
          </div>
        )}

        {!isAuthenticated && (
          <Routes>
            <Route path="/" element={<Login onLogin={handleLogin} />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        )}
      </div>
    </Router>
  );
}

export default App;
