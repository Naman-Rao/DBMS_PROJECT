import React, { useState } from 'react';
import './Service.css';

export default function Service() {
    const [services, setServices] = useState([]);
    const [formData, setFormData] = useState({
        serviceID: '',
        price: '',
        endpoint: '',
        loadBalance: '',
        deployEnv: '',
        cspID: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setServices([...services, formData]);
        setFormData({
            serviceID: '',
            price: '',
            endpoint: '',
            loadBalance: '',
            deployEnv: '',
            cspID: ''
        });
    };

    return (
        <div className="service-container">
            <h2 className="service-header">Service Management</h2>

            <form className="service-form" onSubmit={handleSubmit}>
                <label className="form-label">
                    Service ID:
                    <input
                        type="text"
                        name="serviceID"
                        value={formData.serviceID}
                        onChange={handleChange}
                        className="form-input"
                        required
                    />
                </label>
                <label className="form-label">
                    Price:
                    <input
                        type="number"
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                        className="form-input"
                        required
                    />
                </label>
                <label className="form-label">
                    Endpoint:
                    <input
                        type="text"
                        name="endpoint"
                        value={formData.endpoint}
                        onChange={handleChange}
                        className="form-input"
                        required
                    />
                </label>
                <label className="form-label">
                    Load Balance:
                    <select
                        name="loadBalance"
                        value={formData.loadBalance}
                        onChange={handleChange}
                        className="form-input"
                        required
                    >
                        <option value="">Select</option>
                        <option value="YES">YES</option>
                        <option value="NO">NO</option>
                    </select>
                </label>
                <label className="form-label">
                    Deploy Environment:
                    <input
                        type="text"
                        name="deployEnv"
                        value={formData.deployEnv}
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
                <button type="submit" className="submit-button">Add Service</button>
            </form>

            <div className="service-table-container">
                <table className="service-table">
                    <thead>
                        <tr>
                            <th>Service ID</th>
                            <th>Price</th>
                            <th>Endpoint</th>
                            <th>Load Balance</th>
                            <th>Deploy Environment</th>
                            <th>CSP ID</th>
                        </tr>
                    </thead>
                    <tbody>
                        {services.map((service, index) => (
                            <tr key={index}>
                                <td>{service.serviceID}</td>
                                <td>{service.price}</td>
                                <td>{service.endpoint}</td>
                                <td>{service.loadBalance}</td>
                                <td>{service.deployEnv}</td>
                                <td>{service.cspID}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
