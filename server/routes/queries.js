const express = require('express');
const db = require('../db');
const router = express.Router();

// Get the player with the most goals
router.get('/most-goals', (req, res) => {
  const query = `
    SELECT p.player_name, SUM(pt.player_team_goals) AS total_goals
    FROM Players p
    JOIN Player_Team pt ON p.player_id = pt.player_id
    GROUP BY p.player_id
    ORDER BY total_goals DESC
    LIMIT 1;
  `;
  db.get(query, [], (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(row);
  });
});

// Get players with a preferred foot of right
router.get('/preferred-foot-right', (req, res) => {
  const query = `
    SELECT p.player_name
    FROM Players p
    JOIN Player_Attributes pa ON p.player_id = pa.player_id
    WHERE pa.preferred_foot = 'right';
  `;
  db.all(query, [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// Get players below the age of 26
router.get('/below-age-26', (req, res) => {
  const query = `
    SELECT player_name, age
    FROM Players
    WHERE age < 26;
  `;
  db.all(query, [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// Get the players with the most trophies
router.get('/most-trophies', (req, res) => {
  const query = `
    SELECT p.player_name, COUNT(pt.trophy_id) AS total_trophies
    FROM Players p
    JOIN Player_Trophies pt ON p.player_id = pt.player_id
    GROUP BY p.player_id
    ORDER BY total_trophies DESC
    LIMIT 1;
  `;
  db.get(query, [], (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(row);
  });
});

// Get the team with the most wins
router.get('/most-wins', (req, res) => {
  const query = `
    SELECT team_name, team_wins
    FROM Teams
    ORDER BY team_wins DESC
    LIMIT 1;
  `;
  db.get(query, [], (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(row);
  });
});

router.get('/most-losses', (req, res) => {
    const query = `
      SELECT team_name, team_loses
      FROM Teams
      ORDER BY team_loses DESC
      LIMIT 1;
    `;
    db.get(query, [], (err, row) => { // Include 'row' parameter
      if (err) return res.status(500).json({ error: err.message });
      res.json(row); // 'row' will now have the query result
    });
  });
  

// Get the team with the most trophies
router.get('/most-team-trophies', (req, res) => {
  const query = `
    SELECT t.team_name, COUNT(tt.trophy_id) AS total_trophies
    FROM Teams t
    JOIN Team_Trophies tt ON t.team_id = tt.team_id
    GROUP BY t.team_id
    ORDER BY total_trophies DESC
    LIMIT 1;
  `;
  db.get(query, [], (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(row);
  });
});

module.exports = router;
