module.exports = (db) => {
  const express = require('express');
  const router = express.Router();

// Get user info along with billing balance and mail
router.get('/user-info/:accountID', (req, res) => {
  const {accountID} = req.params;  
  db.query(
    `SELECT u.FirstName, u.LastName, u.DateOfBirth, u.RegID, a.BillingID, a.MailID, sb.Balance
     FROM Users u
     JOIN Accounts a ON u.AccountID = a.AccountID
     JOIN SubscriptionAndBilling sb ON a.BillingID = sb.BillingID
     WHERE a.AccountID = ?`,
    [accountID],
    (err, results) => {
      if (err) {
        console.error('Error fetching user info:', err);
        return res.status(500).json({ error: 'Internal server error' });
      }
      if (results.length === 0) {
        return res.status(404).json({ error: 'User not found' });
      }
      res.json(results[0]);
    }
  );
});


router.post('/add-job/:accountID', (req, res) => {
  const {accountID} = req.params;  
  const { jobName, clusterID, serviceID, userID } = req.body;
  
  // Add job to Job table
  const jobID = generateJobID();  // Assume you have a function to generate unique JobID
  const query = `
    INSERT INTO Job (JobID, JobName, Duration, StartDate, Status, UserID, ClusterID, ServiceID)
    VALUES (?, ?, ?, ?, 'ACTIVE', ?, ?, ?)
  `;
  
  db.query(query, [jobID, jobName, new Date(), new Date(), userID, clusterID, serviceID], (err, result) => {
    if (err) {
      console.error('Error adding job:', err);
      return res.status(500).json({ error: 'Internal server error' });
    }

    // Add new row to SubscriptionAndBilling with the job's cost (depending on service)
    db.query('SELECT Price FROM Service WHERE ServiceID = ?', [serviceID], (err, serviceResults) => {
      if (err) {
        console.error('Error fetching service price:', err);
        return res.status(500).json({ error: 'Internal server error' });
      }

      const price = serviceResults[0].Price;

      // Update Billing (Balance and Pending)
      db.query(
        `UPDATE SubscriptionAndBilling
         SET Balance = Balance - ?, Pending = 'YES'
         WHERE BillingID = (SELECT BillingID FROM Accounts WHERE AccountID = (SELECT AccountID FROM Users WHERE UserID = ?))`,
        [price, userID],
        (err) => {
          if (err) {
            console.error('Error updating billing:', err);
            return res.status(500).json({ error: 'Internal server error' });
          }
          res.status(201).json({ message: 'Job added successfully' });
        }
      );
    });
  });
});

router.post('/cancel-job', (req, res) => {
  const { jobID } = req.body;

  // Update job status to 'KILLED'
  db.query('UPDATE Job SET Status = "KILLED" WHERE JobID = ?', [jobID], (err) => {
    if (err) {
      console.error('Error canceling job:', err);
      return res.status(500).json({ error: 'Internal server error' });
    }

    // Update the billing system (restore balance if needed, depending on your logic)
    // Assuming a simplistic refund on canceling a job, you can adjust it based on your business logic
    db.query('SELECT ServiceID FROM Job WHERE JobID = ?', [jobID], (err, results) => {
      if (err) {
        console.error('Error fetching service from job:', err);
        return res.status(500).json({ error: 'Internal server error' });
      }

      const serviceID = results[0].ServiceID;

      db.query('SELECT Price FROM Service WHERE ServiceID = ?', [serviceID], (err, serviceResults) => {
        if (err) {
          console.error('Error fetching service price:', err);
          return res.status(500).json({ error: 'Internal server error' });
        }

        const price = serviceResults[0].Price;

        // Restore the balance
        db.query(
          `UPDATE SubscriptionAndBilling
           SET Balance = Balance + ?, Pending = 'NO'
           WHERE BillingID = (SELECT BillingID FROM Accounts WHERE AccountID = (SELECT AccountID FROM Users WHERE UserID = ?))`,
          [price, req.user.id],
          (err) => {
            if (err) {
              console.error('Error updating balance:', err);
              return res.status(500).json({ error: 'Internal server error' });
            }
            res.json({ message: 'Job canceled and billing updated' });
          }
        );
      });
    });
  });
});

router.get('/account-info/:accountID',(req,res)=>{
  const {accountID}=req.params;
  db.query(`Select * from Accounts where AccountID=?`,[accountID],
    (err,results)=>{
      if(err){
        console.error("Error fetching account information:",err)
        return res.status(500).json({error : 'Internal server error'})
      }
      res.json(results);
    }
  )
});

router.get('/billing-info/:accountID',(req,res)=>{
  const {accountID}=req.params;
  db.query(
    `Select 
      * 
    from Subscriptionandbilling s
    JOIN Users u ON u.userID=s.userID
    JOIN Accounts a ON a.AccountID=u.AccountID
    WHERE a.accountID=?`,[accountID],
    (err,results)=>{
      if(err)
      {
        console.error("Error fetching billing information:",err)
        return res.status(500).json({error:'Internal Server Error'})
      }
      res.json(results);
    }
  )
});



router.get('/running-jobs/:accountID', (req, res) => {
  const {accountID}= req.params;

  db.query(
    `SELECT j.JobID, j.JobName, j.Status, j.StartDate, s.Price, c.ClusterID 
     FROM Job j
     JOIN Service s ON j.ServiceID = s.ServiceID
     JOIN Cluster c ON j.ClusterID = c.ClusterID
     JOIN Users u ON u.UserID = j.UserID
     WHERE u.AccountID = ? AND j.Status = 'ACTIVE'`,
    [accountID],
    (err, results) => {
      if (err) {
        console.error('Error fetching running jobs:', err);
        return res.status(500).json({ error: 'Internal server error' });
      }
      res.json(results);
    }
  );
});

router.get('/total-cost/:accountID', (req, res) => {
  const {accountID} = req.params ;

  db.query(
    `SELECT SUM(s.Price) AS TotalCost
     FROM Job j
     JOIN Service s ON j.ServiceID = s.ServiceID
     JOIN Users u ON u.UserID = j.UserID
     JOIN Accounts a ON a.AccountID =  u.AccountID
     WHERE a.AccountID = ? AND j.Status = 'ACTIVE'`,
    [accountID],
    (err, results) => {
      if (err) {
        console.error('Error calculating total cost:', err);
        return res.status(500).json({ error: 'Internal server error' });
      }
      res.json({ totalCost: results[0].TotalCost });
    }
  );
});

 return router;
};