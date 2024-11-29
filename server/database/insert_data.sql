INSERT INTO Players (player_name, player_country, player_dob, contract, position) VALUES
('Lionel Messi', 'Argentina', '1987-06-24', 'Inter Miami', 'Forward'),
('Cristiano Ronaldo', 'Portugal', '1985-02-05', 'Al Nassr', 'Forward'),
('Neymar Jr', 'Brazil', '1992-02-05', 'Al Hilal', 'Forward'),
('Kylian Mbappe', 'France', '1998-12-20', 'Paris Saint-Germain', 'Forward'),
('Kevin De Bruyne', 'Belgium', '1991-06-28', 'Manchester City', 'Midfielder');



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


INSERT INTO Player_Team (player_id, team_id, player_team_goals, player_team_expected_goals, player_matches) VALUES
(1, 1, 30, 25.5, 20),  -- Messi at FC Barcelona
(2, 2, 35, 30.2, 25),  -- Ronaldo at Real Madrid
(3, 4, 25, 23.8, 22),  -- Neymar at Manchester City
(4, 3, 28, 26.1, 21),  -- Mbappe at Paris Saint-Germain
(5, 5, 20, 18.5, 18);  -- De Bruyne at Bayern Munich


INSERT INTO Team_league (league_id, team_id, is_participating) VALUES
(1, 1, 1),  -- FC Barcelona in La Liga
(1, 2, 1),  -- Real Madrid in La Liga
(5, 3, 1),  -- Paris Saint-Germain in Ligue 1
(2, 4, 1),  -- Manchester City in Premier League
(3, 5, 1);  -- Bayern Munich in Bundesliga

INSERT INTO Manager_Team (manager_id, team_id) VALUES
(1, 4),  -- Pep Guardiola at Manchester City
(2, 3),  -- Jurgen Klopp at Paris Saint-Germain
(3, 2),  -- Carlo Ancelotti at Real Madrid
(4, 1),  -- Zinedine Zidane at FC Barcelona
(5, 5);  -- Luis Enrique at Bayern Munich


INSERT INTO Managers (manager_name, manager_dob, manager_country) VALUES
('Pep Guardiola', '1971-01-18', 'Spain'),
('Jurgen Klopp', '1967-06-16', 'Germany'),
('Carlo Ancelotti', '1959-06-10', 'Italy'),
('Zinedine Zidane', '1972-06-23', 'France'),
('Luis Enrique', '1970-05-08', 'Spain');

