import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Features from './pages/Features';
import Login from './components/Login';
import './App.css';
import AdminDashboard from './components/login-succ/Admin/Admin';
import PrivateRoute from './components/PrivateRoute';
import UserDashboard from './components/login-succ/User/User';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/features" element={<Features />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin-dashboard" element={<PrivateRoute />}>
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
        </Route>
      
        <Route path="/user-dashboard" element={<PrivateRoute />}>
          <Route path="/user-dashboard" element={<UserDashboard />} />
        </Route>
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
