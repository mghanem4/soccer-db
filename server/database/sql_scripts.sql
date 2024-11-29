SELECT 
    pt.player_id, 
    p.player_name,
    pt.team_id, 
    t.team_name, 
    p.contract, 
    pt.player_team_goals
FROM 
    Players p
NATURAL JOIN 
    Player_Team pt
NATURAL JOIN 
    Teams t;
