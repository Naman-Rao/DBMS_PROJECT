import React, { useState } from "react";
import "./Billing.css";

export default function Billing() {
  const [formData, setFormData] = useState({
    BillingID: "",
    Cost: "",
    Pending: "NO",
    Status: "QUEUED",
    Duration: "",
  });

  const [tableData, setTableData] = useState([]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setTableData([...tableData, formData]);
    setFormData({
      BillingID: "",
      Cost: "",
      Pending: "NO",
      Status: "QUEUED",
      Duration: "",
    });
  };

  return (
    <div className="billing-container">
      <h1 className="billing-header">Subscription and Billing</h1>

      <div className="billing-form-container">
        <form className="billing-form" onSubmit={handleSubmit}>
          <h3>Enter Subscription and Billing Details</h3>

          <label className="billing-form-label" htmlFor="BillingID">
            Billing ID
          </label>
          <input
            className="billing-form-input"
            type="text"
            id="BillingID"
            name="BillingID"
            value={formData.BillingID}
            onChange={handleInputChange}
            required
          />

          <label className="billing-form-label" htmlFor="Cost">
            Cost
          </label>
          <input
            className="billing-form-input"
            type="number"
            id="Cost"
            name="Cost"
            value={formData.Cost}
            onChange={handleInputChange}
            required
          />

          <label className="billing-form-label" htmlFor="Pending">
            Pending
          </label>
          <select
            className="billing-form-input"
            id="Pending"
            name="Pending"
            value={formData.Pending}
            onChange={handleInputChange}
            required
          >
            <option value="YES">YES</option>
            <option value="NO">NO</option>
          </select>

          <label className="billing-form-label" htmlFor="Status">
            Status
          </label>
          <select
            className="billing-form-input"
            id="Status"
            name="Status"
            value={formData.Status}
            onChange={handleInputChange}
            required
          >
            <option value="QUEUED">QUEUED</option>
            <option value="PAUSED">PAUSED</option>
            <option value="KILLED">KILLED</option>
            <option value="ACTIVE">ACTIVE</option>
            <option value="INACTIVE">INACTIVE</option>
          </select>

          <label className="billing-form-label" htmlFor="Duration">
            Duration (Timestamp)
          </label>
          <input
            className="billing-form-input"
            type="datetime-local"
            id="Duration"
            name="Duration"
            value={formData.Duration}
            onChange={handleInputChange}
            required
          />

          <button className="billing-submit-button" type="submit">
            Add Entry
          </button>
        </form>
      </div>

      <div className="billing-table-container">
        <table className="billing-table">
          <thead>
            <tr>
              <th>Billing ID</th>
              <th>Cost</th>
              <th>Pending</th>
              <th>Status</th>
              <th>Duration</th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((entry, index) => (
              <tr key={index}>
                <td>{entry.BillingID}</td>
                <td>{entry.Cost}</td>
                <td>{entry.Pending}</td>
                <td>{entry.Status}</td>
                <td>{entry.Duration}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
