module.exports = (db) => {
  const express = require('express');
  const router = express.Router();

// Get admin details
router.get('/admin/:adminID', (req, res) => {
  const { adminID } = req.params;
  db.query('SELECT * FROM Admin WHERE AdminID = ?', [adminID], (err, results) => {
    if (err) {
      console.error('Error fetching admin details:', err);
      return res.status(500).json({ error: 'Internal server error' });
    }
    if (results.length === 0) {
      return res.status(404).json({ error: 'Admin not found' });
    }
    return res.json(results[0]);
  });
});

// Get cluster info
router.get('/clusters', (req, res) => {
  db.query('SELECT * FROM Cluster', (err, results) => {
    if (err) {
      console.error('Error fetching clusters:', err);
      return res.status(500).json({ error: 'Internal server error' });
    }
    return res.json(results);
  });
});

router.post('/add-cluster', (req, res) => {
  const { ClusterID, NodeCount, Status, Type, Owner, CSPID } = req.body;

  // The query for inserting the cluster into the Cluster table
  const clusterQuery = `INSERT INTO Cluster (ClusterID, NodeCount, Status, Type, Owner, CSPID)
                        VALUES (?, ?, ?, ?, ?, ?)`;

  // Start a new transaction
  db.beginTransaction((err) => {
    if (err) {
      console.error('Error starting transaction:', err);
      return res.status(500).json({ message: 'Error starting transaction' });
    }

    // Execute the cluster insertion query within the transaction
    db.query(clusterQuery, [ClusterID, NodeCount, Status, Type, Owner, CSPID], (err, result) => {
      if (err) {
        console.error('Error inserting cluster:', err);

        // If there's an error, rollback the transaction
        return db.rollback(() => {
          res.status(500).json({ message: 'Error adding cluster' });
        });
      }

      // If the insertion is successful, commit the transaction
      db.commit((err) => {
        if (err) {
          console.error('Error committing transaction:', err);

          // If commit fails, rollback the transaction
          return db.rollback(() => {
            res.status(500).json({ message: 'Error committing transaction' });
          });
        }
        res.status(200).json({ message: 'Cluster added successfully' });
      });
    });
  });
});

// Add nodes route
router.post('/add-nodes', (req, res) => {
  const nodes = req.body.nodes; // Array of node objects
  const nodeQuery = `INSERT INTO Node (IPAddress, CPU, RAM, Storage, GPU, ClusterID) VALUES ?`;

  // Prepare the values to be inserted
  const values = nodes.map(node => [node.IPAddress, node.CPU, node.RAM, node.Storage, node.GPU, node.ClusterID]);

  // Start a new transaction
  db.beginTransaction((err) => {
    if (err) {
      console.error('Error starting transaction:', err);
      return res.status(500).json({ message: 'Error starting transaction' });
    }

    // Execute the node insertion query within the transaction
    db.query(nodeQuery, [values], (err, result) => {
      if (err) {
        console.error('Error inserting nodes:', err);

        // If there's an error, rollback the transaction
        return db.rollback(() => {
          res.status(500).json({ message: 'Error adding nodes' });
        });
      }

      // If the insertion is successful, commit the transaction
      db.commit((err) => {
        if (err) {
          console.error('Error committing transaction:', err);

          // If commit fails, rollback the transaction
          return db.rollback(() => {
            res.status(500).json({ message: 'Error committing transaction' });
          });
        }
        res.status(200).json({ message: 'Nodes added successfully' });
      });
    });
  });
});


// Get node info for each cluster
router.get('/nodes/:clusterID', (req, res) => {
  const { clusterID } = req.params;
  db.query('SELECT * FROM Node WHERE ClusterID = ?', [clusterID], (err, results) => {
    if (err) {
      console.error('Error fetching nodes:', err);
      return res.status(500).json({ error: 'Internal server error' });
    }
    return res.json(results);
  });
});

// Get logs for admin
router.get('/logs/:adminID', (req, res) => {
  const { adminID } = req.params;
  db.query('SELECT * FROM ConfigsAndLogs C Join Logs L on C.LogID=L.LogID WHERE AdminID = ?', [adminID], (err, results) => {
    if (err) {
      console.error('Error fetching logs:', err);
      return res.status(500).json({ error: 'Internal server error' });
    }
    return res.json(results);
  });
});

// Get service info
router.get('/services', (req, res) => {
  db.query('SELECT * FROM Service', (err, results) => {
    if (err) {
      console.error('Error fetching services:', err);
      return res.status(500).json({ error: 'Internal server error' });
    }
    return res.json(results);
  });
});

router.get('/execute-clusters', (req, res) => {
  // Execute the stored procedure
  db.query('CALL EXECUTE_ON_EACH_CLUSTER()', (err, results) => {
    if (err) {
      console.error('Error executing procedure:', err);
      return res.status(500).json({ message: 'Error executing procedure', error: err });
    }
    
    // If the procedure executed successfully, send a success response
    return res.status(200).json({ message: 'Procedure executed successfully', results: results });
  });
});

router.post('/add-service', (req, res) => {
  const { ServiceID, Price, Endpoint, LoadBalance, DeployEnv, CSPID } = req.body;

  // Validate input data
  if (!ServiceID || !Price || !Endpoint || !LoadBalance || !DeployEnv || !CSPID) {
    return res.status(400).json({ message: 'All fields are required!' });
  }

  if (LoadBalance !== 'YES' && LoadBalance !== 'NO') {
    return res.status(400).json({ message: 'LoadBalance must be either YES or NO' });
  }

  // SQL query to insert the new service into the Service table
  const sql = `
    INSERT INTO Service (ServiceID, Price, Endpoint, LoadBalance, DeployEnv, CSPID)
    VALUES (?, ?, ?, ?, ?, ?)
  `;
  const values = [ServiceID, Price, Endpoint, LoadBalance, DeployEnv, CSPID];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error('Error inserting data:', err);
      return res.status(500).json({ message: 'Error adding service to database' });
    }
    res.status(200).json({ message: `Service ${ServiceID} added successfully!` });
  });
});

router.get('/csps', (req, res) => {
  db.query('SELECT CSPID FROM ExternalCSP', (err, results) => {
    if (err) {
      console.error('Error fetching CSPs:', err);
      return res.status(500).json({ message: 'Error fetching CSPs' });
    }
    res.json(results);
  });
});

router.post('/add-csps',(req,res)=>{
  const {CSPID,CSPName,PlanID,PlanName,Docs}=req.body;
  const sql= `INSERT INTO ExternalCSP (CSPID,CSPName,PlanID,PLanName,Docs) VALUES (?,?,?,?,?)`
  const values=[CSPID,CSPName,PlanID,PlanName,Docs]
  db.query(sql,values,(err,result)=>{
    if(err){
      console.error("Error inserting data:",err)
      return res.status(500).json({message : 'Error adding CSP to database'});
    }
    res.status(200).json({message : `External CSP ${CSPName} added successfully`})
  });
});

router.post('/joblogs/:accountID',(req,res)=>{
  const {accountID,jobID,logID}=req.body;
  const sql = `
    INSERT INTO Logs (JobID, LogID)
    VALUES (?, ?)
  `;
  const values = [JobID,LogID];
  db.query(sql, values, (err, result) => {
    if (err) {
      console.error('Error inserting data:', err);
      return res.status(500).json({ message: 'Error adding service to database' });
    }
    res.status(200).json({ message: `Job ${JobID} and Service ${ServiceID} added successfully!` });
  });
});

router.post('/add-joblogs:accountID',(req,res)=>{
  const {accountID}=req.params;
  db.query(
    `?`,[accountID],(err,results)=>{
      if(err){
        console.error("Error fetching Job's logs:",err)
        return res.status(500).json({message : 'Error fetching jobs and logs'})
      }
      return res.status(200).json(results);
    }  
  );
});

return router;
}