// About.js
import React, { useEffect } from 'react';
import './About.css';
import AOS from 'aos';
import 'aos/dist/aos.css'; // Import AOS styles

function About() {
  
  useEffect(() => {
    AOS.init({
      duration: 1000, // Animation duration in milliseconds
      once: true, // Animation only occurs once while scrolling down
    });
  }, []);

  return (
    <div className="about-container">
      
      <h1 data-aos="fade-up">About Cloud Services and User Management System (CSUMS)</h1>
      <p data-aos="fade-up">
        The Cloud Services and User Management System (CSUMS) provides an integrated solution for managing and optimizing cloud resources across multiple platforms, including AWS, Azure, and GCP. Our system allows organizations to streamline operations by centralizing cloud resource management, user administration, job orchestration, and expense management.
      </p>
      
      <section className="features">
        <h2 data-aos="fade-up">Key Features</h2>
        <ul>
          <li data-aos="fade-up">
            <strong>Cloud Resource Management:</strong> Provision, monitor, and scale resources across AWS, Azure, and GCP, enabling efficient cloud resource utilization.
          </li>
          <li data-aos="fade-up">
            <strong>User Administration:</strong> Manage user roles, permissions, and access control across various cloud services to ensure secure and compliant access.
          </li>
          <li data-aos="fade-up">
            <strong>Job Orchestration:</strong> Automate tasks and workflows across multiple cloud platforms, improving operational efficiency.
          </li>
          <li data-aos="fade-up">
            <strong>Expense Management:</strong> Track, analyze, and optimize costs associated with cloud usage, helping you stay within budget.
          </li>
        </ul>
      </section>
      
      <section className="ui-description">
        <h2 data-aos="fade-up">User Interface</h2>
        <p data-aos="fade-up">
          CSUMS features a web-based dashboard accessible through standard web browsers, providing an intuitive and responsive interface designed to cater to both novice and advanced users. The interface includes dashboard widgets for real-time monitoring, a navigation menu for easy access to system modules, and interactive forms for managing accounts and permissions.
        </p>
      </section>
      
      <section className="tech-stack">
        <h2 data-aos="fade-up">Technical Interfaces</h2>
        <p data-aos="fade-up">
          The system integrates with major cloud service providers via their APIs for provisioning and management, supports LDAP or Active Directory for authentication, and can interact with third-party billing and monitoring tools. Secure communication is ensured through HTTPS and RESTful APIs.
        </p>
      </section>
    </div>
  );
}

export default About;
