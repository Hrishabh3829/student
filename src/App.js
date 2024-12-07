import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Admin from './components/Admin';
import Home from './components/Adminpage/Home'
import StudentProfile from './components/Adminpage/StudentProfile'
import Courses from './components/Adminpage/Courses'
import Settings from './components/Adminpage/Settings'
import StudentAttendance from "./components/Adminpage/Student-attendance";
import StudentReport from "./components/Adminpage/StudentReport";
import Integrations from "./components/Adminpage/Integrations";
import About from "./components/Adminpage/About";


const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/admin" element={<Admin />} />
                <Route path="/home" element={<Home />} />
                <Route path="/student" element={<StudentProfile />} />
                <Route path="/courses" element={<Courses />} />
                <Route path="/reports/student-report" element={<StudentReport />} />
                <Route path="/reports/student-attendance" element={<StudentAttendance />} />
                <Route path="/integrations" element={<Integrations />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/About" element={<About />} />
            </Routes>
        </Router>
    );
};

export default App;
