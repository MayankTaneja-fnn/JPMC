const express = require('express');
const router = express.Router();
const multer = require('multer');
const csv = require('csv-parser');
const fs = require('fs');
const { base } = require('../config/airtable');

// Configure multer for file upload
const upload = multer({ dest: 'uploads/' });

// Configure Airtable
const TABLE = 'Users';

// Create initial admin (this should be properly secured in production)
router.post('/create-initial-admin', async (req, res) => {
    try {
        const { username, password } = req.body;
        
        if (!username || !password) {
            return res.status(400).json({ error: 'Username and password are required' });
        }

        // Check if admin already exists
        const existingAdmins = await base(TABLE)
            .select({
                filterByFormula: `Role = 'admin'`
            })
            .firstPage();

        if (existingAdmins.length > 0) {
            return res.status(400).json({ error: 'Admin already exists' });
        }

        // Create admin user
        await base(TABLE).create({
            Username: username,
            Password: password,
            Role: 'admin',
            Status: 'active'
        });

        res.json({ message: 'Admin created successfully' });
    } catch (error) {
        console.error('Error creating admin:', error);
        res.status(500).json({ error: 'Failed to create admin' });
    }
});

// Add educators via CSV
router.post('/add-educators', upload.single('file'), async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
    }

    console.log('Processing file:', req.file);

    const results = [];
    
    fs.createReadStream(req.file.path)
        .pipe(csv())
        .on('data', (data) => results.push(data))
        .on('end', async () => {
            try {
                // Process each row from CSV
                for (const row of results) {
                    const username = row.username;
                    if (!username) continue;

                    // Create educator record in Airtable
                    await base(TABLE).create({
                        Username: username,
                        Password: 'defaultPassword123', // hardcoded password as requested
                        Role: 'educator',
                        Status: 'active'
                    });
                }

                // Clean up uploaded file
                fs.unlinkSync(req.file.path);
                
                res.json({ message: 'Educators added successfully' });
            } catch (error) {
                console.error('Error adding educators:', error);
                res.status(500).json({ error: 'Failed to add educators' });
            }
        });
});

// Create a new user
router.post('/', async (req, res) => {
  try {
    const record = await base(TABLE).create(req.body);
    res.status(201).json(record);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// Get all users
router.get('/', async (req, res) => {
  try {
    const all = [];
    await base(TABLE).select({ view: 'Grid view' }).eachPage((records, next) => {
      records.forEach(r => all.push(r));
      next();
    });
    res.json(all);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update a user
router.patch('/:id', async (req, res) => {
  try {
    const record = await base(TABLE).update(req.params.id, req.body);
    res.json(record);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete a user
router.delete('/:id', async (req, res) => {
  try {
    await base(TABLE).destroy(req.params.id);
    res.sendStatus(204);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all courses (monitoring)
router.get('/courses', async (req, res) => {
    try {
        const records = await base('EducatorCourseMap').select({
            view: 'Grid view'
        }).all();

        const courses = records.map(record => ({
            courseName: record.get('CourseName'),
            educatorIds: record.get('EducatorIds').split(','),
            status: record.get('Status')
        }));

        res.json(courses);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get all educators and their courses (monitoring)
router.get('/educators/courses', async (req, res) => {
    try {
        const records = await base('EducatorCourseMap').select({
            view: 'Grid view'
        }).all();

        // Group courses by educator
        const educatorCourses = {};
        records.forEach(record => {
            const educatorIds = record.get('EducatorIds').split(',');
            const courseName = record.get('CourseName');
            
            educatorIds.forEach(educatorId => {
                if (!educatorCourses[educatorId]) {
                    educatorCourses[educatorId] = [];
                }
                educatorCourses[educatorId].push({
                    courseName,
                    status: record.get('Status')
                });
            });
        });

        res.json(educatorCourses);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Disable a course (admin control)
router.post('/course/:courseName/disable', async (req, res) => {
    try {
        const { courseName } = req.params;
        
        const records = await base('EducatorCourseMap').select({
            filterByFormula: `{CourseName} = "${courseName}"`
        }).all();

        if (records.length === 0) {
            return res.status(404).json({ error: 'Course not found' });
        }

        const record = records[0];
        await base('EducatorCourseMap').update(record.id, {
            fields: {
                Status: 'disabled'
            }
        });

        res.json({ message: 'Course disabled successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// ...existing code...

// Get the number of NGOs (educators)
router.get('/number_ngos', async (req, res) => {
    try {
        const educators = [];
        await base(TABLE)
            .select({
                filterByFormula: `Role = 'educator'`
            })
            .eachPage((records, fetchNextPage) => {
                records.forEach(record => educators.push(record));
                fetchNextPage();
            });

        console.log('Number of educators:', educators.length);
        res.json({ numberOfngos: educators.length });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


module.exports = router; 