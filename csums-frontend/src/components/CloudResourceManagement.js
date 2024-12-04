// CloudResourceManagement.js
import React from 'react';
import { useSpring, animated } from 'react-spring';
import './CloudResourceManagement.css';

function CloudResourceManagement() {
  // Animation for title fade-in
  const titleSpring = useSpring({
    from: { opacity: 0, transform: 'translateY(-20px)' },
    to: { opacity: 1, transform: 'translateY(0)' },
    config: { tension: 170, friction: 26 },
    delay: 100,
  });

  // Animation for paragraph fade-in
  const paragraphSpring = useSpring({
    from: { opacity: 0, transform: 'translateY(20px)' },
    to: { opacity: 1, transform: 'translateY(0)' },
    config: { tension: 170, friction: 26 },
    delay: 300,
  });

  // Animation for features list
  const listSpring = useSpring({
    from: { opacity: 0, transform: 'translateX(-20px)' },
    to: { opacity: 1, transform: 'translateX(0)' },
    config: { tension: 170, friction: 26 },
    delay: 500,
  });

  return (
    <div className="cloud-resource-management-container">
      <animated.h1 style={titleSpring}>Cloud Resource Management</animated.h1>
      <animated.p style={paragraphSpring}>
        Our Cloud Resource Management solution offers comprehensive control over cloud resources,
        enabling provisioning, monitoring, and scaling across platforms like AWS, Azure, and GCP. 
        This system ensures efficient cloud utilization and seamless scaling to meet organizational needs.
      </animated.p>

      <animated.div style={listSpring}>
        <h2>Key Capabilities</h2>
        <ul>
          <li>Provision and configure resources with a single dashboard.</li>
          <li>Monitor resource usage in real-time for informed decisions.</li>
          <li>Scale resources seamlessly across cloud platforms.</li>
          <li>Automate backup and recovery processes.</li>
        </ul>
      </animated.div>
    </div>
  );
}

export default CloudResourceManagement;
