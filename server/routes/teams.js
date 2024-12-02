// routes/teams.js
const express = require('express');
const db = require('../db');
const router = express.Router();

// Get teams with their trophies
router.get('/', (req, res) => {
  const query = `
    SELECT 
      Teams.team_id, 
      Teams.team_name, 
      Teams.team_wins, 
      Teams.team_draws, 
      Teams.team_loses, 
      Teams.goals_scored,
      Trophies.trophy_id, 
      Trophies.trophy_name, 
      Trophies.trophy_type, 
      Team_Trophies.year_awarded
    FROM 
      Teams
    LEFT JOIN 
      Team_Trophies ON Teams.team_id = Team_Trophies.team_id
    LEFT JOIN 
      Trophies ON Team_Trophies.trophy_id = Trophies.trophy_id;
  `;
  db.all(query, [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
});

// Get all the players that play in a team using player_team table
router.get('/:id/players', (req, res) => {
  const query = `
    SELECT 
      Players.player_id, 
      Players.player_name, 
      Players.player_country, 
      Players.age, 
      Players.position
    FROM 
      Players
    LEFT JOIN 
      Player_Team ON Players.player_id = Player_Team.player_id
    WHERE 
      Player_Team.team_id = ?
  `;
  db.all(query, [req.params.id], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
});








// Add a trophy to a team
router.post('/:id/trophies', (req, res) => {
  const { trophy_id, year_awarded } = req.body;
  const query = `
    INSERT INTO Team_Trophies (team_id, trophy_id, year_awarded)
    VALUES (?, ?, ?)
  `;
  db.run(query, [req.params.id, trophy_id, year_awarded], function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ message: 'Trophy added to team successfully.' });
  });
});

// Delete a trophy from a team
router.delete('/:id/trophies/:trophy_id', (req, res) => {
  const query = `
    DELETE FROM Team_Trophies
    WHERE team_id = ? AND trophy_id = ?
  `;
  db.run(query, [req.params.id, req.params.trophy_id], function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (this.changes === 0) {
      return res.status(404).json({ error: 'Trophy not found for this team.' });
    }
    res.json({ message: 'Trophy removed from team successfully.' });
  });
});

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
  const { team_name, team_wins, team_draws, team_loses, goals_scored } = req.body;
  const query = `
    INSERT INTO Teams (team_name, team_wins, team_draws, team_loses, goals_scored)
    VALUES (?, ?, ?, ?, ?)
  `;
  db.run(query, [team_name, team_wins, team_draws, team_loses, goals_scored], function (err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ team_id: this.lastID }); // Send back the created team_id
  });
});

// Update a team
router.put('/:id', (req, res) => {
  const { id } = req.params; // Team ID from the URL
  const { team_name, team_wins, team_draws, team_loses, goals_scored } = req.body;

  const query = `
    UPDATE Teams
    SET
      team_name = COALESCE(?, team_name),
      team_wins = COALESCE(?, team_wins),
      team_draws = COALESCE(?, team_draws),
      team_loses = COALESCE(?, team_loses),
      goals_scored = COALESCE(?, goals_scored)
    WHERE team_id = ?
  `;

  const params = [team_name, team_wins, team_draws, team_loses, goals_scored, id];

  db.run(query, params, function (err) {
    if (err) {
      console.error('Error updating team:', err.message);
      return res.status(500).json({ error: 'Failed to update team.' });
    }
    res.json({ message: 'Team updated successfully.' });
  });
});

// Delete a team and its trophies
router.delete('/:id', (req, res) => {
  const teamId = req.params.id;

  // Step 1: Delete trophies associated with the team
  const deleteTrophiesQuery = 'DELETE FROM Team_Trophies WHERE team_id = ?';
  db.run(deleteTrophiesQuery, [teamId], function (err) {
    if (err) {
      console.error('Error deleting team trophies:', err.message);
      return res.status(500).json({ error: 'Failed to delete team trophies.' });
    }

    // Step 2: Delete the team itself
    const deleteTeamQuery = 'DELETE FROM Teams WHERE team_id = ?';
    db.run(deleteTeamQuery, [teamId], function (err) {
      if (err) {
        console.error('Error deleting team:', err.message);
        return res.status(500).json({ error: 'Failed to delete team.' });
      }

      if (this.changes === 0) {
        return res.status(404).json({ error: 'Team not found.' });
      }

      res.json({ message: 'Team and its trophies deleted successfully.' });
    });
  });
});
// Route to delete all trophies associated with a specific team
router.delete('/:id/trophies', (req, res) => {
  const teamId = req.params.id;

  const query = 'DELETE FROM Team_Trophies WHERE team_id = ?';
  db.run(query, [teamId], function (err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ message: 'Team trophies deleted successfully.', deleted: this.changes });
  });
});

module.exports = router;
