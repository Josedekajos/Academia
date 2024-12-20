// contains some of the main fuctionalities of the app
const express = require('express');
const router = express.Router();

// Example route
router.get('/hello', (req, res) => {
    res.send('Hello from Express!');
});

module.exports = router;
