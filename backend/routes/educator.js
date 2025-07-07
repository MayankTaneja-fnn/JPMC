const express = require('express');
const router = express.Router();
const multer = require('multer');
const csv = require('csv-parser');
const fs = require('fs');
const { base, tables } = require('../config/airtable');

// Configure multer for file upload
const upload = multer({ dest: 'uploads/' });

router.post('/add-students', upload.single('file'), async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
    }

    const results = [];
    
    fs.createReadStream(req.file.path)
        .pipe(csv())
        .on('data', (data) => results.push(data))
        .on('end', async () => {
            try {
                // Process each row from CSV
                for (const row of results) {
                    const { Name, Phone } = row;
                    if (!Name || !Phone) continue;

                    // Create student record in Airtable with exact field names
                    await base(tables.STUDENTS).create({
                        "Name": Name,
                        "Phone": Phone,
                        "Next Day": 1,
                        "Day Completed": 0,
                        "Next Module": 1,
                        "Module Completed": 0,
                        "Last_Msg": "",
                        "Question Responses": "",
                        "Responses": "",
                        "Feedback": ""
                    });
                }
                // Clean up uploaded file
                fs.unlinkSync(req.file.path);
                
                res.json({ message: 'Students added successfully' });
            } catch (error) {
                console.error('Error adding students:', error);
                res.status(500).json({ error: 'Failed to add students' });
            }
        });
});

// Create a new course
router.post('/course', async (req, res) => {
    try {
        const { courseName, educatorId, module1Text } = req.body;

        // Create course in the Courses table - removed 'fields' wrapper
        const courseRecord = await base('Courses').create({
            Name: courseName,
            EducatorId: educatorId || 'default',
            Status: 'active',
            Day: 1,
            Module_1_Text: module1Text || '',
            Module_1_Link: 'https://example.com',  // Hardcoded
            // Module_1_File: 'sample.pdf',  // Hardcoded
            // Module_1_LTitle: 'Sample Title',  // Hardcoded
            // Module_1_List: JSON.stringify(['item1', 'item2']),  // Hardcoded
            // Module_1_iBody: 'Sample interactive body',  // Hardcoded
            // Module_1_iButtons: JSON.stringify(['Yes', 'No']),  // Hardcoded
            // Module_1_Question: 'Sample question?',  // Hardcoded
            // Module_1_Ans: 'Sample answer',  // Hardcoded
            // Module_1_next: '2'  // Hardcoded
        });

        res.status(201).json({
            message: 'Course created successfully',
            course: courseRecord
        });
    } catch (error) {
        console.error('Error creating course:', error);
        res.status(500).json({ error: error.message });
    }
});

// Update course content
router.post('/course/:courseId/module', async (req, res) => {
    try {
        const { courseId } = req.params;
        const { module1Text } = req.body;

        // Update the course with module data - removed fields wrapper
        const record = await base('Courses').update(courseId, {
            Module_1_Text: module1Text || ''
            // All other fields remain unchanged
        });

        res.status(200).json(record);
    } catch (error) {
        console.error('Error updating course:', error);
        res.status(500).json({ error: error.message });
    }
});

// Get all courses
router.get('/courses', async (req, res) => {
    try {
        const records = await base('Courses').select({
            view: 'Grid view'
        }).all();

        const courses = records.map(record => ({
            id: record.id,
            name: record.get('Name'),
            educatorId: record.get('EducatorId'),
            status: record.get('Status'),
            day: record.get('Day'),
            module: {
                text: record.get('Module_1_Text'),
                link: record.get('Module_1_Link'),
                file: record.get('Module_1_File'),
                lTitle: record.get('Module_1_LTitle'),
                list: record.get('Module_1_List'),
                iBody: record.get('Module_1_iBody'),
                iButtons: record.get('Module_1_iButtons'),
                question: record.get('Module_1_Question'),
                ans: record.get('Module_1_Ans'),
                next: record.get('Module_1_next')
            }
        }));

        res.json(courses);
    } catch (error) {
        console.error('Error fetching courses:', error);
        res.status(500).json({ error: error.message });
    }
});

// Get a specific course
router.get('/course/:courseId', async (req, res) => {
    try {
        const { courseId } = req.params;
        const record = await base('Courses').find(courseId);

        const course = {
            id: record.id,
            name: record.get('Name'),
            educatorId: record.get('EducatorId'),
            status: record.get('Status'),
            day: record.get('Day'),
            module: {
                text: record.get('Module_1_Text'),
                link: record.get('Module_1_Link'),
                file: record.get('Module_1_File'),
                lTitle: record.get('Module_1_LTitle'),
                list: record.get('Module_1_List'),
                iBody: record.get('Module_1_iBody'),
                iButtons: record.get('Module_1_iButtons'),
                question: record.get('Module_1_Question'),
                ans: record.get('Module_1_Ans'),
                next: record.get('Module_1_next')
            }
        };

        res.json(course);
    } catch (error) {
        console.error('Error fetching course:', error);
        res.status(500).json({ error: error.message });
    }
});

// Upload students
router.post('/course/:courseId/students', upload.single('file'), async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
    }

    try {
        const { courseId } = req.params;
        const results = [];
        
        // Get course name
        const course = await base('Courses').find(courseId);
        const courseName = course.get('Name');

        // Process CSV
        fs.createReadStream(req.file.path)
            .pipe(csv())
            .on('data', (data) => results.push(data))
            .on('end', async () => {
                try {
                    // Add students to the Students table
                    for (const student of results) {
                        await base('Students').create({
                            fields: {
                                Name: student.Name,
                                Phone: student.Phone,
                                CourseId: courseId,
                                CourseName: courseName,
                                Next_Day: 1,
                                Day_Completed: 0,
                                Next_Module: 1,
                                Module_Completed: 0,
                                Last_Msg: '',
                                Question_Responses: '',
                                Interactive_Responses: '',
                                Responses: '',
                                Feedback: ''
                            }
                        });
                    }

                    // Delete the temporary file
                    fs.unlinkSync(req.file.path);
                    
                    res.json({ 
                        message: 'Students uploaded successfully',
                        count: results.length 
                    });
                } catch (error) {
                    console.error('Error processing students:', error);
                    res.status(500).json({ error: error.message });
                }
            });
    } catch (error) {
        console.error('Error uploading students:', error);
        res.status(500).json({ error: error.message });
    }
});

router.get('/number_students', async (req, res) => {
    try {
        const records = await base('Students').select({
            view: 'Grid view'
        }).all();

        const numberOfStudents = records.length;
        // console.log('Number of students:', numberOfStudents);
        res.json({ numberOfStudents });
    } catch (error) {
        console.error('Error fetching number of students:', error);
        res.status(500).json({ error: error.message });
    }
}
);

module.exports = router;