import React, { useState } from 'react';
import './Cluster.css';

export default function Cluster() {
    const [clusters, setClusters] = useState([]);
    const [formData, setFormData] = useState({
        clusterID: '',
        nodeCount: '',
        status: '',
        type: '',
        owner: '',
        cspID: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setClusters([...clusters, formData]);
        setFormData({
            clusterID: '',
            nodeCount: '',
            status: '',
            type: '',
            owner: '',
            cspID: ''
        });
    };

    return (
        <div className="cluster-container">
            <h2 className="cluster-header">Cluster Management</h2>

            <form className="cluster-form" onSubmit={handleSubmit}>
                <label className="form-label">
                    Cluster ID:
                    <input
                        type="text"
                        name="clusterID"
                        value={formData.clusterID}
                        onChange={handleChange}
                        className="form-input"
                        required
                    />
                </label>
                <label className="form-label">
                    Node Count:
                    <input
                        type="number"
                        name="nodeCount"
                        value={formData.nodeCount}
                        onChange={handleChange}
                        className="form-input"
                        required
                    />
                </label>
                <label className="form-label">
                    Status:
                    <select
                        name="status"
                        value={formData.status}
                        onChange={handleChange}
                        className="form-input"
                        required
                    >
                        <option value="">Select</option>
                        <option value="UP">UP</option>
                        <option value="DOWN">DOWN</option>
                        <option value="UNREACHABLE">UNREACHABLE</option>
                    </select>
                </label>
                <label className="form-label">
                    Type:
                    <select
                        name="type"
                        value={formData.type}
                        onChange={handleChange}
                        className="form-input"
                        required
                    >
                        <option value="">Select</option>
                        <option value="GPU">GPU</option>
                        <option value="CPU">CPU</option>
                        <option value="Storage">Storage</option>
                        <option value="Hybrid">Hybrid</option>
                    </select>
                </label>
                <label className="form-label">
                    Owner:
                    <input
                        type="text"
                        name="owner"
                        value={formData.owner}
                        onChange={handleChange}
                        className="form-input"
                        required
                    />
                </label>
                <label className="form-label">
                    CSP ID:
                    <input
                        type="text"
                        name="cspID"
                        value={formData.cspID}
                        onChange={handleChange}
                        className="form-input"
                        required
                    />
                </label>
                <button type="submit" className="submit-button">Add Cluster</button>
            </form>

            <div className="cluster-table-container">
                <table className="cluster-table">
                    <thead>
                        <tr>
                            <th>Cluster ID</th>
                            <th>Node Count</th>
                            <th>Status</th>
                            <th>Type</th>
                            <th>Owner</th>
                            <th>CSP ID</th>
                        </tr>
                    </thead>
                    <tbody>
                        {clusters.map((cluster, index) => (
                            <tr key={index}>
                                <td>{cluster.clusterID}</td>
                                <td>{cluster.nodeCount}</td>
                                <td>{cluster.status}</td>
                                <td>{cluster.type}</td>
                                <td>{cluster.owner}</td>
                                <td>{cluster.cspID}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
