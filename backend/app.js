const express = require('express');
const cors = require('cors');
const port = 3000;

const app = express();
app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/auth', require('./routes/auth'));
app.use('/api/groups', require('./routes/groups'));

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});