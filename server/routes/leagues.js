const express = require('express');
const db = require('../db');
const router = express.Router();

// Get all leagues
router.get('/', (req, res) => {
  const query = 'SELECT * FROM Leagues';
  db.all(query, [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

// Add a league
router.post('/', (req, res) => {
  const { league_name, total_matches, total_teams, prize, league_trophy_id } = req.body;

  if (!league_name || !total_matches || !total_teams) {
    return res.status(400).json({ error: 'League name, total matches, and total teams are required.' });
  }

  const query = `
    INSERT INTO Leagues (league_name, total_matches, total_teams, prize, league_trophy_id)
    VALUES (?, ?, ?, ?, ?)
  `;

  db.run(query, [league_name, total_matches, total_teams, prize || 0, league_trophy_id || null], function (err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ league_id: this.lastID });
  });
});

module.exports = router;

// Update
router.put('/:id', (req, res) => {
    const { total_matches, total_teams, prize, league_name,league_trophy_id } = req.body;
  
    const query = `
      UPDATE Leagues
      SET
        total_matches = COALESCE(?, total_matches),
        total_teams = COALESCE(?, total_teams),
        prize = COALESCE(?, prize),
        league_name = COALESCE(?, league_name)
        league_trophy_id = COALESCE(?, league_trophy_id)

      WHERE league_id = ?
    `;
    const params = [
      total_matches || null, // If undefined, pass null for COALESCE
      total_teams || null,
      prize || null,
      league_name || null,
      league_trophy_id || null,
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
