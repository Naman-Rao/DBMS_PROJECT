// ExpenseManagement.js
import React from 'react';
import { useSpring, animated } from 'react-spring';
import './ExpenseManagement.css';

function ExpenseManagement() {
  // Animation for title fade-in
  const titleSpring = useSpring({
    from: { opacity: 0, transform: 'translateY(-20px)' },
    to: { opacity: 1, transform: 'translateY(0)' },
    config: { tension: 170, friction: 26 },
    delay: 200,
  });

  // Animation for paragraph fade-in
  const paragraphSpring = useSpring({
    from: { opacity: 0, transform: 'translateY(20px)' },
    to: { opacity: 1, transform: 'translateY(0)' },
    config: { tension: 170, friction: 26 },
    delay: 400,
  });

  // Animation for list items
  const listSpring = useSpring({
    from: { opacity: 0, transform: 'translateX(-20px)' },
    to: { opacity: 1, transform: 'translateX(0)' },
    config: { tension: 170, friction: 26 },
    delay: 600,
  });

  return (
    <div className="expense-management-container">
      <animated.h1 style={titleSpring}>Expense Management</animated.h1>
      <animated.p style={paragraphSpring}>
        Effective expense management is key to controlling and optimizing cloud costs.
        Our system provides real-time tracking, budgeting, and forecasting tools to help
        you stay on top of cloud expenses and make cost-effective decisions.
      </animated.p>

      <animated.div style={listSpring}>
        <h2>Key Features</h2>
        <ul>
          <li>Real-time tracking of expenses across AWS, Azure, and GCP.</li>
          <li>Budgeting tools to help set and control cloud spending limits.</li>
          <li>Cost forecasting to assist in financial planning and decision-making.</li>
          <li>Detailed expense reports to analyze and optimize resource usage.</li>
        </ul>
      </animated.div>
    </div>
  );
}

export default ExpenseManagement;
