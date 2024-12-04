import React from 'react';
import {  useNavigate } from 'react-router-dom';
import Header from '../components/Header';

function Home() {
  const navigate = useNavigate(); // This is the new hook in React Router v6 for programmatic navigation

  const handleButtonClick = () => {
    navigate('/login'); // Navigate to the login page
  };
  return (
    <div>
      <Header/>
    <div className="home">
      <h1>Welcome to CSUMS</h1>
      <p>Your Comprehensive Cloud Services and User Management System.</p>
      <button onClick={() => handleButtonClick()}>Go to Login</button>
    </div>
    </div>
  );
}

export default Home;
