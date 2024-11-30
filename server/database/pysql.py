import sqlite3

# Paths to the SQLite files
source_db_path = r"c:\Users\mgahm\OneDrive - Carleton University\soccer-db\soccer-db\server\database\database.sqlite"
target_db_path = r"c:\Users\mgahm\OneDrive - Carleton University\soccer-db\soccer-db\server\database\soccer.db"

# Connect to both databases
source_conn = sqlite3.connect(source_db_path)
target_conn = sqlite3.connect(target_db_path)

source_cursor = source_conn.cursor()
target_cursor = target_conn.cursor()

# Debug: List tables in the source database
source_cursor.execute("SELECT name FROM sqlite_master WHERE type='table';")
tables = source_cursor.fetchall()
print("Tables in source database:", tables)

# Step 1: Insert Players into the target database
source_cursor.execute("""
    SELECT player_name, birthday, 'Unknown' as player_country, 0 as player_injuries, 0 as player_trophies, 'Unknown' as contract
    FROM Player;
""")
players = source_cursor.fetchall()

target_cursor.executemany("""
    INSERT OR IGNORE INTO Players (player_name, player_dob, player_country, player_injuries, player_trophies, contract, position)
    VALUES (?, ?, ?, ?, ?, ?, 'Unknown');
""", players)

# Step 2: Insert Teams into the target database
source_cursor.execute("""
    SELECT team_long_name, 0 as team_wins, 0 as team_draws, 0 as team_loses, 0 as team_trophies, 0 as goals_scored
    FROM Team;
""")
teams = source_cursor.fetchall()

target_cursor.executemany("""
    INSERT OR IGNORE INTO Teams (team_name, team_wins, team_draws, team_loses, team_trophies, goals_scored)
    VALUES (?, ?, ?, ?, ?, ?);
""", teams)

# Step 3: Insert Leagues into the target database
source_cursor.execute("""
    SELECT name as league_name, 0 as total_matches, 0 as total_teams, 0 as prize
    FROM League;
""")
leagues = source_cursor.fetchall()

target_cursor.executemany("""
    INSERT OR IGNORE INTO Leagues (league_name, total_matches, total_teams, prize)
    VALUES (?, ?, ?, ?);
""", leagues)

# Commit and close connections
target_conn.commit()

source_conn.close()
target_conn.close()

print("Data transfer complete.")
