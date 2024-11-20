import React, { useState } from 'react';
import './Account.css';

export default function Account() {
  const [formData, setFormData] = useState({
    userID: '',
    firstName: '',
    lastName: '',
    dob: '',
    regID: '',
    accountID: '',
    username: '',
    password: '',
    country: '',
    mailID: '',
    billingID: ''
  });

  const [rows, setRows] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add form data to the table rows
    setRows([...rows, formData]);
    // Clear form fields
    setFormData({
      userID: '',
      firstName: '',
      lastName: '',
      dob: '',
      regID: '',
      accountID: '',
      username: '',
      password: '',
      country: '',
      mailID: '',
      billingID: ''
    });
  };

  return (
    <div className="account-container">
      <h1 className="account-header">Account Form</h1>

      {/* Form container */}
      <div className="form-container">
        <h3>Create Account</h3>
        <form className="form" onSubmit={handleSubmit}>
          <label className="form-label" htmlFor="userID">UserID:</label>
          <input
            className="form-input"
            type="text"
            id="userID"
            name="userID"
            value={formData.userID}
            onChange={handleChange}
          />
          <label className="form-label" htmlFor="firstName">First Name:</label>
          <input
            className="form-input"
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
          />
          <label className="form-label" htmlFor="lastName">Last Name:</label>
          <input
            className="form-input"
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
          />
          <label className="form-label" htmlFor="dob">Date of Birth:</label>
          <input
            className="form-input"
            type="date"
            id="dob"
            name="dob"
            value={formData.dob}
            onChange={handleChange}
          />
          <label className="form-label" htmlFor="regID">RegID:</label>
          <input
            className="form-input"
            type="text"
            id="regID"
            name="regID"
            value={formData.regID}
            onChange={handleChange}
          />
          <label className="form-label" htmlFor="accountID">AccountID:</label>
          <input
            className="form-input"
            type="text"
            id="accountID"
            name="accountID"
            value={formData.accountID}
            onChange={handleChange}
          />
          <label className="form-label" htmlFor="username">Username:</label>
          <input
            className="form-input"
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
          />
          <label className="form-label" htmlFor="password">Password:</label>
          <input
            className="form-input"
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
          <label className="form-label" htmlFor="country">Country:</label>
          <input
            className="form-input"
            type="text"
            id="country"
            name="country"
            value={formData.country}
            onChange={handleChange}
          />
          <label className="form-label" htmlFor="mailID">MailID:</label>
          <input
            className="form-input"
            type="email"
            id="mailID"
            name="mailID"
            value={formData.mailID}
            onChange={handleChange}
          />
          <label className="form-label" htmlFor="billingID">BillingID:</label>
          <input
            className="form-input"
            type="text"
            id="billingID"
            name="billingID"
            value={formData.billingID}
            onChange={handleChange}
          />
          <button type="submit" className="submit-button">Submit</button>
        </form>
      </div>

      {/* Table to display user and account details */}
      <h3 className="table-header">User and Account Information Table</h3>
      <div className="account-table-container">
        <table className="account-table">
          <thead>
            <tr>
              <th>UserID</th>
              <th>FirstName</th>
              <th>LastName</th>
              <th>DateOfBirth</th>
              <th>RegID</th>
              <th>AccountID</th>
              <th>Username</th>
              <th>Password</th>
              <th>Country</th>
              <th>MailID</th>
              <th>BillingID</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, index) => (
              <tr key={index}>
                <td>{row.userID}</td>
                <td>{row.firstName}</td>
                <td>{row.lastName}</td>
                <td>{row.dob}</td>
                <td>{row.regID}</td>
                <td>{row.accountID}</td>
                <td>{row.username}</td>
                <td>{row.password}</td>
                <td>{row.country}</td>
                <td>{row.mailID}</td>
                <td>{row.billingID}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
