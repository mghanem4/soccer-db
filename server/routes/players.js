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

// Get a player by ID (including attributes)
router.get('/:id', (req, res) => {
  const playerQuery = 'SELECT * FROM Players WHERE player_id = ?';
  const attributesQuery = `
    SELECT * FROM Player_Attributes 
    WHERE player_id = ?
  `;

  // Fetch player data
  db.get(playerQuery, [req.params.id], (err, player) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }

    if (!player) {
      res.status(404).json({ error: 'Player not found.' });
      return;
    }

    // Fetch player attributes
    db.all(attributesQuery, [req.params.id], (err, attributes) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }

      res.json({
        player,
        attributes,
      });
    });
  });
});

// Add a new player
router.post('/', (req, res) => {
  const { player_name, player_country, age, contract, position } = req.body;
  const query = `
    INSERT INTO Players (player_name, player_country, age, contract, position)
    VALUES (?, ?, ?, ?, ?)
  `;
  db.run(query, [player_name, player_country, age, contract, position], function (err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ player_id: this.lastID });
  });
});

// Update a player
router.put('/:id', (req, res) => {
  const { player_name, player_country, age, contract, position } = req.body;

  const query = `
    UPDATE Players
    SET
      player_name = COALESCE(?, player_name),
      player_country = COALESCE(?, player_country),
      age = COALESCE(?, age),
      contract = COALESCE(?, contract),
      position = COALESCE(?, position)
    WHERE player_id = ?
  `;

  const params = [
    player_name || null,
    player_country || null,
    age || null,
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
