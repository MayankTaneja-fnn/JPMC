require('dotenv').config();
// console.log(process.env.AIRTABLE_PAT);
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const Airtable = require('airtable');

const app = express();
app.use(cors(), bodyParser.json(), morgan('dev'));
Airtable.configure({ apiKey: process.env.AIRTABLE_PAT });
// const airtable = new Airtable({endpointUrl: 'https://api-airtable-com-8hw7i1oz63iz.runscope.net/'})
const base = new Airtable({ apiKey: process.env.AIRTABLE_PAT })
               .base(process.env.AIRTABLE_BASE_ID);
            //    const airtable = new Airtable({endpointUrl: 'https://api-airtable-com-8hw7i1oz63iz.runscope.net/'})
const TABLE = 'Testtable'; // replace with your table name

// Create
app.post('/items', async (req, res) => {
    try {
      const record = await base(TABLE).create(req.body);
      res.status(201).json(record);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
  

// // Read All
app.get('/items', async (req, res) => {
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

// Update
app.patch('/items/:id', async (req, res) => {
    try {
      const record = await base(TABLE).update(req.params.id, req.body);
      res.json(record);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

// Delete
app.delete('/items/:id', async (req, res) => {
    try {
      await base(TABLE).destroy(req.params.id);
      res.sendStatus(204);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

app.listen(3000, () => console.log('Server running on port 3000'));
