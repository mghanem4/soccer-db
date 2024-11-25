// routes/teams.js
const express = require('express');
const db = require('../db');
const router = express.Router();

// Get all teams
router.get('/', (req, res) => {
  const query = 'SELECT * FROM Teams';
  db.all(query, [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

// Get a team by ID
router.get('/:id', (req, res) => {
  const query = 'SELECT * FROM Teams WHERE team_id = ?';
  db.get(query, [req.params.id], (err, row) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(row);
  });
});

// Add a new team
router.post('/', (req, res) => {
  const { team_id, team_name, team_wins, team_draws, team_loses,team_trophies, goals_scored } = req.body;
  const query = `
    INSERT INTO Teams (team_name, team_wins, team_draws, team_loses,team_trophies, goals_scored)
    VALUES (?, ?, ?, ?, ?,?)
  `;
  db.run(query, [team_name, team_wins, team_draws, team_loses,team_trophies, goals_scored], function (err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ team_id: this.lastID });
  });
});



// Update a team
router.put('/:id', (req, res) => {
  const { id } = req.params; // Team ID from the URL
  const {
    team_name,
    team_wins,
    team_draws,
    team_loses,
    team_trophies,
    goals_scored,
  } = req.body;

  const query = `
    UPDATE Teams
    SET
      team_name = COALESCE(?, team_name),
      team_wins = COALESCE(?, team_wins),
      team_draws = COALESCE(?, team_draws),
      team_loses = COALESCE(?, team_loses),
      team_trophies = COALESCE(?, team_trophies),
      goals_scored = COALESCE(?, goals_scored)
    WHERE team_id = ?
  `;

  const params = [
    team_name,
    team_wins,
    team_draws,
    team_loses,
    team_trophies,
    goals_scored,
    id,
  ];

  db.run(query, params, function (err) {
    if (err) {
      console.error('Error updating team:', err.message);
      return res.status(500).json({ error: 'Failed to update team.' });
    }
    res.json({ message: 'Team updated successfully.' });
  });
})


// Delete a team
router.delete('/:id', (req, res) => {
  const query = 'DELETE FROM Teams WHERE team_id = ?';
  db.run(query, [req.params.id], function (err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ deleted: this.changes });
  });
});

module.exports = router;
