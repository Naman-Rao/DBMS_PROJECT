import React from 'react';
import './MainContent.css';

const MainContent = () => {
  return (
    <main className="main-content">
      <h1>What is ERP?</h1>
      <p>
        See the industry-leading enterprise resource planning (ERP) cloud solution, 
        serving as your integrated management of business processes and applications.
      </p>
      <div className="buttons">
        <button className="tour-btn">Take an ERP product tour</button>
        <button className="steps-btn">ERP implementation steps</button>
      </div>
    </main>
  );
};

export default MainContent;
