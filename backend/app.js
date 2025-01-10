const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = 3000;
module.exports = app;

app.use(cors());
app.use(bodyParser.json());

// MySQL database connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'studyconnect'
});

db.connect(err => {
  if (err) {
    console.error('Database connection failed:', err.message);
    return;
  }
  console.log('Connected to the MySQL database');
});

// Route to fetch data
app.get('/api/data', (req, res) => {
  const query = 'SELECT * FROM students';
  db.query(query, (err, results) => {
    if (err) {
      res.status(500).send(err.message);
      return;
    }
    res.json(results);
  });
});

// Fetch all of the different groups that have been created.
app.get('/api/groups', (req, res) => {
  const query = 'SELECT * FROM studyconnect.groups';
  db.query(query, (err, results) => {
    if (err) {
    res.status(500).send(err.message);
    return;
    }
    res.json(results);
  });
  });

app.post('/api/students', (req, res) => {
  const { name, age, email, enrollment_date } = req.body;
  const query = 'INSERT INTO studyconnect.students (name, age, email, enrollment_date) VALUES (? , ?, ?, ?)';
  db.query(query, [[name, age, email, enrollment_date]], (err, result) => {
    if (err) {
      res.status(500).send(err.message);
      return;
    }
    res.json({ message: 'Data inserted successfully', id: result.insertId });
  });
});


// Signup
app.post('/api/register', (req, res) => {
  const { first_name, last_name, email, password, phone, level, goals } = req.body;

  // Hash the password before saving
  const bcrypt = require('bcryptjs');
  const saltRounds = 10;

  bcrypt.hash(password, saltRounds, (err, hashedPassword) => {
    if (err) {
      res.status(500).send('Error hashing password');
      return;
    }

    // Query to insert the user
    const query = 'INSERT INTO studyconnect.users (first_name, last_name, email, password, phone, level, goals) VALUES (?, ?, ?, ?, ?, ?, ?)';
    db.query(query, [first_name, last_name, email, hashedPassword, phone, level, goals ], (err, results) => {
      if (err) {
        res.status(500).send(err.message);
        return;
      }
      res.status(201).json({ message: 'User created successfully', userId: results.insertId });
    });
  });
});


app.post('/api/login', (req, res) => {

  const { email, password } = req.body;

  const query = 'SELECT * FROM studyconnect.users WHERE email = ?';
  db.query(query, [email], (err, results) => {
    if (err) {
      res.status(500).send(err.message);
      return;
    }

    if (results.length === 0) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    const user = results[0];
    const bcrypt = require('bcryptjs');

    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err) {
        res.status(500).send('Error comparing passwords');
        return;
      }

      if (!isMatch) {
        res.status(401).json({ message: 'Invalid credentials' });
        return;
      }

      const jwt = require('jsonwebtoken');
      const JWT_SECRET = 'somerandomtoken';
      const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: '1h' });

      res.status(200).json({ message: 'Login successful', token });
    });
  });
});


app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});