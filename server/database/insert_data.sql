INSERT INTO Players (player_name, player_country, age, position) VALUES
('Cristiano Ronaldo', 'Portugal', 38, 'Forward'),
('Lionel Messi', 'Argentina', 36, 'Forward'),
('Kylian Mbappé', 'France', 24, 'Forward'),
('Luka Modric', 'Croatia', 37, 'Midfielder'),
('Virgil van Dijk', 'Netherlands', 32, 'Defender');

INSERT INTO Managers (manager_name, age, manager_country) VALUES
('Pep Guardiola', 52, 'Spain'),
('Jurgen Klopp', 56, 'Germany'),
('Carlo Ancelotti', 64, 'Italy');

INSERT INTO Teams (team_name, team_wins, team_draws, team_loses, goals_scored) VALUES
('Manchester United', 20, 10, 8, 70),
('Real Madrid', 25, 5, 3, 85),
('Paris Saint-Germain', 28, 3, 7, 90);

INSERT INTO Leagues (total_matches, total_teams, prize, league_name, league_trophy_id) VALUES
(38, 20, 50000000, 'Premier League', 5),
(38, 20, 40000000, 'La Liga', 4),
(38, 18, 60000000, 'Ligue 1', 3);

INSERT INTO Trophies (trophy_name, trophy_type) VALUES
('Ballon dOr', 'Individual'),
('Champions League', 'Team'),
('Ligue 1 Title', 'League'),
('La Liga Title', 'League'),
('Premier League Title', 'League');


INSERT INTO Player_Trophies (player_id, trophy_id, year_awarded) VALUES
(1, 1, 2023), -- Cristiano Ronaldo won Ballon d'Or
(2, 1, 2022), -- Lionel Messi won Ballon d'Or
(2, 2, 2015), -- Lionel Messi won Champions League
(3, 2, 2020); -- Kylian Mbappé won Champions League

INSERT INTO Team_Trophies (team_id, trophy_id, year_awarded) VALUES
(2, 2, 2022), -- Real Madrid won Champions League
(3, 3, 2021); -- Paris Saint-Germain won Ligue 1 Title


INSERT INTO Player_Attributes (player_id, season_year, penalties, positioning, interceptions, sliding_tackle, preferred_foot, attacking_work_rate, defensive_work_rate, finishing, heading_accuracy, short_passing, dribbling, long_passing, ball_control, acceleration, sprint_speed, shot_power, long_shots) VALUES
(1, 2023, 90, 85, 40, 35, 'right', 'high', 'medium', 95, 88, 82, 85, 77, 89, 91, 87, 94, 88), -- Cristiano Ronaldo
(2, 2023, 88, 92, 50, 42, 'left', 'high', 'medium', 94, 85, 89, 96, 80, 92, 90, 89, 91, 86), -- Lionel Messi
(3, 2023, 85, 84, 45, 38, 'right', 'high', 'medium', 93, 83, 80, 90, 78, 86, 96, 93, 92, 88); -- Kylian Mbappé

INSERT INTO Player_Team (player_id, team_id, start_date, end_date, player_team_goals, player_matches, player_team_expected_goals) VALUES
(1, 2, '2009-07-01', '2018-07-10', 450, 438, 0.95), -- Cristiano Ronaldo at Real Madrid
(2, 2, '2000-07-01', '2021-08-10', 672, 778, 0.86), -- Lionel Messi at Barcelona
(3, 3, '2017-07-01', NULL, 212, 260, 0.85); -- Kylian Mbappé at Paris Saint-Germain

INSERT INTO Team_league (league_id, team_id, titles_won) VALUES
(1, 1, 20), -- Manchester United in Premier League
(2, 2, 35), -- Real Madrid in La Liga
(3, 3, 9);  -- Paris Saint-Germain in Ligue 1

INSERT INTO Manager_Team (manager_id, team_id, start_date, end_date) VALUES
(1, 2, '2013-07-01', '2016-06-30'), -- Pep Guardiola managed Real Madrid
(2, 1, '2015-10-01', NULL), -- Jurgen Klopp managing Manchester United
(3, 3, '2019-07-01', NULL); -- Carlo Ancelotti managing Paris Saint-Germain




