const express = require('express');
const router = express.Router();
const { base, tables } = require('../config/airtable');

// Get student profile
router.get('/profile/:id', async (req, res) => {
    try {
        const student = await base(tables.STUDENTS).find(req.params.id);
        if (!student) {
            return res.status(404).json({ error: 'Student not found' });
        }
        res.json(student);
    } catch (error) {
        console.error('Error fetching student:', error);
        res.status(500).json({ error: 'Failed to fetch student profile' });
    }
});

module.exports = router; 