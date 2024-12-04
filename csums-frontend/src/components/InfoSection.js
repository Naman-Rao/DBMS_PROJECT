import React from 'react';
import './InfoSection.css';

const InfoSection = () => {
  return (
    <section className="info-section">
      <aside className="sidebar">
        <ul>
          <li>Definition of ERP</li>
          <li>What is an ERP system?</li>
          <li>ERP fundamentals</li>
          <li>The business value of ERP</li>
          <li>A brief history of ERP</li>
          <li>ERP deployment models</li>
        </ul>
      </aside>
      <article className="content">
        <h2>Definition of Enterprise Resource Planning (ERP)</h2>
        <p>
          Enterprise resource planning (ERP) refers to a type of software that 
          organizations use to manage day-to-day business activities such as 
          accounting, procurement, project management, and supply chain operations.
        </p>
        <p>
          A complete ERP suite also includes enterprise performance management, 
          software that helps plan, budget, predict, and report on an organization’s 
          financial results.
        </p>
      </article>
    </section>
  );
};

export default InfoSection;
