const express = require('express');
const mongoose = require('mongoose');
const CD = require('./models/cdModel');

const app = express();
const PORT = 3000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/cd_collection';

app.use(express.json());

function parseYear(value) {
  const parsed = Number(value);
  if (!Number.isInteger(parsed)) {
    return null;
  }

  return parsed;
}

function isValidMongoId(id) {
  return mongoose.Types.ObjectId.isValid(id);
}

function validateCdPayload(payload, isUpdate = false) {
  const requiredFields = ['title', 'artist', 'genre', 'year'];
  const allowedFields = new Set(requiredFields);

  for (const key of Object.keys(payload)) {
    if (!allowedFields.has(key)) {
      return `Unexpected field: ${key}`;
    }
  }

  if (!isUpdate) {
    for (const field of requiredFields) {
      if (payload[field] === undefined || payload[field] === null || payload[field] === '') {
        return `Missing required field: ${field}`;
      }
    }
  }

  if (payload.year !== undefined) {
    const parsedYear = parseYear(payload.year);
    if (parsedYear === null) {
      return 'year must be a valid integer';
    }
  }

  return null;
}

// GET /cds - Return all CDs
app.get('/cds', async (req, res) => {
  try {
    const { fields, artist, genre, before } = req.query;
    const filters = {};

    if (artist) {
      filters.artist = artist;
    }

    if (genre) {
      filters.genre = genre;
    }

    if (before !== undefined) {
      const beforeYear = parseYear(before);
      if (beforeYear === null) {
        return res.status(400).json({ error: 'before must be a valid integer year' });
      }

      filters.year = { $lt: beforeYear };
    }

    let projection = null;
    if (fields !== undefined) {
      if (fields !== 'title') {
        return res.status(400).json({ error: 'Right now, only fields=title is supported' });
      }

      projection = { _id: 0, title: 1 };
    }

    const cds = await CD.find(filters, projection);
    return res.json(cds);
  } catch (error) {
    return res.status(500).json({ error: 'Could not load CDs' });
  }
});

// POST /cds - Add a new CD
app.post('/cds', async (req, res) => {
  try {
    const validationError = validateCdPayload(req.body);
    if (validationError) {
      return res.status(400).json({ error: validationError });
    }

    const { title, artist, genre } = req.body;
    const year = parseYear(req.body.year);

    const newCd = await CD.create({ title, artist, genre, year });
    return res.status(201).json(newCd);
  } catch (error) {
    return res.status(500).json({ error: 'Could not create the CD' });
  }
});

// PUT /cds/:id - Update an existing CD
app.put('/cds/:id', async (req, res) => {
  try {
    const { id } = req.params;

    if (!isValidMongoId(id)) {
      return res.status(400).json({ error: 'Invalid CD id format' });
    }

    if (Object.keys(req.body).length === 0) {
      return res.status(400).json({ error: 'Request body cannot be empty' });
    }

    const validationError = validateCdPayload(req.body, true);
    if (validationError) {
      return res.status(400).json({ error: validationError });
    }

    const updates = { ...req.body };
    if (updates.year !== undefined) {
      updates.year = parseYear(updates.year);
    }

    const updatedCd = await CD.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true
    });

    if (!updatedCd) {
      return res.status(404).json({ error: 'CD not found' });
    }

    return res.json(updatedCd);
  } catch (error) {
    return res.status(500).json({ error: 'Could not update the CD' });
  }
});

// DELETE /cds/:id - Delete a CD
app.delete('/cds/:id', async (req, res) => {
  try {
    const { id } = req.params;

    if (!isValidMongoId(id)) {
      return res.status(400).json({ error: 'Invalid CD id format' });
    }

    const deletedCd = await CD.findByIdAndDelete(id);
    if (!deletedCd) {
      return res.status(404).json({ error: 'CD not found' });
    }

    return res.json(deletedCd);
  } catch (error) {
    return res.status(500).json({ error: 'Could not delete the CD' });
  }
});

async function startServer() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('Connected to MongoDB');

    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error.message);
    process.exit(1);
  }
}

startServer();
