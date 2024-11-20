import React, { useState } from "react";
import "./JobScheduler.css";

export default function JobScheduler() {
    const [formData, setFormData] = useState({
        jobID: "",
        jobName: "",
        duration: "",
        startDate: "",
        status: "",
        userID: "",
        clusterID: "",
        serviceID: "",
    });

    const [jobs, setJobs] = useState([]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        setJobs([...jobs, formData]);
        setFormData({
            jobID: "",
            jobName: "",
            duration: "",
            startDate: "",
            status: "",
            userID: "",
            clusterID: "",
            serviceID: "",
        });
    };

    return (
        <div className="job-container">
            <h1 className="job-header">Job Scheduler</h1>
            <div className="job-form-container">
                <h3>Schedule a Job</h3>
                <form className="job-form" onSubmit={handleFormSubmit}>
                    <label className="job-form-label">Job ID</label>
                    <input
                        className="job-form-input"
                        type="text"
                        name="jobID"
                        value={formData.jobID}
                        onChange={handleInputChange}
                        required
                    />
                    <label className="job-form-label">Job Name</label>
                    <input
                        className="job-form-input"
                        type="text"
                        name="jobName"
                        value={formData.jobName}
                        onChange={handleInputChange}
                        required
                    />
                    <label className="job-form-label">Duration (Timestamp)</label>
                    <input
                        className="job-form-input"
                        type="datetime-local"
                        name="duration"
                        value={formData.duration}
                        onChange={handleInputChange}
                        required
                    />
                    <label className="job-form-label">Start Date</label>
                    <input
                        className="job-form-input"
                        type="date"
                        name="startDate"
                        value={formData.startDate}
                        onChange={handleInputChange}
                        required
                    />
                    <label className="job-form-label">Status</label>
                    <select
                        className="job-form-input"
                        name="status"
                        value={formData.status}
                        onChange={handleInputChange}
                        required
                    >
                        <option value="">Select Status</option>
                        <option value="QUEUED">QUEUED</option>
                        <option value="PAUSED">PAUSED</option>
                        <option value="KILLED">KILLED</option>
                        <option value="ACTIVE">ACTIVE</option>
                    </select>
                    <label className="job-form-label">User ID</label>
                    <input
                        className="job-form-input"
                        type="text"
                        name="userID"
                        value={formData.userID}
                        onChange={handleInputChange}
                        required
                    />
                    <label className="job-form-label">Cluster ID</label>
                    <input
                        className="job-form-input"
                        type="text"
                        name="clusterID"
                        value={formData.clusterID}
                        onChange={handleInputChange}
                        required
                    />
                    <label className="job-form-label">Service ID</label>
                    <input
                        className="job-form-input"
                        type="text"
                        name="serviceID"
                        value={formData.serviceID}
                        onChange={handleInputChange}
                        required
                    />
                    <button className="job-submit-button" type="submit">
                        Schedule Job
                    </button>
                </form>
            </div>

            <div className="job-table-container">
                <h3>Scheduled Jobs</h3>
                <table className="job-table">
                    <thead>
                        <tr>
                            <th>Job ID</th>
                            <th>Job Name</th>
                            <th>Duration</th>
                            <th>Start Date</th>
                            <th>Status</th>
                            <th>User ID</th>
                            <th>Cluster ID</th>
                            <th>Service ID</th>
                        </tr>
                    </thead>
                    <tbody>
                        {jobs.map((job, index) => (
                            <tr key={index}>
                                <td>{job.jobID}</td>
                                <td>{job.jobName}</td>
                                <td>{job.duration}</td>
                                <td>{job.startDate}</td>
                                <td>{job.status}</td>
                                <td>{job.userID}</td>
                                <td>{job.clusterID}</td>
                                <td>{job.serviceID}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
