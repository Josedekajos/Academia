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
    const query = 'SELECT * FROM groups';
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
  const query = 'INSERT INTO studygroup.students (name, age, email, enrollment_date) VALUES (? , ?, ?, ?)';
  db.query(query, [[name, age, email, enrollment_date]], (err, result) => {
    if (err) {
      res.status(500).send(err.message);
      return;
    }
    res.json({ message: 'Data inserted successfully', id: result.insertId });
  });
});

// authentification

// Signup
app.post('/api/auth/signup', (req, res) => {
  const { name, email, password } = req.body;

  // Hash the password before saving
  const bcrypt = require('bcryptjs');
  const saltRounds = 10;

  bcrypt.hash(password, saltRounds, (err, hashedPassword) => {
    if (err) {
      res.status(500).send('Error hashing password');
      return;
    }

    // Query to insert the user
    const query = 'INSERT INTO studygroup.users (name, email, password) VALUES (?, ?, ?)';
    db.query(query, [name, email, hashedPassword], (err, results) => {
      if (err) {
        res.status(500).send(err.message);
        return;
      }
      res.status(201).json({ message: 'User created successfully', userId: results.insertId });
    });
  });
});


app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;

  const query = 'SELECT * FROM studygroup.users WHERE email = ?';
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