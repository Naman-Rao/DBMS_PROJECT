import React, { useState } from 'react';
import './Logs.css';

export default function Logs() {
    const [logs, setLogs] = useState([]);
    const [formData, setFormData] = useState({
        logID: '',
        dateOfCreation: '',
        modifyDate: '',
        logLevel: '',
        parameters: '',
        adminID: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const newLog = {
            ...formData,
            parameters: formData.parameters ? JSON.parse(formData.parameters) : {}
        };
        setLogs([...logs, newLog]);
        setFormData({
            logID: '',
            dateOfCreation: '',
            modifyDate: '',
            logLevel: '',
            parameters: '',
            adminID: ''
        });
    };

    return (
        <div className="logs-container">
            <h2 className="logs-header">Logs Management</h2>

            <form className="logs-form" onSubmit={handleSubmit}>
                <label className="form-label">
                    Log ID:
                    <input
                        type="text"
                        name="logID"
                        value={formData.logID}
                        onChange={handleChange}
                        className="form-input"
                        required
                    />
                </label>
                <label className="form-label">
                    Date of Creation:
                    <input
                        type="date"
                        name="dateOfCreation"
                        value={formData.dateOfCreation}
                        onChange={handleChange}
                        className="form-input"
                        required
                    />
                </label>
                <label className="form-label">
                    Modify Date:
                    <input
                        type="date"
                        name="modifyDate"
                        value={formData.modifyDate}
                        onChange={handleChange}
                        className="form-input"
                    />
                </label>
                <label className="form-label">
                    Log Level:
                    <select
                        name="logLevel"
                        value={formData.logLevel}
                        onChange={handleChange}
                        className="form-input"
                        required
                    >
                        <option value="">Select</option>
                        <option value="WARNING">WARNING</option>
                        <option value="INFO">INFO</option>
                        <option value="ERROR">ERROR</option>
                    </select>
                </label>
                <label className="form-label">
                    Parameters (JSON):
                    <textarea
                        name="parameters"
                        value={formData.parameters}
                        onChange={handleChange}
                        className="form-input"
                        placeholder='{"key": "value"}'
                    />
                </label>
                <label className="form-label">
                    Admin ID:
                    <input
                        type="text"
                        name="adminID"
                        value={formData.adminID}
                        onChange={handleChange}
                        className="form-input"
                        required
                    />
                </label>
                <button type="submit" className="submit-button">Add Log</button>
            </form>

            <div className="logs-table-container">
                <table className="logs-table">
                    <thead>
                        <tr>
                            <th>Log ID</th>
                            <th>Date of Creation</th>
                            <th>Modify Date</th>
                            <th>Log Level</th>
                            <th>Parameters</th>
                            <th>Admin ID</th>
                        </tr>
                    </thead>
                    <tbody>
                        {logs.map((log, index) => (
                            <tr key={index}>
                                <td>{log.logID}</td>
                                <td>{log.dateOfCreation}</td>
                                <td>{log.modifyDate || 'N/A'}</td>
                                <td>{log.logLevel}</td>
                                <td>{JSON.stringify(log.parameters)}</td>
                                <td>{log.adminID}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
