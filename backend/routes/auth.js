const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { verifyUser } = require('../middleware/auth');

// Login route
router.post('/login', verifyUser, async (req, res) => {
    try {
        // console.log('Login request body:', req.body);
        // const user = req.body;
        // console.log('User record:', user);
        const userRecord = req.userRecord;
        const userFields = userRecord.fields;
        // Generate JWT token
        const token = jwt.sign(
            { 
                id: req.userRecord.id,
                username: userFields.Username,
                role: userFields.Role
            },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );

        // localStorage.setItem("token", token);

        res.json({
            token,
            user: {
                id: req.userRecord.id,
                username: userFields.Username,
                role: userFields.Role
            }
        });
        // console.log(res);
        // res.redirect('http://localhost:3000/dashboard/admin');
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router; 