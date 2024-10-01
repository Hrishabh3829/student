import React from 'react';
import './App.css';
import Dashboard from './components/Dashboard.js';
import Navbar from './components/Navbar.js';

function App() {
  return (
    <div className="App">
      <Navbar/>
      <Dashboard />
    </div>
  );
}

export default App;
