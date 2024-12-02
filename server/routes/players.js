const express = require('express');
const db = require('../db');
const router = express.Router();

// Get all players
router.get('/', (req, res) => {
  const query = `
    SELECT 
      Players.player_id, 
      Players.player_name, 
      Players.player_country, 
      Players.age, 
      Players.position,
      Trophies.trophy_id,
      Trophies.trophy_name,
      Trophies.trophy_type,
      Player_Trophies.year_awarded
    FROM 
      Players
    LEFT JOIN 
      Player_Trophies ON Players.player_id = Player_Trophies.player_id
    LEFT JOIN 
      Trophies ON Player_Trophies.trophy_id = Trophies.trophy_id;
  `;
  db.all(query, [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

// Get a specific player by ID
router.get('/:id', (req, res) => {
  const query = 'SELECT * FROM Players WHERE player_id = ?';
  db.get(query, [req.params.id], (err, player) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }

    if (!player) {
      res.status(404).json({ error: 'Player not found.' });
      return;
    }

    res.json(player);
  });
});

// Add a new player
router.post('/', (req, res) => {
  const { player_name, player_country, age, position } = req.body;

  if (!player_name || !player_country || !age || !position) {
    res.status(400).json({ error: 'All player fields are required.' });
    return;
  }

  const query = `
    INSERT INTO Players (player_name, player_country, age, position)
    VALUES (?, ?, ?, ?)
  `;
  db.run(query, [player_name, player_country, age, position], function (err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ player_id: this.lastID });
  });
});

// Update an existing player
router.put('/:id', (req, res) => {
  const { player_name, player_country, age, position } = req.body;

  const query = `
    UPDATE Players
    SET
      player_name = COALESCE(?, player_name),
      player_country = COALESCE(?, player_country),
      age = COALESCE(?, age),
      position = COALESCE(?, position)
    WHERE player_id = ?
  `;

  db.run(
    query,
    [player_name || null, player_country || null, age || null, position || null, req.params.id],
    function (err) {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }

      if (this.changes === 0) {
        res.status(404).json({ error: 'Player not found.' });
      } else {
        res.json({ message: 'Player updated successfully.' });
      }
    }
  );
});

// Assign a trophy to a player
router.post('/:id/trophies', (req, res) => {
  const { trophy_id, year_awarded } = req.body;

  if (!trophy_id || !year_awarded) {
    res.status(400).json({ error: 'Trophy ID and Year Awarded are required.' });
    return;
  }

  // Ensure the trophy is of type 'Individual'
  const trophyQuery = 'SELECT trophy_type FROM Trophies WHERE trophy_id = ?';
  db.get(trophyQuery, [trophy_id], (err, trophy) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }

    if (!trophy || trophy.trophy_type !== 'Individual') {
      res.status(400).json({ error: 'Only individual trophies can be assigned to players.' });
      return;
    }

    const query = `
      INSERT INTO Player_Trophies (player_id, trophy_id, year_awarded)
      VALUES (?, ?, ?)
    `;
    db.run(query, [req.params.id, trophy_id, year_awarded], function (err) {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json({ message: 'Trophy assigned to player successfully.' });
    });
  });
});

// Strip a trophy from a player
router.delete('/:id/trophies/:trophy_id', (req, res) => {
  const { id, trophy_id } = req.params;

  const query = `
    DELETE FROM Player_Trophies
    WHERE player_id = ? AND trophy_id = ?
  `;
  db.run(query, [id, trophy_id], function (err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }

    if (this.changes === 0) {
      res.status(404).json({ error: 'Trophy not found for this player.' });
    } else {
      res.json({ message: 'Trophy stripped from player successfully.' });
    }
  });
});

// Delete a player and their trophies
router.delete('/:id', (req, res) => {
  const playerId = req.params.id;

  // Step 1: Delete trophies associated with the player
  const deleteTrophiesQuery = 'DELETE FROM Player_Trophies WHERE player_id = ?';
  db.run(deleteTrophiesQuery, [playerId], function (err) {
    if (err) {
      console.error('Error deleting player trophies:', err.message);
      return res.status(500).json({ error: 'Failed to delete player trophies.' });
    }

    // Step 2: Delete the player
    const deletePlayerQuery = 'DELETE FROM Players WHERE player_id = ?';
    db.run(deletePlayerQuery, [playerId], function (err) {
      if (err) {
        console.error('Error deleting player:', err.message);
        return res.status(500).json({ error: 'Failed to delete player.' });
      }

      if (this.changes === 0) {
        return res.status(404).json({ error: 'Player not found.' });
      }

      res.json({ message: 'Player and their trophies deleted successfully.' });
    });
  });
});

module.exports = router;
