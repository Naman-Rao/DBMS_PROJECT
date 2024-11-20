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
          <li><Link to="/admhub/Billing">Billing Details</Link></li>
          <li><Link to="/admhub/JobScheduler">Schedule Jobs</Link></li>
          <li><Link to="/admhub/Service">Services</Link></li>
          <li><Link to="/admhub/Cluster">Cluster Details</Link></li>
          <li><Link to="/admhub/Logs">Check Logs</Link></li>
        </ul>
      </nav>
      <div className="header-actions">
        
      </div>
    </header>
  );
}

export default AdmHeader;
