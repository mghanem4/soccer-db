INSERT INTO Players (player_name, player_country, age, position) VALUES
('Lionel Messi', 'Argentina', 36, 'Forward'),
('Cristiano Ronaldo', 'Portugal', 38, 'Forward'),
('Kevin De Bruyne', 'Belgium', 32, 'Midfielder'),
('Virgil van Dijk', 'Netherlands', 32, 'Defender'),
('Erling Haaland', 'Norway', 23, 'Forward'),
('Kylian Mbappé', 'France', 24, 'Forward'),
('Luka Modrić', 'Croatia', 38, 'Midfielder'),
('Sergio Ramos', 'Spain', 37, 'Defender'),
('Neymar Jr.', 'Brazil', 31, 'Forward'),
('Harry Kane', 'England', 30, 'Forward');


INSERT INTO Managers (manager_name, age, manager_country) VALUES
('Pep Guardiola', 52, 'Spain'),
('Jurgen Klopp', 56, 'Germany'),
('Carlo Ancelotti', 64, 'Italy'),
('Zinedine Zidane', 51, 'France'),
('Diego Simeone', 53, 'Argentina'),
('Mikel Arteta', 41, 'Spain'),
('Erik ten Hag', 53, 'Netherlands'),
('Gareth Southgate', 53, 'England'),
('Antonio Conte', 54, 'Italy'),
('Jose Mourinho', 61, 'Portugal');

INSERT INTO Teams (team_name, team_wins, team_draws, team_loses, goals_scored) VALUES
('Manchester City', 28, 5, 5, 94),
('Real Madrid', 27, 6, 5, 85),
('Paris Saint-Germain', 29, 4, 5, 92),
('Liverpool', 26, 8, 4, 89),
('Bayern Munich', 30, 3, 3, 95),
('Chelsea', 22, 9, 7, 74),
('Barcelona', 25, 7, 6, 87),
('Juventus', 23, 10, 5, 76),
('Arsenal', 21, 9, 8, 72),
('Manchester United', 24, 8, 6, 80);

INSERT INTO Leagues (total_matches, total_teams, prize, league_name) VALUES
(38, 20, 100000000, 'Premier League'),
(34, 18, 95000000, 'Bundesliga'),
(38, 20, 97000000, 'La Liga'),
(38, 20, 94000000, 'Serie A'),
(38, 20, 91000000, 'Ligue 1'),
(38, 20, 93000000, 'Eredivisie'),
(34, 16, 80000000, 'Russian Premier League'),
(38, 20, 90000000, 'Portuguese Primeira Liga'),
(30, 20, 75000000, 'MLS'),
(34, 16, 70000000, 'Brazilian Serie A');

INSERT INTO Player_Team (player_id, team_id, start_date, end_date, player_team_goals, player_matches) VALUES
(1, 1, '2021-07-01', NULL, 35, 33),
(2, 2, '2021-07-01', NULL, 30, 32),
(3, 1, '2020-07-01', NULL, 12, 30),
(4, 4, '2018-08-01', NULL, 5, 34),
(5, 3, '2022-07-01', NULL, 38, 32),
(6, 3, '2018-08-01', NULL, 28, 31),
(7, 5, '2016-08-01', NULL, 5, 28),
(8, 6, '2019-08-01', NULL, 4, 30),
(9, 7, '2017-08-01', NULL, 15, 29),
(10, 8, '2019-07-01', NULL, 24, 32);

INSERT INTO Team_League (league_id, team_id, titles_won) VALUES
(1, 1, 5),
(1, 10, 3),
(2, 5, 11),
(3, 7, 9),
(4, 8, 7),
(5, 3, 9),
(6, 9, 3),
(7, 4, 5),
(8, 2, 7),
(9, 6, 4);


INSERT INTO Manager_Team (manager_id, team_id, start_date, end_date) VALUES
(1, 1, '2016-07-01', NULL),
(2, 4, '2015-10-08', NULL),
(3, 5, '2021-08-01', NULL),
(4, 7, '2016-07-01', '2021-06-30'),
(5, 3, '2011-06-10', NULL),
(6, 9, '2020-12-22', NULL),
(7, 10, '2022-07-01', NULL),
(8, 2, '2016-10-10', NULL),
(9, 8, '2019-11-11', '2022-06-30'),
(10, 6, '2021-08-01', NULL);

INSERT INTO Trophies (trophy_name, trophy_type) VALUES
('Premier League Trophy', 'League'),
('Champions League Trophy', 'League'),
('FA Cup', 'Cup'),
('Bundesliga Trophy', 'League'),
('La Liga Trophy', 'League'),
('Copa del Rey', 'Cup'),
('Ligue 1 Trophy', 'League'),
('Serie A Trophy', 'League'),
('Golden Boot', 'Individual'),
('Ballon d’Or', 'Individual');

INSERT INTO Player_Trophies (player_id, trophy_id, year_awarded) VALUES
(1, 9, 2022),
(2, 9, 2021),
(3, 10, 2022),
(4, 10, 2021),
(5, 9, 2023),
(6, 9, 2022),
(7, 10, 2018),
(8, 9, 2016),
(9, 10, 2017),
(10, 10, 2020);

INSERT INTO Team_Trophies (team_id, trophy_id, year_awarded) VALUES
(1, 1, 2022),
(1, 2, 2023),
(2, 2, 2022),
(3, 5, 2021),
(4, 4, 2020),
(5, 4, 2023),
(6, 7, 2022),
(7, 3, 2021),
(8, 6, 2020),
(9, 1, 2019);

INSERT INTO Player_Attributes (player_id, season_year, penalties, positioning, interceptions, sliding_tackle, preferred_foot, attacking_work_rate, defensive_work_rate, finishing, heading_accuracy, short_passing, dribbling, long_passing, ball_control, acceleration, sprint_speed, shot_power, long_shots) VALUES
-- Lionel Messi
(1, 2022, 5, 95, 40, 20, 'left', 'high', 'medium', 95, 60, 92, 96, 85, 98, 85, 80, 85, 90),
(1, 2023, 6, 94, 42, 21, 'left', 'high', 'medium', 94, 59, 91, 95, 84, 97, 84, 79, 84, 89),
(1, 2024, 7, 93, 43, 22, 'left', 'high', 'medium', 93, 58, 90, 94, 83, 96, 83, 78, 83, 88),

-- Cristiano Ronaldo
(2, 2022, 4, 85, 30, 15, 'right', 'high', 'low', 94, 88, 81, 85, 75, 87, 77, 90, 92, 85),
(2, 2023, 3, 83, 28, 14, 'right', 'high', 'low', 92, 86, 80, 84, 74, 86, 76, 89, 91, 84),
(2, 2024, 2, 82, 27, 13, 'right', 'high', 'low', 91, 85, 79, 83, 73, 85, 75, 88, 90, 83),

-- Kevin De Bruyne
(3, 2022, 3, 90, 60, 20, 'right', 'medium', 'medium', 75, 55, 96, 80, 97, 95, 75, 70, 85, 90),
(3, 2023, 4, 92, 62, 21, 'right', 'medium', 'medium', 76, 56, 97, 81, 98, 96, 76, 71, 86, 91),

-- Virgil van Dijk
(4, 2022, 2, 60, 95, 90, 'right', 'low', 'high', 40, 85, 78, 60, 70, 75, 60, 55, 65, 60),
(4, 2023, 3, 62, 96, 91, 'right', 'low', 'high', 41, 86, 79, 61, 71, 76, 61, 56, 66, 61),

-- Erling Haaland
(5, 2022, 4, 85, 50, 25, 'left', 'high', 'medium', 90, 80, 65, 72, 55, 70, 89, 88, 92, 85),
(5, 2023, 5, 88, 52, 26, 'left', 'high', 'medium', 93, 82, 67, 74, 57, 72, 91, 90, 94, 87),

-- Kylian Mbappé
(6, 2022, 3, 82, 45, 20, 'right', 'high', 'low', 88, 65, 70, 92, 62, 90, 95, 97, 85, 88),
(6, 2023, 4, 85, 48, 22, 'right', 'high', 'low', 90, 67, 72, 93, 64, 91, 96, 98, 87, 90),

-- Luka Modrić
(7, 2022, 2, 88, 70, 25, 'right', 'medium', 'medium', 70, 60, 95, 80, 95, 92, 65, 62, 65, 75),
(7, 2023, 3, 89, 72, 26, 'right', 'medium', 'medium', 71, 61, 96, 81, 96, 93, 66, 63, 66, 76),

-- Sergio Ramos
(8, 2022, 4, 60, 92, 88, 'right', 'low', 'high', 45, 85, 75, 60, 72, 76, 60, 58, 68, 62),
(8, 2023, 5, 62, 93, 89, 'right', 'low', 'high', 46, 86, 76, 61, 73, 77, 61, 59, 69, 63),

-- Neymar Jr.
(9, 2022, 3, 85, 35, 15, 'right', 'high', 'medium', 89, 55, 75, 95, 60, 93, 91, 90, 84, 88),
(9, 2023, 4, 86, 37, 16, 'right', 'high', 'medium', 90, 56, 76, 96, 61, 94, 92, 91, 85, 89),

-- Harry Kane
(10, 2022, 5, 78, 40, 18, 'right', 'high', 'medium', 90, 85, 82, 70, 77, 80, 60, 65, 85, 78),
(10, 2023, 6, 80, 42, 20, 'right', 'high', 'medium', 92, 87, 84, 72, 79, 82, 61, 66, 86, 79);
