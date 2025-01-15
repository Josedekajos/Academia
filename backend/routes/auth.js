const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = express.Router();
const db = require('../config/db.js');

router.post('/login', (req, res) => {
    const { email, password } = req.body;

    db.query('SELECT * FROM users WHERE email = ?', [email], (err, results) => {
        if (err) return res.status(500).json(err);

        if (results.length === 0) return res.status(401).json({ message: 'User not found' });

        const user = results[0];
        const isMatch = bcrypt.compareSync(password, user.password);

        if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        return res.json({ token, user });
    });
});


router.post('/signup', async (req, res) => {
    const { first_name, last_name, email, phone, password, level, goals } = req.body;

    // Validate input
    if (!first_name || !last_name || !email || !phone || !password || !level || !goals) {
        return res.status(400).json({ message: 'All fields are required.' });
    }

    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({ message: 'Email is invalid.' });
    }

    if (password.length < 8) {
        return res.status(400).json({ message: 'Password must be at least 8 characters long.' });
    }

    // Check if the email already exists
    db.query('SELECT * FROM users WHERE email = ?', [email], (err, results) => {
        if (err) return res.status(500).json(err);

        if (results.length > 0) {
            return res.status(409).json({ message: 'Email already exists. Please login.' });
        }

        // Hash the password
        const hashedPassword = bcrypt.hashSync(password, 10);

        // Insert new user into the database
        db.query(
            'INSERT INTO users (first_name, last_name, email, phone, password, level, goals) VALUES (?, ?, ?, ?, ?, ?, ?)',
            [first_name, last_name, email, phone, hashedPassword, level, goals],

            (err, results) => {
                if (err) return res.status(500).json(err);

               try {
                   const newUser = { id: results.insertId, first_name, last_name, email, phone, level, goals };
                   const token = jwt.sign({ id: newUser.id }, "Secret value", { expiresIn: '1h' });

                   return res.status(201).json({ token, user: newUser });
               } catch (e) {
                   console.log(e);
               }
            }
        );
    });
});

module.exports = router;