import React from 'react';
import { Link } from 'react-router-dom';

function AdmHeader() {
  return (
    <header className="header">
      <div className="header-logo">
        <h1>CSUMS</h1>
      </div>
      <nav className="header-nav">
        <ul>
          <li><Link to="/admhub/account">Account</Link></li>
          <li><Link to="/about">Billing Details</Link></li>
          <li><Link to="/features">Schedule Jobs</Link></li>
          <li><Link to="/pricing">Services</Link></li>
          <li><Link to="/support">Cluster Details</Link></li>
          <li><Link to="/contact">Check Logs</Link></li>
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

export default AdmHeader;
