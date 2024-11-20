// JobOrchestration.js
import React from 'react';
import { useSpring, animated } from 'react-spring';
import './JobOrchestration.css';

function JobOrchestration() {
  // Animation for text fade-in
  const textSpring = useSpring({
    from: { opacity: 0, transform: 'translateY(20px)' },
    to: { opacity: 1, transform: 'translateY(0)' },
    config: { tension: 170, friction: 26 },
    delay: 200,
  });

  // Animation for list items
  const listSpring = useSpring({
    from: { opacity: 0, transform: 'translateX(-20px)' },
    to: { opacity: 1, transform: 'translateX(0)' },
    config: { tension: 170, friction: 26 },
    delay: 500,
  });

  return (
    <div className="job-orchestration-container">
      <animated.h1 style={textSpring}>Job Orchestration</animated.h1>
      <animated.p style={textSpring}>
        Job orchestration is a critical component for automating tasks and workflows
        across cloud platforms. This system improves operational efficiency by coordinating
        multiple jobs and handling complex dependencies.
      </animated.p>

      <animated.div style={listSpring}>
        <h2>Main Functions</h2>
        <ul>
          <li>Automate routine tasks across platforms like AWS, Azure, and GCP.</li>
          <li>Enable cross-platform workflows to enhance productivity.</li>
          <li>Manage dependencies and ensure efficient task execution.</li>
          <li>Improve monitoring and error handling for orchestration tasks.</li>
        </ul>
      </animated.div>
    </div>
  );
}

export default JobOrchestration;
