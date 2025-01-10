const express = require('express');
const db = require('../config/db.js');
const router = express.Router();

// Create Group
router.post('/', (req, res) => {
    const { name } = req.body;
    db.query('INSERT INTO groups (name) VALUES (?)', [name], (err, results) => {
        if (err) return res.status(500).json(err);
        return res.status(201).json({ id: results.insertId, name });
    });
});

// Read Groups
router.get('/', (req, res) => {
    db.query('SELECT * FROM groups', (err, results) => {
        if (err) return res.status(500).json(err);
        return res.json(results);
    });
});

// Update Group
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    db.query('UPDATE groups SET name = ? WHERE id = ?', [name, id], (err) => {
        if (err) return res.status(500).json(err);
        return res.json({ id, name });
    });
});

// Delete Group
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM groups WHERE id = ?', [id], (err) => {
        if (err) return res.status(500).json(err);
        return res.status(204).send();
    });
});

module.exports = router;