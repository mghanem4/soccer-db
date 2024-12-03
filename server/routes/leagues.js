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

// Get all leagues
router.get('/:id', (req, res) => {
  const query = 'SELECT * FROM Leagues where league_id = ?';
  db.get(query, [req.params.id], (err, league) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }

    if (!league) {
      res.status(404).json({ error: 'League ID not found.' });
      return;
    }

    res.json(league);
  });
});

// get all leagues and the teams that play in them using team_league table
router.get('/:id/teams', (req, res) => {
  const query = `
    SELECT 
      Teams.team_id, 
      Teams.team_name, 
      Team_League.league_id
    FROM 
      Teams
    LEFT JOIN 
      Team_League ON Teams.team_id = Team_League.team_id
    WHERE
      Team_League.league_id = ?
  `;
  db.all(query, [req.params.id], (err, rows) => {
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
  

// Delete a league and its associated trophy
router.delete('/:id', (req, res) => {
  const leagueId = req.params.id;

  // Step 1: Retrieve the league trophy ID
  const getLeagueTrophyQuery = 'SELECT league_trophy_id FROM Leagues WHERE league_id = ?';
  db.get(getLeagueTrophyQuery, [leagueId], (err, row) => {
    if (err) {
      console.error('Error retrieving league trophy ID:', err.message);
      return res.status(500).json({ error: 'Failed to retrieve league trophy.' });
    }

    if (!row) {
      return res.status(404).json({ error: 'League not found.' });
    }

    const trophyId = row.league_trophy_id;

    // Step 2: Delete the trophy associated with the league (if exists)
    const deleteTrophyQuery = 'DELETE FROM Trophies WHERE trophy_id = ?';
    db.run(deleteTrophyQuery, [trophyId], function (err) {
      if (err) {
        console.error('Error deleting league trophy:', err.message);
        return res.status(500).json({ error: 'Failed to delete league trophy.' });
      }

      // Step 3: Delete the league
      const deleteLeagueQuery = 'DELETE FROM Leagues WHERE league_id = ?';
      db.run(deleteLeagueQuery, [leagueId], function (err) {
        if (err) {
          console.error('Error deleting league:', err.message);
          return res.status(500).json({ error: 'Failed to delete league.' });
        }

        if (this.changes === 0) {
          return res.status(404).json({ error: 'League not found.' });
        }

        res.json({ message: 'League and its associated trophy deleted successfully.' });
      });
    });
  });
});


module.exports = router;
