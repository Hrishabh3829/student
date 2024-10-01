import React, { useState } from 'react';
import '../styles/Navbar.css'


const Navbar = () => {
  const [isMobile, setIsMobile] = useState(false);

  return (
    <nav className="navbar">
      <h1 className="logo">Student Analytics</h1>
      <ul className={isMobile ? "nav-links-mobile" : "nav-links"}>
        <li><a href="/">Dashboard</a></li>
        <li><a href="/performance">Class Performance</a></li>
        <li><a href="/details">Student Details</a></li>
      </ul>
      <button className="mobile-menu-icon" onClick={() => setIsMobile(!isMobile)}>
        {isMobile ? <i className="fas fa-times"></i> : <i className="fas fa-bars"></i>}
      </button>
    </nav>
  );
};

export default Navbar;
