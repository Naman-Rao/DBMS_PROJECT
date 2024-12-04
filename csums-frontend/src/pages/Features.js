import React from 'react';
import CloudResourceManagement from '../components/CloudResourceManagement';
import UserAdministration from '../components/UserAdministration';
import JobOrchestration from '../components/JobOrchestration';
import ExpenseManagement from '../components/ExpenseManagement';
import Header from '../components/Header';

function Features() {
  return (
    <div>
      <Header/>
    <div className="features">
      <h2>Features</h2>
      <CloudResourceManagement />
      <UserAdministration />
      <JobOrchestration />
      <ExpenseManagement />
    </div>
    </div>
  );
}

export default Features;
