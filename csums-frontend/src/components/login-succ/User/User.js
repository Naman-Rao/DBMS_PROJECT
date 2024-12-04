import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AddJobForm from './AddJobForm';
import CancelJobButton from './CancelJobButton';
import Header from '../../Header';

const UserDashboard = () => {
  const [userInfo, setUserInfo] = useState({});
  const [runningJobs, setRunningJobs] = useState([]);
  const [totalCost, setTotalCost] = useState(0);

  const accountID = localStorage.getItem('accountID');

  useEffect(() => {
    // Fetch user information
    axios.get(`http://localhost:5000/api/user-info/${accountID}`)
      .then(response => {
        setUserInfo(response.data);
      })
      .catch(error => console.error('Error fetching user info:', error));

    // Fetch running jobs
    axios.get(`http://localhost:5000/api/running-jobs/${accountID}`)
      .then(response => {
        setRunningJobs(response.data);
      })
      .catch(error => console.error('Error fetching running jobs:', error));

    // Fetch total cost
    axios.get(`http://localhost:5000/api/total-cost/${accountID}`)
      .then(response => {
        setTotalCost(response.data.totalCost);
      })
      .catch(error => console.error('Error fetching total cost:', error));
  }, [accountID]);


  return (
    <div>
      <Header/>
      <h1>User Dashboard</h1>
      <h2>User Information</h2>
      <p>First Name: {userInfo.FirstName}</p>
      <p>Last Name: {userInfo.LastName}</p>
      <p>Date Of Bith: {userInfo.DateOfBirth}</p>
      <p>Registration ID: {userInfo.RegID}</p>
      <p>Billing ID: {userInfo.BillingID}</p>
      <p>Email: {userInfo.MailID}</p>
      <p>Balance: {userInfo.Balance}</p>
      <h2>Running Jobs</h2>
      {runningJobs.length === 0 ? <p>No active jobs.</p> : (
        <ul>
          {runningJobs.map(job => (
            <li key={job.JobID}>
              {job.JobName} - Status: {job.Status} - Cluster: {job.ClusterID} - Price: ${job.Price}
              <CancelJobButton jobID={job.JobID} />
            </li>
          ))}
        </ul>
      )}

      <h2>Total Cost</h2>
      <p>Total cost for active jobs: ${totalCost}</p>

      {/* Add logic for adding a job */}
      {/* <AddJobForm accountID={accountID} />
      <br></br>
      <br></br>
      <br></br>
      <br></br> */}

    </div>
  );
};

export default UserDashboard;
