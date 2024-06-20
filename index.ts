// src/index.ts

import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import fs from 'fs';
import path from 'path';

const app = express();
const PORT = 3000;
const dbPath = path.join(__dirname, 'db.json');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Define a route handler for the root URL
app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to the form backend server');
});

// Endpoint to check server status
app.get('/ping', (req: Request, res: Response) => {
  res.json({ success: true });
});

// Endpoint to submit a form
app.post('/submit', (req: Request, res: Response) => {
  const { name, email, phone, github_link, stopwatch_time } = req.body;

  if (!name || !email || !phone || !github_link || !stopwatch_time) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  const newSubmission = {
    name,
    email,
    phone,
    github_link,
    stopwatch_time,
  };

  fs.readFile(dbPath, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Error reading database' });
    }

    let submissions = [];
    if (data) {
      submissions = JSON.parse(data);
    }

    submissions.push(newSubmission);

    fs.writeFile(dbPath, JSON.stringify(submissions, null, 2), (err) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Error saving submission' });
      }
      res.status(201).json({ success: 'Submission saved successfully' });
    });
  });
});

// Endpoint to read submissions
app.get('/read', (req: Request, res: Response) => {
  const index = parseInt(req.query.index as string, 10);

  fs.readFile(dbPath, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Error reading database' });
    }

    const submissions = JSON.parse(data);

    if (index < 0 || index >= submissions.length) {
      return res.status(400).json({ error: 'Invalid index' });
    }

    res.json(submissions[index]);
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});