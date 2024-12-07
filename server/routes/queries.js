const express = require('express');
const db = require('../db');
const router = express.Router();

/* This file contains all the queries in the query page*/


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
    if (err) return res.status(500).json({ error: err.message,query });
    res.json({query, result:row});
  });
});

router.get('/player-trophies', (req, res) => {
  const query = `
  SELECT 
        p.player_id,
        p.player_name,  
        COUNT(pt.trophy_id) AS trophies_won
    FROM 
        Player_Trophies pt
    JOIN 
        Players p ON pt.player_id = p.player_id
    GROUP BY 
        p.player_id, p.player_name
    ORDER BY 
        trophies_won DESC;
  `;
  db.all(query, [], (err, row) => {
    if (err) return res.status(500).json({ error: err.message,query });
    res.json({query, result:row});
  });
});
// Get players with a preferred foot of right
router.get('/preferred-foot-right', (req, res) => {
  const query = `
    SELECT DISTINCT p.player_name
    FROM Players p
    JOIN Player_Attributes pa ON p.player_id = pa.player_id
    WHERE pa.preferred_foot = 'Right';
  `;
  db.all(query, [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message,query });
    res.json({query, result:rows});
  });
});

router.get('/all-player-teams', (req, res) => {
  const query = `SELECT 
    p.player_id,
    p.player_name,
    t.team_id,
    t.team_name,
    pt.start_date,
    pt.end_date
FROM 
    Player_Team pt
JOIN 
    Players p ON pt.player_id = p.player_id
JOIN 
    Teams t ON pt.team_id = t.team_id
ORDER BY 
    p.player_name, t.team_name;
    `;
    db.all(query, [], (err, rows) => {
      if (err) return res.status(500).json({ error: err.message,query });
      res.json({query, result:rows});
    });
  });

router.get('/high-work-rate', (req, res) => {
  const query = `
    SELECT DISTINCT p.player_name
    FROM Players p
    JOIN Player_Attributes pa ON p.player_id = pa.player_id
    WHERE pa.attacking_work_rate = 'High' AND pa.defensive_work_rate = 'High';
  `;
  db.all(query, [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message,query });
    res.json({query, result:rows});
  });
});

router.get('/best-attribute/:attribute', (req, res) => {
  const validAttributes = ['dribbling', 'pace', 'shooting', 'passing', 'physicality'];
  const { attribute } = req.params;

  if (!validAttributes.includes(attribute.toLowerCase())) {
    return res.status(400).json({ error: `Invalid attribute: ${attribute}` });
  }

  const query = `
    SELECT 
      p.player_name, 
      pa.${attribute} AS attribute_value
    FROM 
      Player_Attributes pa
    JOIN 
      Players p ON pa.player_id = p.player_id
    ORDER BY 
      pa.${attribute} DESC
    LIMIT 1;
  `;

  db.get(query, [], (err, row) => {
    if (err) return res.status(500).json({ error: err.message, query });
    res.json({ query, result: row });
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
    if (err) return res.status(500).json({ error: err.message,query });
    res.json({query, result:rows});
  });
});

// Get the players with the most trophies
router.get('/most-trophies', (req, res) => {
  // limiting by 1 to get only the player with the most trophies
  const query = `
    SELECT p.player_name, COUNT(pt.trophy_id) AS total_trophies
    FROM Players p
    JOIN Player_Trophies pt ON p.player_id = pt.player_id
    GROUP BY p.player_id
    ORDER BY total_trophies DESC
    LIMIT 1;
  `;
  db.get(query, [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message,query });
    res.json({query, result:rows});
  });
});

// Get the team with the most wins
router.get('/most-wins', (req, res) => {
  // limiting by 1 to get only the team with the most wins
  const query = `
    SELECT team_name, team_wins
    FROM Teams
    ORDER BY team_wins DESC
    LIMIT 1;
  `;
  db.get(query, [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message,query });
    res.json({query, result:rows});
  });
});

router.get('/most-losses', (req, res) => {
  // limiting by 1 to get only the team with the most losses
    const query = `
      SELECT team_name, team_loses
      FROM Teams
      ORDER BY team_loses DESC
      LIMIT 1;
    `;
    db.get(query, [], (err, rows) => {
      if (err) return res.status(500).json({ error: err.message,query });
      res.json({query, result:rows});
    });
  });
  

// Get the team with the most trophies
router.get('/most-team-trophies', (req, res) => {
  const query = `
  SELECT t.team_name, COUNT(tt.trophy_id) AS total_trophies
  FROM Teams t
  JOIN Team_Trophies tt ON t.team_id = tt.team_id
  GROUP BY t.team_id
  HAVING COUNT(tt.trophy_id) = (
    SELECT MAX(total_trophies)
  FROM (
    SELECT COUNT(tt.trophy_id) AS total_trophies
    FROM Teams t
    JOIN Team_Trophies tt ON t.team_id = tt.team_id
    GROUP BY t.team_id
  ) AS trophy_counts
);
  `;
  db.get(query, [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message,query });
    res.json({query, result:rows});
  });
});

module.exports = router;
