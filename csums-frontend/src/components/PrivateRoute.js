import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';

const isTokenExpired = (token) => {
  const decoded = jwtDecode(token);
  const currentTime = Date.now() / 1000; // Current time in seconds
  return decoded.exp < currentTime;
};

const PrivateRoute = () => {
  const token = localStorage.getItem('authToken');
  if (!token || isTokenExpired(token)) {
    // Redirect to login page if token is absent or expired
    return <Navigate to="/login" />;
  }

  return <Outlet />;
};

export default PrivateRoute;