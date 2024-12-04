module.exports = (db) => {
  const express = require('express');
  const router = express.Router();
  const bcrypt = require('bcryptjs');
  const jwt = require('jsonwebtoken');
  const crypto = require('crypto');

  const JWT_SECRET_KEY = 'yourSecretKey';

  const generateRandomID = () => {
    return crypto.randomBytes(5).toString('hex');  // Generates a random 10-character string
  };

    // Login route
  router.post('/login', (req, res) => {
  const { username, password, role } = req.body;

  if (role === 'user') {
    db.query(
      'SELECT * FROM Accounts WHERE Username = ?',
      [username],
      (err, results) => {
        if (err) {
          console.error('Error during login:', err);
          return res.status(500).json({ error: 'Internal server error' });
        }

        if (results.length === 0) {
          return res.status(401).json({ error: 'Invalid username or password' });
        }

        // Compare the provided password with the stored hashed password
        const hashedPassword = results[0].Password;
        bcrypt.compare(password, hashedPassword, (err, isMatch) => {
          if (err) {
            console.error('Error comparing passwords:', err);
            return res.status(500).json({ error: 'Internal server error' });
          }

          if (!isMatch) {
            return res.status(401).json({ error: 'Invalid username or password' });
          }

          // Password matched, generate JWT token
          const accountID = results[0].AccountID;
          const payload = { id: accountID, role: 'user' };
          const token = jwt.sign(payload, JWT_SECRET_KEY, { expiresIn: '1h' }); // Token expires in 1 hour

          return res.json({ token }); // Send the token to the client
        });
      }
    );
  } else {
    db.query(
      'SELECT * FROM Admin WHERE UserName = ?',
      [username],
      (err, results) => {
        if (err) {
          console.error('Error during login:', err);
          return res.status(500).json({ error: 'Internal server error' });
        }

        if (results.length === 0) {
          return res.status(401).json({ error: 'Invalid username or password' });
        }

        // Compare the provided password with the stored hashed password
        const hashedPassword = results[0].Password;
        bcrypt.compare(password, hashedPassword, (err, isMatch) => {
          if (err) {
            console.error('Error comparing passwords:', err);
            return res.status(500).json({ error: 'Internal server error' });
          }

          if (!isMatch) {
            return res.status(401).json({ error: 'Invalid username or password' });
          }

          // Password matched, generate JWT token
          const adminID = results[0].AdminID;
          const payload = { id: adminID, role: 'admin' };
          const token = jwt.sign(payload, JWT_SECRET_KEY, { expiresIn: '1h' }); // Token expires in 1 hour

          return res.json({ token }); // Send the token to the client
        });
      }
    );
  }
});

// Register route for user
router.post('/register', (req, res) => {
  const { firstName, lastName, dob, username, password, country, mailID,balance } = req.body;
  // Generate random IDs
  const userID = generateRandomID();
  const regID = generateRandomID();
  const accountID = generateRandomID();
  const billingID = generateRandomID();

  // Hash the password before storing it
  bcrypt.hash(password, 10, (err, hashedPassword) => {
    if (err) {
      console.error('Error hashing password:', err);
      return res.status(500).json({ error: 'Failed to hash password' });
    }

    // Insert a new record into SubscriptionAndBilling table
    db.query(
      'INSERT INTO SubscriptionAndBilling (BillingID, Balance, Pending, Status, Duration) VALUES (?, ?, ?, ?, ?)',
      [billingID, balance, 'NO', 'QUEUED', new Date()],
      (err) => {
        if (err) {
          console.error('Error inserting into SubscriptionAndBilling table:', err);
          return res.status(500).json({ error: 'Failed to insert into SubscriptionAndBilling' });
        }

        // Insert into the Accounts table with hashed password
        const insertAccountQuery = `
          INSERT INTO Accounts (AccountID, Username, Password, Country, MailID, BillingID) 
          VALUES (?, ?, ?, ?, ?, ?)`;

        db.query(
          insertAccountQuery,
          [accountID, username, hashedPassword, country, mailID, billingID],
          (err, accountResult) => {
            if (err) {
              console.error('Error inserting account:', err);
              return res.status(500).json({ error: 'Failed to create account' });
            }

            // Insert into the Users table
            const insertUserQuery = `
              INSERT INTO Users (UserID, FirstName, LastName, DateOfBirth, RegID, AccountID)
              VALUES (?, ?, ?, ?, ?, ?)`;

            db.query(
              insertUserQuery,
              [userID, firstName, lastName, dob, regID, accountID],
              (err, userResult) => {
                if (err) {
                  console.error('Error inserting user:', err);
                  return res.status(500).json({ error: 'Failed to create user' });
                }

                // Now that the user and account have been created, execute the stored procedure
                db.query('CALL create_users()', (err, results) => {
                  if (err) {
                    console.error('Error executing procedure:', err);
                    return res.status(500).json({ message: 'Error executing procedure', error: err });
                  }

                  // Finally, send the success response only after all operations are complete
                  return res.status(201).json({ message: 'User registered successfully', results: results });
                });
              }
            );
          }
        );
      }
    );
  });
});


  router.post('/registerAdmin', (req, res) => {
  const { username, password, mailID, roleTitle, age } = req.body;

  // Generate a random AdminID
  const adminID = generateRandomID();

  // Hash the password before storing it
  bcrypt.hash(password, 10, (err, hashedPassword) => {
    if (err) {
      console.error('Error hashing password:', err);
      return res.status(500).json({ error: 'Failed to hash password' });
    }

    // Insert into the Admin table with hashed password
    const insertAdminQuery = `
      INSERT INTO Admin (AdminID, UserName, Password, MailID, RoleTitle, Age) 
      VALUES (?, ?, ?, ?, ?, ?)`;

    db.query(
      insertAdminQuery,
      [adminID, username, hashedPassword, mailID, roleTitle, age],
      (err, result) => {
        if (err) {
          console.error('Error inserting admin:', err);
          return res.status(500).json({ error: 'Failed to create admin' });
        }

        // Admin successfully created. Now generate a JWT token.
        const payload = { id: adminID, role: 'admin' };
        const token = jwt.sign(payload, JWT_SECRET_KEY, { expiresIn: '1h' }); // Token expires in 1 hour

        // Return the token to the client
        res.status(201).json({ message: 'Admin registered successfully', token });
      }
    );
  });
});

  return router;
};