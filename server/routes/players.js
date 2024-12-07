const express = require('express');
const db = require('../db');
const router = express.Router();

// // Get all players
// router.get('/', (req, res) => {
//   const query = `
//     SELECT 
//       Players.player_id, 
//       Players.player_name, 
//       Players.player_country, 
//       Players.age, 
//       Players.position,
//       Trophies.trophy_id,
//       Trophies.trophy_name,
//       Trophies.trophy_type,
//       Player_Trophies.year_awarded
//     FROM 
//       Players
//     LEFT JOIN 
//       Player_Trophies ON Players.player_id = Player_Trophies.player_id
//     LEFT JOIN 
//       Trophies ON Player_Trophies.trophy_id = Trophies.trophy_id;
//   `;
//   db.all(query, [], (err, rows) => {
//     if (err) {
//       res.status(500).json({ error: err.message });
//       return;
//     }
//     res.json(rows);
//   });
// });
// get all players
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
router.post('/:id/team', (req, res) => {
  const { player_id, team_id, start_date } = req.body;

  // Validate required fields
  if (!player_id || !team_id || !start_date) {
    return res.status(400).json({ error: 'player_id, team_id, and start_date are required' });
  }

  const query = `
    INSERT INTO Player_Team (player_id, team_id, start_date)
    VALUES (?, ?, ?)
  `;

  db.run(query, [player_id, team_id, start_date], function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    // Respond with the ID of the created entry
    res.json({ message: 'Player successfully added to team', player_team_id: this.lastID });
  });
});

// Update player's team
router.put('/:id/team', (req, res) => {
  const { team_id, start_date, end_date } = req.body;

  if (!team_id) {
    return res.status(400).json({ error: 'Team ID is required.' });
  }
// I am using COALESCE to update only the fields that are provided in the request body
// I am using ON CONFLICT DO UPDATE to update the start_date and end_date if the player is already in the team
  const query = `
    INSERT INTO Player_Team (player_id, team_id, start_date, end_date)
    VALUES (?, ?, ?, ?)
    ON CONFLICT(player_id, team_id) DO UPDATE SET
      start_date = COALESCE(?, start_date),
      end_date = COALESCE(?, end_date)
  `;

  db.run(
    query,
    [req.params.id, team_id, start_date || null, end_date || null, start_date || null, end_date || null],
    function (err) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }

      res.json({ message: 'Player team updated successfully.' });
    }
  );
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

// Add a player to a team
router.post('/:player_id/team', (req, res) => {
  const { player_id } = req.params; // Player ID from the route parameter
  const { team_id, start_date, end_date, player_team_goals, player_matches, player_team_expected_goals } = req.body; // Team info from the request body

  // Validate required fields
  if (!player_id || !team_id || !start_date) {
    return res.status(400).json({ error: 'Player ID, Team ID, and Start Date are required.' });
  }

  const query = `
    INSERT INTO Player_Team (
      player_id, 
      team_id, 
      start_date, 
      end_date, 
      player_team_goals, 
      player_matches, 
      player_team_expected_goals
    ) 
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;

  db.run(
    query,
    [
      player_id,
      team_id,
      start_date,
      end_date || null, // Allow null for optional fields
      player_team_goals || 0,
      player_matches || 0,
      player_team_expected_goals || 0.0,
    ],
    function (err) {
      if (err) {
        console.error('Database error:', err.message);
        return res.status(500).json({ error: 'Failed to add player to team.' });
      }

      // Respond with success and the new Player-Team ID
      res.status(201).json({ 
        message: 'Player added to team successfully.',
        player_team_id: this.lastID
      });
    }
  );
});



// Update an existing player
router.put('/:id', (req, res) => {
  const { player_name, player_country, age, position } = req.body;
// I am using COALESCE to update only the fields that are provided in the request body
// this gives the flexibility to update only the player_name or player_country or age or position or all
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

  // 1: Delete trophies associated with the player
  const deleteTrophiesQuery = 'DELETE FROM Player_Trophies WHERE player_id = ?';
  db.run(deleteTrophiesQuery, [playerId], function (err) {
    if (err) {
      console.error('Error deleting player trophies:', err.message);
      return res.status(500).json({ error: 'Failed to delete player trophies.' });
    }
    // 2: Delete the player from their team.
    const deleteFromPlayerTeamQuery = 'DELETE FROM Player_Team WHERE player_id = ?';
    db.run(deleteFromPlayerTeamQuery, [playerId], function (err) {
      if (err) {
        console.error('Error deleting from Player_Team:', err.message);
        return res.status(500).json({ error: 'Failed to delete player from Player_Team.' });
      }
    })

    // 3: Delete the player and the player attributes
    const deletePlayerAttrQuery = 'DELETE FROM Player_Attributes WHERE player_id = ?';
    db.run(deletePlayerAttrQuery, [playerId], function (err) {
      if (err) {
        console.error('Error deleting player attributes:', err.message);
        return res.status(500).json({ error: 'Failed to delete player attributes.' });
      }
      // Successful deletion
      res.status(200).json({ message: 'Player attributes deleted successfully.' });
    });
        
    // 3: Delete the player
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


// Get player stats (attributes) by player ID
router.get('/:id/stats', (req, res) => {
  const playerId = req.params.id;

  const query = `
    SELECT 
        *
    FROM 
      Player_Attributes
    WHERE 
      player_id = ?
  `;

  db.all(query, [playerId], (err, rows) => {
    if (err) {
      console.error('Error fetching player stats:', err.message);
      return res.status(500).json({ error: 'Failed to fetch player stats.' });
    }

    if (rows.length === 0) {
      return res.status(404).json({ error: 'No stats found for this player.' });
    }

    res.json({ stats: rows });
  });
});


module.exports = router;
