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
    SET
      player_name = COALESCE(?, player_name),
      player_country = COALESCE(?, player_country),
      player_dob = COALESCE(?, player_dob),
      contract = COALESCE(?, contract),
      position = COALESCE(?, position)
    WHERE player_id = ?
  `;

  const params = [
    player_name || null,
    player_country || null,
    player_dob || null,
    contract || null,
    position || null,
    req.params.id,
  ];

  db.run(query, params, function (err) {
    if (err) {
      console.error('Database error:', err.message);
      return res.status(500).json({ error: 'Failed to update player.' });
    }

    if (this.changes === 0) {
      return res.status(404).json({ error: 'Player not found.' });
    }

    res.json({ message: 'Player updated successfully.' });
  });
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
