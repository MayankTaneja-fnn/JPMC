const express = require("express");
const app = express();
const dotenv = require("dotenv");
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
dotenv.config();

// Middleware
app.use(cors({
    origin : 'http://localhost:3000',
    credentials : true,
}));
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/admin', require('./routes/admin'));
app.use('/api/educator', require('./routes/educator'));

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: err.message || 'Something went wrong!' });
});

const PORT = process.env.PORT || 5000;

// Only start the server if we're not in a test environment
if (process.env.NODE_ENV !== 'test') {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}

module.exports = app;