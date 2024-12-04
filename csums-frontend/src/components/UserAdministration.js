// UserAdministration.js
import React from 'react';
import './UserAdministration.css';
import { useSpring, animated } from 'react-spring'; 

function UserAdministration() {
  const fadeIn = useSpring({
    from: { opacity: 0, transform: 'translateY(20px)' },
    to: { opacity: 1, transform: 'translateY(0)' },
    config: { tension: 170, friction: 20 },
  });

  return (
    <animated.div style={fadeIn} className="user-administration-container">
      <h2>User Administration</h2>
      <p>
        Manage user roles, permissions, and access control across various cloud services to ensure secure and compliant access.
      </p>
      <div className="admin-features">
        <h3>Key Functionalities</h3>
        <ul>
          <li>Role-Based Access Control: Assign roles to users based on their responsibilities.</li>
          <li>Permission Management: Define what resources and actions users can access.</li>
          <li>User Auditing: Keep track of user activity for compliance and security purposes.</li>
          <li>Multi-Factor Authentication: Enhance security by requiring additional verification.</li>
        </ul>
      </div>
    </animated.div>
  );
}

export default UserAdministration;
