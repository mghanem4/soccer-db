// routes/players.js
const express = require('express');
const db = require('../db');
const router = express.Router();

// Get all players
router.get('/', (req, res) => {
  const query = 'SELECT * FROM Players';
  db.all(query, [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

// Get a player by ID
router.get('/:id', (req, res) => {
  const query = 'SELECT * FROM Players WHERE player_id = ?';
  db.get(query, [req.params.id], (err, row) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(row);
  });
});

// Add a new player
router.post('/', (req, res) => {
  const { player_name, player_country, player_dob, contract, position } = req.body;
  const query = `
    INSERT INTO Players (player_name, player_country, player_dob, contract, position)
    VALUES (?, ?, ?, ?, ?)
  `;
  db.run(query, [player_name, player_country, player_dob, contract, position], function (err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ player_id: this.lastID });
  });
});

// Update a player
router.put('/:id', (req, res) => {
  const { player_name, player_country, player_dob, contract, position } = req.body;
  const query = `
    UPDATE Players
    SET player_name = ?, player_country = ?, player_dob = ?, contract = ?, position = ?
    WHERE player_id = ?
  `;
  db.run(
    query,
    [player_name, player_country, player_dob, contract, position, req.params.id],
    function (err) {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json({ updated: this.changes });
    }
  );
});

// Delete a player
router.delete('/:id', (req, res) => {
  const query = 'DELETE FROM Players WHERE player_id = ?';
  db.run(query, [req.params.id], function (err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ deleted: this.changes });
  });
});

module.exports = router;
