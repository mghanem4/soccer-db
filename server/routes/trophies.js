const express = require('express');
const db = require('../db');
const router = express.Router();

// Get all trophies
router.get('/', (req, res) => {
  const query = 'SELECT * FROM Trophies';
  db.all(query, [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

// Get trophies for leagues or cups
router.get('/league-trophies', (req, res) => {
  const query = `SELECT * FROM Trophies WHERE trophy_type IN ('League', 'Cup')`;
  db.all(query, [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});



// Add a new trophy
router.post('/', (req, res) => {
  const { trophy_name, trophy_type } = req.body;

  if (!trophy_name || !trophy_type) {
    return res.status(400).json({ error: 'Trophy name and type are required.' });
  }

  const validTypes = ['League', 'Cup', 'Individual'];
  if (!validTypes.includes(trophy_type)) {
    return res.status(400).json({ error: `Invalid trophy type. Allowed types: ${validTypes.join(', ')}` });
  }

  const query = `
    INSERT INTO Trophies (trophy_name, trophy_type)
    VALUES (?, ?)
  `;

  db.run(query, [trophy_name, trophy_type], function (err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ trophy_id: this.lastID });
  });
});

// Update an existing trophy
router.put('/:id', (req, res) => {
  const { trophy_name, trophy_type } = req.body;

  const query = `
    UPDATE Trophies
    SET
      trophy_name = COALESCE(?, trophy_name),
      trophy_type = COALESCE(?, trophy_type)
    WHERE trophy_id = ?
  `;

  const validTypes = ['League', 'Cup', 'Individual'];
  if (trophy_type && !validTypes.includes(trophy_type)) {
    return res.status(400).json({ error: `Invalid trophy type. Allowed types: ${validTypes.join(', ')}` });
  }

  db.run(query, [trophy_name || null, trophy_type || null, req.params.id], function (err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }

    if (this.changes === 0) {
      return res.status(404).json({ error: 'Trophy not found.' });
    }

    res.json({ message: 'Trophy updated successfully.' });
  });
});
// Get only individual trophies
router.get('/individual', (req, res) => {
  const query = 'SELECT * FROM Trophies WHERE trophy_type = "Individual"';
  db.all(query, [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

// Get a specific trophy by ID
router.get('/:id', (req, res) => {
  const query = 'SELECT * FROM Trophies WHERE trophy_id = ?';
  db.get(query, [req.params.id], (err, row) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }

    if (!row) {
      res.status(404).json({ error: 'Trophy not found.' });
      return;
    }

    res.json(row);
  });
});
router.delete('/:id', (req, res) => {
  const { id } = req.params;

  // First, set league_trophy_id to NULL in leagues referencing this trophy
  const resetQuery = 'UPDATE Leagues SET league_trophy_id = NULL WHERE league_trophy_id = ?';
  db.run(resetQuery, [id], (err) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    // Then, delete the trophy
    const deleteQuery = 'DELETE FROM Trophies WHERE trophy_id = ?';
    db.run(deleteQuery, [id], function (err) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }

      if (this.changes === 0) {
        return res.status(404).json({ error: 'Trophy not found.' });
      }

      res.json({ message: 'Trophy deleted successfully.' });
    });
  });
});


module.exports = router;
