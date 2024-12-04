import React from 'react';
import { Link } from 'react-router-dom';
import {  useNavigate } from 'react-router-dom';
import './Header.css'; // Make sure to create a Header.css file for styling

function Header() {
  const navigate = useNavigate(); // This is the new hook in React Router v6 for programmatic navigation

  const handleButtonClick = () => {
    navigate('/'); // Navigate to the login page
  };
  return (
    <header className="header">
      <div className="header-logo">
        <h1 onClick={() => handleButtonClick()}>CSUMS</h1>
      </div>
      <nav className="header-nav">
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/features">Features</Link></li>
        </ul>
      </nav>
      <div className="header-actions">
        <Link to="/login">
        <button className="login-button">Login</button>
        </Link>
      </div>
    </header>
  );
}

export default Header;
