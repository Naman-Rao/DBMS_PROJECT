import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AddJobForm = ({ userID }) => {
  const [jobName, setJobName] = useState('');
  const [selectedClusterID, setSelectedClusterID] = useState('');
  const [services, setServices] = useState([]);
  const [serviceID, setServiceID] = useState('');
  const [message, setMessage] = useState('');
  const [clusters, setClusters] = useState([]);

  axios.get('http://localhost:5000/api/services')
      .then(response => setServices(response.data))
      .catch(err => console.error('Error fetching services:', err));

  axios.get('http://localhost:5000/api/clusters')
      .then(response => setClusters(response.data))
      .catch(err => console.error('Error fetching clusters:', err));

  const handleAddJob = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/add-job', {
        jobName,
        selectedClusterID,
        serviceID,
        userID,
      });
      setMessage('Job added successfully!');
    } catch (error) {
      console.error('Error adding job:', error);
      setMessage('Error adding job. Please try again.');
    }
  };

  return (
    <div>
      <h2>Add New Job</h2>
      <form onSubmit={handleAddJob}>
        <div>
          <label>Job Name:</label>
          <input
            type="text"
            value={jobName}
            onChange={(e) => setJobName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Cluster ID:</label>
          <select 
            value={selectedClusterID} 
            onChange={(e) => setSelectedClusterID(e.target.value)} 
            required
          >
            <option value="">Select Cluster</option>
            {clusters.map(cluster => (
              <option key={cluster.ClusterID} value={cluster.ClusterID}>
               ({cluster.ClusterID})
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Service ID:</label>
          <select 
            value={serviceID} 
            onChange={(e) => setServiceID(e.target.value)} 
            required
          >
            <option value="">Select Service</option>
            {services.map(service => (
              <option key={service.ServiceID} value={service.ServiceID}>
               ({service.ServiceID})
              </option>
            ))}
          </select>
        </div>
        <button type="submit">Add Job</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default AddJobForm;
