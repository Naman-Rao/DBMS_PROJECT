import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const [adminDetails, setAdminDetails] = useState(null);
  const [clusters, setClusters] = useState([]);
  const [selectedCluster, setSelectedCluster] = useState(null);
  const [logs, setLogs] = useState([]);
  const [services, setServices] = useState([]);
  const navigate = useNavigate();
  const [message, setMessage] = useState('');
  const [resultData, setResultData] = useState(null);

  const executeProcedure = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/execute-clusters');
      
      // Check if response.data.results is an array
      if (Array.isArray(response.data.results)) {
        // Flatten the array if it's an array of arrays
        const transformedData = response.data.results.flat().map((item) => ({
          CLUSTERID: item.CLUSTERID,
          TOTAL_CPU: item.TOTAL_CPU,
          TOTAL_RAM: item.TOTAL_RAM,
          TOTAL_STORAGE: item.TOTAL_STORAGE,
          TOTAL_GPU: item.TOTAL_GPU
        }));
        setMessage('Procedure executed successfully');
        setResultData(transformedData);
      } else {
        setMessage('Unexpected response structure');
        console.log(response.data);
      }

    } catch (error) {
      setMessage('Error executing the procedure');
      console.error(error);
    }
  };

  const adminID = localStorage.getItem('adminID');

  useEffect(() => {
    // Fetch admin details
    axios.get(`http://localhost:5000/api/admin/${adminID}`)
      .then(response => setAdminDetails(response.data))
      .catch(err => console.error('Error fetching admin details:', err));

    // Fetch clusters
    axios.get('http://localhost:5000/api/clusters')
      .then(response => setClusters(response.data))
      .catch(err => console.error('Error fetching clusters:', err));

    // Fetch services
    axios.get('http://localhost:5000/api/services')
      .then(response => setServices(response.data))
      .catch(err => console.error('Error fetching services:', err));
  }, [adminID]);

  // Fetch logs for the admin
  const fetchLogs = () => {
    axios.get(`http://localhost:5000/api/logs/${adminID}`)
      .then(response => setLogs(response.data))
      .catch(err => console.error('Error fetching logs:', err));
  };

  // Fetch node info for the selected cluster
  const fetchClusterNodes = (clusterID) => {
    axios.get(`http://localhost:5000/api/nodes/${clusterID}`)
      .then(response => setSelectedCluster(response.data))
      .catch(err => console.error('Error fetching nodes:', err));
  };

  const handleRefreshClusters = () => {
  axios.get(`http://localhost:5000/api/clusters`)
    .then(response => setClusters(response.data))
    .catch(err => console.error('Error fetching clusters:', err));
  };

  const handleRefreshServices = () => {
  axios.get(`http://localhost:5000/api/services`)
    .then(response => setServices(response.data))
    .catch(err => console.error('Error fetching services:', err));
  };;

  const [serviceID, setServiceID] = useState('');
  const [price, setPrice] = useState('');
  const [endpoint, setEndpoint] = useState('');
  const [loadBalance, setLoadBalance] = useState('YES');
  const [deployEnv, setDeployEnv] = useState('');
  const [cspID, setCspID] = useState('');
  const [csps, setCsps] = useState([]);
  const [error, setError] = useState('');

  const [clusterID, setClusterID] = useState('');
  const [nodeCount, setNodeCount] = useState('');
  const [status, setStatus] = useState('UP');
  const [type, setType] = useState('GPU');
  const [owner, setOwner] = useState('');
  const [nodes, setNodes] = useState([]);


  // Fetch available CSPs from backend
  useEffect(() => {
    axios.get('http://localhost:5000/api/csps')
      .then((response) => {
        setCsps(response.data);
      })
      .catch((err) => {
        console.error('Error fetching CSPs:', err);
        setError('Could not fetch CSPs');
      });
  }, []);

  const handleClusterSubmit = async (e) => {
    e.preventDefault();
    try {
      // Step 1: Add Cluster
      const clusterData = {
        ClusterID: clusterID,
        NodeCount: nodeCount,
        Status: status,
        Type: type,
        Owner: owner,
        CSPID: cspID,
      };
      await axios.post('http://localhost:5000/api/add-cluster', clusterData);

      // Step 2: Add Nodes
      const nodesWithClusterID = nodes.map((node) => ({
      ...node,
      ClusterID: clusterID, // Add ClusterID to each node
    }));

    // Send nodes with ClusterID
    await axios.post('http://localhost:5000/api/add-nodes', { nodes: nodesWithClusterID });

      // Reset fields after successful submission
      setClusterID('');
      setNodeCount(0);
      setStatus('UP');
      setType('GPU');
      setOwner('');
      setCspID('');
      setNodes([]);
      setError('');
      alert('Cluster and nodes added successfully!');
      handleRefreshClusters();
    } catch (error) {
      console.error('Error adding cluster or nodes:', error);
      setError('Error adding cluster or nodes');
    }
  };

  const handleNodeChange = (index, field, value) => {
    const updatedNodes = [...nodes];
    updatedNodes[index][field] = value;
    setNodes(updatedNodes);
  };

  const handleNodeCountChange = (e) => {
    const count = parseInt(e.target.value, 10);
    setNodeCount(count);
    setNodes(Array.from({ length: count }, () => ({ IPAddress: '', CPU: 0, RAM: 0, Storage: 0, GPU: 0 })));
  };


  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Simple validation
    if (!serviceID || !price || !endpoint || !deployEnv || !cspID) {
      setError('All fields are required!');
      return;
    }
    if (!['YES', 'NO'].includes(loadBalance)) {
      setError('Load Balance must be YES or NO');
      return;
    }

    const formData = {
      ServiceID: serviceID,
      Price: parseFloat(price),
      Endpoint: endpoint,
      LoadBalance: loadBalance,
      DeployEnv: deployEnv,
      CSPID: cspID,
    };

    // Send data to backend using Axios
    axios.post('http://localhost:5000/api/add-service', formData) // Ensure this points to your correct backend endpoint
      .then((response) => {
        if (response.data.message) {
          alert(response.data.message);
          // Clear the form fields after successful submission
          setServiceID('');
          setPrice('');
          setEndpoint('');
          setLoadBalance('YES');
          setDeployEnv('');
          setCspID('');
          setError(''); // Clear any error messages

          handleRefreshServices();
        }
      })
      .catch((err) => {
        console.error('Error adding service:', err);
        setError('Error adding service');
      });
  };

  const handleButtonClick = () => {
    navigate('/'); // Navigate to the login page
  };

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <div className="header-logo">
          <h1 onClick={() => handleButtonClick()}>CSUMS</h1>
        </div>
        <h1>Admin Dashboard</h1>
        <div style={styles.navbar}>
            <button onClick={handleRefreshClusters}>Refresh Clusters</button>
             <button onClick={handleRefreshServices}>Refresh Services</button>
        </div>
      </header>

      <section style={styles.mainContent}>
        {adminDetails ? (
          <div style={styles.adminDetails}>
            <h3>Admin Details</h3>
            <p><strong>Username:</strong> {adminDetails.UserName} </p>
            <p><strong>Email:</strong> {adminDetails.MailID}</p>
            <p><strong>Role:</strong> {adminDetails.RoleTitle}</p>
            <p><strong>Age:</strong> {adminDetails.Age}</p>
          </div>
        ) : (
          <p>Loading admin details...</p>
        )}
        <div style={styles.section}>
         <h1>Add Cluster</h1>
     <form onSubmit={handleClusterSubmit}>
        <div>
          <label>Cluster ID</label>
          <input
            type="text"
            value={clusterID}
            onChange={(e) => setClusterID(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Node Count</label>
          <input
            type="number"
            value={nodeCount}
            onChange={handleNodeCountChange}
            min="1"
            required
          />
        </div>
        <div>
          <label>Status</label>
          <select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="UP">UP</option>
            <option value="DOWN">DOWN</option>
            <option value="UNREACHABLE">UNREACHABLE</option>
          </select>
        </div>
        <div>
          <label>Type</label>
          <select value={type} onChange={(e) => setType(e.target.value)}>
            <option value="GPU">GPU</option>
            <option value="CPU">CPU</option>
            <option value="Storage">Storage</option>
            <option value="Hybrid">Hybrid</option>
          </select>
        </div>
        <div>
          <label>Owner</label>
          <input
            type="text"
            value={owner}
            onChange={(e) => setOwner(e.target.value)}
            required
          />
        </div>
        <div>
          <label>CSP ID</label>
          <select
            value={cspID}
            onChange={(e) => setCspID(e.target.value)}
            required
          >
            <option value="">Select CSP</option>
            {csps.map(csp => (
              <option key={csp.CSPID} value={csp.CSPID}>
                {csp.CSPName} ({csp.CSPID})
              </option>
            ))}
          </select>
        </div>
        {nodes.map((node, index) => (
          <div key={index}>
            <h3>Node {index + 1}</h3>
            <div>
              <label>IP Address</label>
              <input
                type="text"
                value={node.IPAddress}
                onChange={(e) => handleNodeChange(index, 'IPAddress', e.target.value)}
                required
              />
            </div>
            <div>
              <label>CPU</label>
              <input
                type="number"
                value={node.CPU}
                onChange={(e) => handleNodeChange(index, 'CPU', e.target.value)}
                required
              />
            </div>
            <div>
              <label>RAM</label>
              <input
                type="number"
                value={node.RAM}
                onChange={(e) => handleNodeChange(index, 'RAM', e.target.value)}
                required
              />
            </div>
            <div>
              <label>Storage</label>
              <input
                type="number"
                value={node.Storage}
                onChange={(e) => handleNodeChange(index, 'Storage', e.target.value)}
                required
              />
            </div>
            <div>
              <label>GPU</label>
              <input
                type="number"
                value={node.GPU}
                onChange={(e) => handleNodeChange(index, 'GPU', e.target.value)}
                required
              />
            </div>
          </div>
        ))}
        <button type="submit" >Submit</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
        <div style={styles.section}>
          <h3>Cluster Info</h3>
          <div>
            {clusters.map(cluster => (
              <div key={cluster.ClusterID} style={styles.clusterCard}>
                <h4>{cluster.Type} Cluster</h4>
                <p>Status: {cluster.Status}</p>
                <button onClick={() => fetchClusterNodes(cluster.ClusterID)} style={styles.clusterButton}>
                  View Nodes
                </button>
              </div>
            ))}
          </div>
        </div>

        {selectedCluster && (
          <div style={styles.section}>
            <h3>Node Details</h3>
            {selectedCluster.map(node => (
              <div key={node.IPAddress} style={styles.nodeCard}>
                <p><strong>IP Address:</strong> {node.IPAddress}</p>
                <p><strong>CPU:</strong> {node.CPU}</p>
                <p><strong>RAM:</strong> {node.RAM} GB</p>
                <p><strong>Storage:</strong> {node.Storage} GB</p>
                <p><strong>GPU:</strong> {node.GPU}</p>
              </div>
            ))}
          </div>
        )}

        <div style={styles.section}>
          <button style={{ fontSize: '20px' }}onClick={executeProcedure}>Total Resources on Clusters</button>
          {/* Display message from backend */}
          <p>{message}</p>

          {/* If the procedure returns any results, display them */}
          {resultData && (
        <div>
          <h2>Procedure Results</h2>
          <table border="1" cellPadding="10" style={{ marginTop: '20px', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th>Cluster ID</th>
                <th>Total CPU CORES</th>
                <th>Total RAM (GB)</th>
                <th>Total Storage (GB)</th>
                <th>Total GPU (CORES)</th>
              </tr>
            </thead>
            <tbody>
              {resultData.map((row, index) => (
                <tr key={index}>
                  <td>{row.CLUSTERID}</td>
                  <td>{row.TOTAL_CPU}</td>
                  <td>{row.TOTAL_RAM}</td>
                  <td>{row.TOTAL_STORAGE}</td>
                  <td>{row.TOTAL_GPU}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>

        

        <div style={styles.section}>
          <h3>Logs</h3>
          <div>
            {logs.map(log => (
              <div key={log.LogID} style={styles.logCard}>
                <p><strong>Job ID : {log.JobID}</strong></p>
                <p><strong>Log Level:</strong> {log.LogLevel}</p>
                <p><strong>Created On:</strong> {log.DateOfCreation}</p>
                <p><strong>Parameters:</strong> {JSON.stringify(log.Parameters)}</p>
              </div>
            ))}
          </div>
        </div>

        <div style={styles.section}>

          <h3>Add Service</h3>
          <form onSubmit={handleSubmit}>
            <div>
              <label>Service ID:</label>
              <input
                type="text"
                value={serviceID}
                onChange={(e) => setServiceID(e.target.value)}
                required
              />
            </div>

            <div>
              <label>Price:</label>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
              />
            </div>

            <div>
              <label>Endpoint:</label>
              <input
                type="text"
                value={endpoint}
                onChange={(e) => setEndpoint(e.target.value)}
                required
              />
            </div>

            <div>
              <label>Load Balance:</label>
              <select
                value={loadBalance}
                onChange={(e) => setLoadBalance(e.target.value)}
              >
                <option value="YES">YES</option>
                <option value="NO">NO</option>
              </select>
            </div>

            <div>
              <label>Deployment Environment:</label>
              <input
                type="text"
                value={deployEnv}
                onChange={(e) => setDeployEnv(e.target.value)}
                required
              />
            </div>

            <div>
              <label>CSP ID:</label>
              <select
                value={cspID}
                onChange={(e) => setCspID(e.target.value)}
                required
              >
                <option value="">Select CSP</option>
                {csps.map((csp) => (
                  <option key={csp.CSPID} value={csp.CSPID}>
                    {csp.CSPID}
                  </option>
                ))}
              </select>
            </div>

            {error && <div className="error">{error}</div>}

            <button type="submit">Add Service</button>
          </form>
        </div>

        <div style={styles.section}>
          <h3>Services</h3>
          <div>
            {services.map(service => (
              <div key={service.ServiceID} style={styles.serviceCard}>
                <p><strong>Service:</strong> {service.Endpoint}</p>
                <p><strong>Price:</strong> {service.Price}</p>
                <p><strong>Load Balanced:</strong> {service.LoadBalance}</p>
                <p><strong>Deploy Env:</strong> {service.DeployEnv}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
    backgroundColor: '#f4f4f9',
    fontFamily: 'Arial, sans-serif',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#4CAF50',
    padding: '15px',
    color: '#fff',
  },
  navbar: {
    display: 'flex',
    gap: '15px',
  },
  navButton: {
    padding: '10px 20px',
    backgroundColor: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  mainContent: {
    marginTop: '20px',
  },
  section: {
    marginBottom: '30px',
  },
  adminDetails: {
    backgroundColor: '#fff',
    padding: '15px',
    borderRadius: '5px',
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
  },
  clusterCard: {
    backgroundColor: '#fff',
    padding: '15px',
    marginBottom: '10px',
    borderRadius: '5px',
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
  },
  clusterButton: {
    backgroundColor: '#4CAF50',
    color: '#fff',
    padding: '5px 10px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  nodeCard: {
    backgroundColor: '#fff',
    padding: '15px',
    marginBottom: '10px',
    borderRadius: '5px',
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
  },
  logCard: {
    backgroundColor: '#fff',
    padding: '15px',
    marginBottom: '10px',
    borderRadius: '5px',
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
  },
  serviceCard: {
    backgroundColor: '#fff',
    padding: '15px',
    marginBottom: '10px',
    borderRadius: '5px',
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
  }
};

export default AdminDashboard;
