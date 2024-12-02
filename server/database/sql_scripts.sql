SELECT 
    pt.player_id, 
    p.player_name,
    pt.team_id, 
    t.team_name, 
    pt.player_team_goals
FROM 
    Players p
NATURAL JOIN 
    Player_Team pt
NATURAL JOIN 
    Teams t;



-- Join teams and leagues tables
-- SELECT
--     team_name,
--     league_name,
--     team_id,
--     league_id,
--     total_matches,
--     team_wins,
--     team_draws,
--     team_loses,
--     season_year,
--     is_participating

    
-- FROM
--     (SELECT * from Teams NATURAL JOIN Team_league)
-- NATURAL JOIN
-- Leagues;


