// src/components/Login.js
import React, { useState } from 'react';
import backgroundImage from  './assets/images/background.jpg'; 
import { useNavigate , Link } from 'react-router-dom';
import Header from './Header';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('student'); // Default role is 'student'
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    dob: '',
    email: '',
    department: '',
    section: '',
    country: ''
  });

  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // Placeholder for login submission functionality
    console.log('Username:', username);
    console.log('Password:', password);
    console.log('Role:', role);
    if (role === 'student') {
      console.log('Student Data:', formData);
    } else {
      console.log('Admin Data:', formData); // Admin-specific data handling
    }
    // Send data to backend in a real application
    navigate('')
  };

  const handleRoleChange = (role) => {
    setRole(role);
    setFormData({ ...formData, firstName: '', lastName: '', dob: '', email: '', department: '', section: '', country: '' }); // Reset form when switching roles
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div style={styles.background}>
      <div style={styles.loginBox}>
        <h2 style={styles.heading}>Login</h2>
        <form onSubmit={handleLogin} style={styles.form}>
          <div style={styles.inputContainer}>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              style={styles.input}
            />
          </div>
          <div style={styles.inputContainer}>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={styles.input}
            />
          </div>

          {/* Role Selection with Fancy Toggle Buttons */}
          <div style={styles.roleSelector}>
            <button
              type="button"
              style={role === 'student' ? styles.activeButton : styles.inactiveButton}
              onClick={() => handleRoleChange('student')}
            >
              Student
            </button>
            <button
              type="button"
              style={role === 'admin' ? styles.activeButton : styles.inactiveButton}
              onClick={() => handleRoleChange('admin')}
            >
              Admin
            </button>
          </div>

          {/* Conditional Fields based on Role */}
          {role === 'student' ? (
            <>
              <div style={styles.inputContainer}>
                <input
                  type="text"
                  placeholder="First Name"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  style={styles.input}
                />
              </div>
              <div style={styles.inputContainer}>
                <input
                  type="text"
                  placeholder="Last Name"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  style={styles.input}
                />
              </div>
              <div style={styles.inputContainer}>
                <input
                  type="date"
                  placeholder="Date of Birth"
                  name="dob"
                  value={formData.dob}
                  onChange={handleInputChange}
                  style={styles.input}
                />
              </div>
              <div style={styles.inputContainer}>
                <input
                  type="email"
                  placeholder="Email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  style={styles.input}
                />
              </div>
              <div style={styles.inputContainer}>
                <input
                  type="text"
                  placeholder="Department"
                  name="department"
                  value={formData.department}
                  onChange={handleInputChange}
                  style={styles.input}
                />
              </div>
              <div style={styles.inputContainer}>
                <input
                  type="text"
                  placeholder="Section"
                  name="section"
                  value={formData.section}
                  onChange={handleInputChange}
                  style={styles.input}
                />
              </div>
              <div style={styles.inputContainer}>
                <input
                  type="text"
                  placeholder="Country"
                  name="country"
                  value={formData.country}
                  onChange={handleInputChange}
                  style={styles.input}
                />
              </div>
            </>
          ) : (
            <>
              <div style={styles.inputContainer}>
                <input
                  type="text"
                  placeholder="First Name"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  style={styles.input}
                />
              </div>
              <div style={styles.inputContainer}>
                <input
                  type="text"
                  placeholder="Last Name"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  style={styles.input}
                />
              </div>
              <div style={styles.inputContainer}>
                <input
                  type="email"
                  placeholder="Email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  style={styles.input}
                />
              </div>
              {/* You can add additional admin-specific fields here */}
            </>
          )}

          <div style={styles.options}>
            <label>
              <input type="checkbox" /> Remember me
            </label>
            <a href="#" style={styles.link}>Forgot password?</a>
          </div>
          <Link to="/admhub/account"><button type="submit" style={styles.loginButton}>Login</button></Link>
          <p style={styles.register}>
            Don't have an account? <a href="#" style={styles.link}>Register</a>
          </p>
        </form>
      </div>
    </div>
  );
};

const styles = {
  background: {
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    background: `url(${backgroundImage}) no-repeat center center`,

    backgroundSize: 'cover',
  },
  loginBox: {
    width: '300px',
    padding: '50px',
    borderRadius: '12px',
    background: 'rgba(255, 255, 255, 0.15)',
    backdropFilter: 'blur(10px)',
    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
    textAlign: 'center',
    color: '#fff',
  },
  heading: {
    marginBottom: '20px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  inputContainer: {
    marginBottom: '15px',
    width: '100%',
  },
  input: {
    width: '100%',
    padding: '10px',
    borderRadius: '5px',
    border: 'none',
    outline: 'none',
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    color: '#fff',
    fontSize: '16px',
  },
  options: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
    color: '#fff',
    fontSize: '14px',
  },
  link: {
    color: '#ffb6b9',
    textDecoration: 'none',
  },
  loginButton: {
    width: '100%',
    padding: '10px',
    borderRadius: '5px',
    backgroundColor: '#ffb6b9',
    border: 'none',
    color: '#fff',
    fontSize: '16px',
    cursor: 'pointer',
    marginTop: '15px',
  },
  register: {
    marginTop: '20px',
    fontSize: '14px',
  },
  roleSelector: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '20px',
  },
  activeButton: {
    backgroundColor: '#ffb6b9',
    color: '#fff',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '5px 5px 0 0',
    cursor: 'pointer',
    fontSize: '16px',
    width: '100px',
  },
  inactiveButton: {
    backgroundColor: '#fff',
    color: '#654ea3',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '5px 5px 0 0',
    cursor: 'pointer',
    fontSize: '16px',
    width: '100px',
  },
};



export default Login;
