-- Create Players Table

BEGIN TRANSACTION;
DROP TABLE IF EXISTS Players;
DROP TABLE IF EXISTS Managers;
DROP TABLE IF EXISTS Teams;
DROP TABLE IF EXISTS Leagues;
DROP TABLE IF EXISTS Player_Team;
DROP TABLE IF EXISTS Team_league;
DROP TABLE IF EXISTS League_Team;
DROP TABLE IF EXISTS Manager_Team;


CREATE TABLE Players (
    player_id INTEGER PRIMARY KEY AUTOINCREMENT,
    player_name TEXT NOT NULL,
    player_country TEXT NOT NULL,
    player_injuries INTEGER DEFAULT 0,
    age INTEGER NOT NULL,
    contract TEXT DEFAULT NULL,
    player_trophies INTEGER DEFAULT 0,
    position TEXT NOT NULL
);


-- Create Managers Table
CREATE TABLE Managers (
    manager_id INTEGER PRIMARY KEY AUTOINCREMENT,
    manager_name TEXT NOT NULL,
    age INTEGER NOT NULL,
    manager_country TEXT NOT NULL
);

CREATE TABLE Player_Attributes (
    attribute_id INTEGER PRIMARY KEY AUTOINCREMENT,
    player_id INTEGER NOT NULL,
    season_year INTEGER NOT NULL,
    tackles_won INTEGER DEFAULT 0,
    recoveries INTEGER DEFAULT 0,
    aerial_duels_won INTEGER DEFAULT 0,
    aerial_duels_lost INTEGER DEFAULT 0,
    FOREIGN KEY (player_id) REFERENCES Players(player_id)
);



-- Create Teams Table
CREATE TABLE Teams (
    team_id INTEGER PRIMARY KEY AUTOINCREMENT,
    team_name TEXT NOT NULL,
    team_wins INTEGER DEFAULT 0,
    team_draws INTEGER DEFAULT 0,
    team_loses INTEGER DEFAULT 0,
    team_trophies INTEGER DEFAULT 0,
    goals_scored INTEGER DEFAULT 0
);

-- Create Leagues Table
CREATE TABLE Leagues (
    league_id INTEGER PRIMARY KEY AUTOINCREMENT,
    total_matches INTEGER NOT NULL,
    total_teams INTEGER NOT NULL,
    prize REAL DEFAULT 0,
    league_name TEXT NOT NULL
);

-- Create Player-Team Junction Table
CREATE TABLE Player_Team (
    player_id INTEGER NOT NULL,
    team_id INTEGER NOT NULL,
    start_date DATE,
    end_date DATE,
    player_team_goals INTEGER DEFAULT 0,
    player_matches INTEGER DEFAULT 0,
    player_team_expected_goals REAL DEFAULT 0,
    player_team_goals_per_match REAL GENERATED ALWAYS AS 
        (CAST(player_team_goals AS REAL) / NULLIF(player_matches, 0)) STORED,
    PRIMARY KEY (player_id, team_id),
    FOREIGN KEY (player_id) REFERENCES Players(player_id),
    FOREIGN KEY (team_id) REFERENCES Teams(team_id)
);

-- Create League-Team Junction Table
CREATE TABLE Team_league (
    league_id INTEGER NOT NULL,
    team_id INTEGER NOT NULL,
    is_participating BOOLEAN DEFAULT 1,
    season_year INTEGER NOT NULL,
    PRIMARY KEY (league_id, team_id),
    FOREIGN KEY (league_id) REFERENCES Leagues(league_id),
    FOREIGN KEY (team_id) REFERENCES Teams(team_id)
);

-- Create Manager-Team Junction Table
CREATE TABLE Manager_Team (
    manager_id INTEGER NOT NULL,
    team_id INTEGER NOT NULL,
    start_date DATE,
    end_date DATE,
    PRIMARY KEY (manager_id, team_id),
    FOREIGN KEY (manager_id) REFERENCES Managers(manager_id),
    FOREIGN KEY (team_id) REFERENCES Teams(team_id)
);
END TRANSACTION;

