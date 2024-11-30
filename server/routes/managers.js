const express = require('express');
const router = express.Router();
const db = require('../db');

// Get all managers
router.get('/', (req, res) => {
  const query = 'SELECT * FROM Managers';
  db.all(query, [], (err, rows) => {
    if (err) {
      console.error('Database error:', err.message);
      res.status(500).json({ error: 'Failed to retrieve managers.' });
      return;
    }
    res.json(rows);
  });
});

// Add a manager
router.post('/', (req, res) => {
  const { manager_name, age, manager_country } = req.body;

  if (!manager_name || !age || !manager_country) {
    return res.status(400).json({ error: 'manager_name, age, and manager_country are required.' });
  }

  const query = `
    INSERT INTO Managers (manager_name, age, manager_country)
    VALUES (?, ?, ?)
  `;
  const params = [manager_name, age, manager_country];

  db.run(query, params, function (err) {
    if (err) {
      console.error('Database error:', err.message);
      res.status(500).json({ error: 'Failed to add manager.' });
      return;
    }
    res.status(201).json({ manager_id: this.lastID });
  });
});

// Update a manager
router.put('/:id', (req, res) => {
  const { manager_name, age, manager_country } = req.body;

  const query = `
    UPDATE Managers
    SET
      manager_name = COALESCE(?, manager_name),
      age = COALESCE(?, age),
      manager_country = COALESCE(?, manager_country)
    WHERE manager_id = ?
  `;
  const params = [
    manager_name || null,
    age || null,
    manager_country || null,
    req.params.id,
  ];

  db.run(query, params, function (err) {
    if (err) {
      console.error('Database error:', err.message);
      res.status(500).json({ error: 'Failed to update manager.' });
      return;
    }
    if (this.changes === 0) {
      res.status(404).json({ error: 'Manager not found.' });
      return;
    }
    res.json({ message: 'Manager updated successfully.' });
  });
});

// Delete a manager
router.delete('/:id', (req, res) => {
  const query = 'DELETE FROM Managers WHERE manager_id = ?';
  db.run(query, [req.params.id], function (err) {
    if (err) {
      console.error('Database error:', err.message);
      res.status(500).json({ error: 'Failed to delete manager.' });
      return;
    }
    if (this.changes === 0) {
      res.status(404).json({ error: 'Manager not found.' });
      return;
    }
    res.json({ message: 'Manager deleted successfully.' });
  });
});

module.exports = router;
