INSERT INTO Players (player_name, player_country, age, contract, position) VALUES
('Lionel Messi', 'Argentina', 36, 'Inter Miami', 'Forward'),
('Cristiano Ronaldo', 'Portugal', 39, 'Al Nassr', 'Forward'),
('Neymar Jr', 'Brazil', 35, 'Al Hilal', 'Forward'),
('Kylian Mbappe', 'France', 24, 'Paris Saint-Germain', 'Forward'),
('Kevin De Bruyne', 'Belgium', 33, 'Manchester City', 'Midfielder');
INSERT INTO Players (player_name, player_country, position, age) VALUES ('Bukayo Saka', 'England', 'Forward', 21);
INSERT INTO Players (player_name, player_country, position, age) VALUES ('Declan Rice', 'England', 'Forward', 24);
INSERT INTO Players (player_name, player_country, position, age) VALUES ('Martin Ødegaard', 'NOR', 'Midfielder', 24);
INSERT INTO Players (player_name, player_country, position, age) VALUES ('William Saliba', 'FRA', 'Defender', 22);
INSERT INTO Players (player_name, player_country, position, age) VALUES ('Emiliano Martínez', 'ARG', 'Goalkeeper', 30);




INSERT INTO Teams (team_name, team_wins, team_draws, team_loses, team_trophies, goals_scored) VALUES
('FC Barcelona', 25, 10, 5, 30, 80),
('Real Madrid', 30, 5, 5, 35, 100),
('Paris Saint-Germain', 28, 8, 2, 25, 90),
('Manchester City', 29, 6, 3, 20, 95),
('Bayern Munich', 32, 4, 2, 40, 105);

INSERT INTO Leagues (total_matches, total_teams, prize, league_name) VALUES
(38, 20, 5000000, 'La Liga'),
(38, 20, 4000000, 'Premier League'),
(38, 18, 3500000, 'Bundesliga'),
(38, 20, 4500000, 'Serie A'),
(38, 20, 3000000, 'Ligue 1');


INSERT INTO Player_Team (player_id, team_id, start_date, end_date, player_team_goals, player_team_expected_goals, player_matches)
VALUES
(1, 1, '2004-08-16', '2021-08-05', 30, 25.5, 20),  -- Messi at FC Barcelona
(2, 2, '2009-07-06', '2018-07-10', 35, 30.2, 25),  -- Ronaldo at Real Madrid
(3, 4, '2017-08-03', '2021-07-30', 25, 23.8, 22),  -- Neymar at Manchester City
(4, 3, '2017-07-01', '2023-06-30', 28, 26.1, 21),  -- Mbappe at Paris Saint-Germain
(5, 5, '2015-08-30', '2023-05-10', 20, 18.5, 18);  -- De Bruyne at Bayern Munich


INSERT INTO Team_league (league_id, team_id, is_participating, season_year) VALUES
(1, 1, 1,2020),  -- FC Barcelona in La Liga
(1, 2, 1,2022),  -- Real Madrid in La Liga
(5, 3, 1,2023),  -- Paris Saint-Germain in Ligue 1
(2, 4, 1,2024),  -- Manchester City in Premier League
(3, 5, 1,2021);  -- Bayern Munich in Bundesliga

INSERT INTO Manager_Team (manager_id, team_id, start_date, end_date) 
VALUES
(1, 1, '2016-07-01', '2023-06-30'),  -- Pep Guardiola at Manchester City
(2, 2, '2015-10-08', '2023-06-30'),  -- Jurgen Klopp at Liverpool
(3, 3, '2021-06-01', NULL),          -- Carlo Ancelotti at Real Madrid (active)
(4, 4, '2016-01-04', '2021-05-31'),  -- Zinedine Zidane at Real Madrid
(5, 5, '2018-07-09', '2022-12-08');  -- Luis Enrique at Barcelona



INSERT INTO Managers (manager_name, age, manager_country) 
VALUES
('Pep Guardiola', 52, 'Spain'),      -- Updated age
('Jurgen Klopp', 56, 'Germany'),    -- Updated age
('Carlo Ancelotti', 64, 'Italy'),   -- Updated age
('Zinedine Zidane', 51, 'France'),  -- Updated age
('Luis Enrique', 53, 'Spain');      -- Age remains correct
       


INSERT INTO Player_Attributes (player_id, season_year, tackles_won, recoveries, aerial_duels_won, aerial_duels_lost) 
VALUES ((SELECT player_id FROM Players WHERE player_name = 'Bukayo Saka'), 2324, 35, 155, 23, 36);

INSERT INTO Player_Attributes (player_id, season_year, tackles_won, recoveries, aerial_duels_won, aerial_duels_lost) 
VALUES ((SELECT player_id FROM Players WHERE player_name = 'Declan Rice'), 2324, 51, 178, 39, 43);

INSERT INTO Player_Attributes (player_id, season_year, tackles_won, recoveries, aerial_duels_won, aerial_duels_lost) 
VALUES ((SELECT player_id FROM Players WHERE player_name = 'Martin Ødegaard'), 2324, 17, 158, 3, 9);

INSERT INTO Player_Attributes (player_id, season_year, tackles_won, recoveries, aerial_duels_won, aerial_duels_lost) 
VALUES ((SELECT player_id FROM Players WHERE player_name = 'William Saliba'), 2324, 26, 213, 72, 49);

INSERT INTO Player_Attributes (player_id, season_year, tackles_won, recoveries, aerial_duels_won, aerial_duels_lost) 
VALUES ((SELECT player_id FROM Players WHERE player_name = 'Emiliano Martínez'), 2324, 0, 48, 5, 0);
