const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');
const config = require('./config');
const app = express();
const port = 5000;  // Backend server runs on port 5000

// Middlewares
app.use(cors());
app.use(bodyParser.json());

// MySQL connection
const db = mysql.createConnection(config);

// Connect to MySQL database
db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL database');
});

// Define routes
app.use('/api', require('./routes/authRoutes')(db));
app.use('/api',require('./routes/adminRoutes')(db));
app.use('/api',require('./routes/userRoutes')(db));

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});