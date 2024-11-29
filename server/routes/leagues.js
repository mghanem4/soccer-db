const express = require('express');
const router = express.Router();
const db = require('../db');

// Get all leagues
router.get('/', (req, res) => {
  const query = 'SELECT * FROM Leagues';
  db.all(query, [], (err, rows) => {
    if (err) {
      console.error('Database error:', err.message);
      res.status(500).json({ error: 'Failed to retrieve leagues.' });
      return;
    }
    res.json(rows);
  });
});

// Add a new league
router.post('/', (req, res) => {
  const { total_matches, total_teams, prize, league_name } = req.body;

  if (!total_matches || !total_teams || !league_name) {
    return res.status(400).json({ error: 'total_matches, total_teams, and league_name are required.' });
  }

  const query = `
    INSERT INTO Leagues (total_matches, total_teams, prize, league_name)
    VALUES (?, ?, ?, ?)
  `;
  const params = [total_matches, total_teams, prize || 0, league_name];

  db.run(query, params, function (err) {
    if (err) {
      console.error('Database error:', err.message);
      res.status(500).json({ error: 'Failed to add league.' });
      return;
    }
    res.status(201).json({ league_id: this.lastID });
  });
});

// Update
router.put('/:id', (req, res) => {
    const { total_matches, total_teams, prize, league_name } = req.body;
  
    const query = `
      UPDATE Leagues
      SET
        total_matches = COALESCE(?, total_matches),
        total_teams = COALESCE(?, total_teams),
        prize = COALESCE(?, prize),
        league_name = COALESCE(?, league_name)
      WHERE league_id = ?
    `;
    const params = [
      total_matches || null, // If undefined, pass null for COALESCE
      total_teams || null,
      prize || null,
      league_name || null,
      req.params.id,
    ];
  
    db.run(query, params, function (err) {
      if (err) {
        console.error('Database error:', err.message);
        res.status(500).json({ error: 'Failed to update league.' });
        return;
      }
      if (this.changes === 0) {
        res.status(404).json({ error: 'League not found.' });
        return;
      }
      res.json({ message: 'League updated successfully.' });
    });
  });
  

// Delete a league
router.delete('/:id', (req, res) => {
  const query = 'DELETE FROM Leagues WHERE league_id = ?';
  db.run(query, [req.params.id], function (err) {
    if (err) {
      console.error('Database error:', err.message);
      res.status(500).json({ error: 'Failed to delete league.' });
      return;
    }
    if (this.changes === 0) {
      res.status(404).json({ error: 'League not found.' });
      return;
    }
    res.json({ message: 'League deleted successfully.' });
  });
});

module.exports = router;
