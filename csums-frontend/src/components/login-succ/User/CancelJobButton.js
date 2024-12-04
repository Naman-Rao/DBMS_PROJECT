import React from 'react';
import axios from 'axios';

const CancelJobButton = ({ jobID }) => {
  const handleCancelJob = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/cancel-job', { jobID });
      alert('Job canceled successfully');
    } catch (error) {
      console.error('Error canceling job:', error);
      alert('Error canceling job. Please try again.');
    }
  };

  return <button onClick={handleCancelJob}>Cancel Job</button>;
};

export default CancelJobButton;
