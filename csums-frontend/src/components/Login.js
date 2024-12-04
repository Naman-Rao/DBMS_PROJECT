import React, { useState } from 'react';
import backgroundImage from './assets/images/background.jpg';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import {jwtDecode} from 'jwt-decode';
import Header from './Header';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user'); // Default role is 'user'
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    dob: '',
    email: '',
    country: '',
    age: '',
    roleTitle: '',
    balance:'',
  });
  const [isLoginMode, setIsLoginMode] = useState(true); // State to toggle between Login and Register views
  const navigate = useNavigate();

  // Handle form data changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle login submission
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // Send login request to backend
      const response = await axios.post('http://localhost:5000/api/login', {
        username,
        password,
        role,
      });

      // Handle successful login
      if (response.data.token) {
        // Store the JWT token in localStorage
        localStorage.setItem('authToken', response.data.token);

        // Optionally, decode the token to get user details (like role and ID)
        const decodedToken = jwtDecode(response.data.token);
        const userRole = decodedToken.role;

        // Redirect based on user role
        if (userRole === 'admin') {
          // Store admin ID if needed
          localStorage.setItem('adminID', decodedToken.id);
          // Redirect to Admin Dashboard
          navigate('/admin-dashboard');
        } else {
          // Store account ID if needed
          localStorage.setItem('accountID', decodedToken.id);
          // Redirect to User Dashboard
          navigate('/user-dashboard');
        }
      } else {
        alert('Login failed. Please check your credentials.');
      }
    } catch (err) {
      console.error('Login failed:', err);
      alert('Login failed. Please check your credentials.');
    }
  };


  // Handle user registration submission
  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/register', {
        username,
        password,
        role,
        mailID:formData.email,
        ...formData, // Send form data (FirstName, LastName, DateOfBirth, etc.)
      });

      // Handle successful registration
      console.log('Registration successful:', response.data);
      alert('Registration successful');
      setIsLoginMode(true); // Switch back to login mode after successful registration
    } catch (err) {
      console.error('Registration failed:', err);
      alert('Registration failed. Please try again.');
    }
  };

  // Handle admin registration submission
  const handleAdminRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/registerAdmin', {
        username,
        password,
        role,
        mailID: formData.email,
        roleTitle: formData.roleTitle,
        age: formData.age,
      });

      // Handle successful admin registration
      console.log('Admin Registration successful:', response.data);
      alert('Admin Registered successfully');
      setIsLoginMode(true); // Switch back to login mode after successful registration
    } catch (err) {
      console.error('Admin Registration failed:', err);
      alert('Admin Registration failed. Please try again.');
    }
  };

  // Toggle between Login and Register mode
  const toggleFormMode = () => {
    setIsLoginMode(!isLoginMode);
  };

  return (
    <div>
      <Header/>
    <div style={styles.background}>
      <div style={styles.loginBox}>
        <h2 style={styles.heading}>{isLoginMode ? 'Login' : 'Register'}</h2>
        <form
          onSubmit={isLoginMode ? handleLogin : role === 'admin' ? handleAdminRegister : handleRegister}
          style={styles.form}
        >
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
              style={role === 'user' ? styles.activeButton : styles.inactiveButton}
              onClick={() => setRole('user')}
            >
              User
            </button>
            <button
              type="button"
              style={role === 'admin' ? styles.activeButton : styles.inactiveButton}
              onClick={() => setRole('admin')}
            >
              Admin
            </button>
          </div>

          {/* Conditional Fields based on Mode */}
          {!isLoginMode && role === 'user' && (
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
                  placeholder="Country"
                  name="country"
                  value={formData.country}
                  onChange={handleInputChange}
                  style={styles.input}
                />
              </div>
              <div style={styles.inputContainer}>
                <input
                  type="number"
                  step="0.01"
                  placeholder="Balance"
                  name="balance"  
                  value={formData.balance}  
                  onChange={handleInputChange}
                  style={styles.input}
                />
              </div>
            </>
          )}

          {/* Fields for Admin Registration */}
          {!isLoginMode && role === 'admin' && (
            <>
              <div style={styles.inputContainer}>
                <input
                  type="text"
                  placeholder="Role Title"
                  name="roleTitle"
                  value={formData.roleTitle}
                  onChange={handleInputChange}
                  style={styles.input}
                />
              </div>
              <div style={styles.inputContainer}>
                <input
                  type="number"
                  placeholder="Age"
                  name="age"
                  value={formData.age}
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
            </>
          )}

          {/* <div style={styles.options}>
            <label>
              <input type="checkbox" /> Remember me
            </label>
            <a href="#" style={styles.link}>Forgot password?</a>
          </div> */}

          <button type="submit" style={styles.loginButton}>{isLoginMode ? 'Login' : 'Register'}</button>
          
          <p style={styles.register}>
            {isLoginMode ? (
              <>
                Don't have an account? <a href="#" onClick={toggleFormMode} style={styles.link}>Register</a>
              </>
            ) : (
              <>
                Already have an account? <a href="#" onClick={toggleFormMode} style={styles.link}>Login</a>
              </>
            )}
          </p>
        </form>
      </div>
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
