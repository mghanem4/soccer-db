import sqlite3
import pandas as pd


""" This python file uses data from:
https://www.kaggle.com/datasets/stefanoleone992/ea-sports-fc-24-complete-player-dataset/?select=male_players.csv
This data is cleaned and adjusted to validate the schema of the database.
 
NOTE: PLEASE DO NOT RUN THIS FILE MULTIPLE TIMES AS IT WILL INSERT DUPLICATE DATA INTO THE DATABASE, WHICH WILL FAIL.
TO REINSERT THIS DATA, RUN THE SOCCER_TABLE.SQL File TO DROP THE TABLES AND THEN RUN THIS FILE AGAIN.
 """


db_path = "../soccer.db"  




teams_data = pd.read_excel("teams.xlsx")
player_data= pd.read_csv("players.csv")
league_data=pd.read_csv("leagues.csv")
team_league_data=pd.read_csv("team_league.csv")
team_trophies_data=pd.read_csv("team_trophies.csv")
players_data=pd.read_csv("players.csv") 
player_attributes_data=pd.read_csv("players_attributes.csv")
player_team_data=  pd.read_excel("player_teams.xlsx")
player_trophies_data= pd.read_excel("player_trophies.xlsx")


def insert_player_data(connection, data):
    cursor = connection.cursor()
    for _, row in data.iterrows():
        cursor.execute(
            """
            INSERT INTO Players (player_name, player_country, age, position)
            VALUES (?, ?, ?, ?);
            """,
            (row['player_name'], row['player_country'], row['age'], row['position'])
        )



def insert_teams_data(connection, data):
    cursor = connection.cursor()
    for _, row in data.iterrows():
        cursor.execute(
                """
                INSERT INTO Teams (team_name, team_wins, team_draws, team_loses, goals_scored)
                VALUES (?, ?, ?, ?, ?);
                """,
                (row['team_name'], row['team_wins'], row['team_draws'], row['team_loses'], row['goals_scored'])
            )
def insert_player_attributes_data(connection, data):
    cursor = connection.cursor()
    for _, row in data.iterrows():
        cursor.execute("""
            INSERT INTO Player_Attributes(player_id, season_year,defending,preferred_foot,attacking_work_rate,defensive_work_rate,passing,dribbling,pace,shooting,physicality)
            VALUES(?,?,?,?,?,?,?,?,?,?,?);
        """,(row['player_id'],row['season_year'],row['defending'],row['preferred_foot'],row['attacking_work_rate'],row['defensive_work_rate'],row['passing'],row['dribbling'],row['pace'],row['shooting'],row['physicality']))
def insert_league_data(connection, data):
    league_id=1
    cursor = connection.cursor()

    for _, row in data.iterrows():
        cursor.execute(
                """
                INSERT INTO Trophies (trophy_name, trophy_type)
                VALUES (?, ?);
                """,
                (row['trophy_name'], row['trophy_type'])
        )


        cursor.execute(
                """
                INSERT INTO Leagues (league_name,total_matches, total_teams,prize, league_trophy_id)
                VALUES (?, ?, ?, ?, ?);
                """,
                (row['league_name'],row['total_matches'],row['total_teams'],row['prize'], league_id)
            )
        league_id+=1
    
    cursor.execute(
                """
                    INSERT INTO Trophies (trophy_name, trophy_type)
                    VALUES ('Ballon dOr', 'Individual');

                """
        )
    cursor.execute(
                """
                    INSERT INTO Trophies (trophy_name, trophy_type)
                    VALUES ('Golden Boot', 'Individual');

                """
        )
def insert_team_league_data(connection, data):
    cursor = connection.cursor()
    for _, row in data.iterrows():
        cursor.execute(
                """
                INSERT INTO team_league (team_id, league_id, titles_won)
                VALUES (?, ?, ?);
                """,
                (row['team_id'], row['league_id'], row['titles_won'])
            )
def insert_team_trophies_data(connection, data):
    cursor = connection.cursor()
    for _, row in data.iterrows():
        team_id = int(row['team_id'])
        trophy_id = int(row['trophy_id'])
        year_awarded = int(row['year_awarded'])
        cursor.execute(
            """
            INSERT INTO Team_Trophies (team_id, trophy_id, year_awarded)
            VALUES (?, ?, ?);
            """,
            (team_id, trophy_id, year_awarded)
        )

def insert_manager_data(connection):
    cursor = connection.cursor()
    cursor.execute("""
            INSERT INTO Managers (manager_name, age, manager_country) VALUES
            ('Pep Guardiola', 52, 'Spain'),
            ('Jurgen Klopp', 56, 'Germany'),
            ('Carlo Ancelotti', 64, 'Italy'),
            ('Zinedine Zidane', 51, 'France'),
            ('Diego Simeone', 53, 'Argentina');
     """)

def insert_manager_team_data(connection):
    cursor = connection.cursor()
    cursor.execute("""
        INSERT INTO Manager_Team (manager_id, team_id, start_date, end_date) VALUES
                    (1, 1, '2016-07-01', NULL),
                    (2, 2, '2015-10-08', NULL),
                    (3, 3, '2021-01-04', NULL),
                    (4, 3, '2016-07-01', '2020-06-30'),
                    (5, 4, '2011-12-23', NULL);
    """)


def insert_player_teams_data(connection, data):
    cursor = connection.cursor()
    for _, row in data.iterrows():
            start_date = row['start_date'].strftime('%Y-%m-%d') if pd.notnull(row['start_date']) else None
            end_date = row['end_date'].strftime('%Y-%m-%d') if pd.notnull(row['end_date']) else None
            cursor.execute(
                """
                INSERT INTO player_team (player_id, team_id, start_date, end_date, player_team_goals,player_matches,player_team_expected_goals)
                VALUES (?, ?, ?, ?,?,?,?);
                """,
                (row['player_id'], row['team_id'], start_date, end_date,row['player_team_goals'],row['player_matches'],row['player_team_expected_goals'])
            )
                
def insert_player_trophies_data(connection, data):
    cursor = connection.cursor()
    for _, row in data.iterrows():
        player_id = int(row['player_id'])
        trophy_id = int(row['trophy_id'])
        year_awarded = int(row['year_awarded'])
        cursor.execute(
            """
            INSERT INTO Player_Trophies (player_id, trophy_id, year_awarded)
            VALUES (?, ?, ?);
            """,
            (player_id, trophy_id, year_awarded )
        )

conn = sqlite3.connect(db_path)
print("Connected to the database.")    



insert_player_data(conn, players_data)
insert_player_attributes_data(conn, player_attributes_data)
insert_player_teams_data(conn, player_team_data)
insert_player_trophies_data(conn, player_trophies_data)
insert_teams_data(conn, teams_data)
insert_team_league_data(conn, team_league_data)
insert_team_trophies_data(conn, team_trophies_data)
insert_league_data(conn, league_data)
insert_manager_data(conn)
insert_manager_team_data(conn)


print("Data inserted successfully.")
conn.commit()
conn.close()
print("Database connection closed.")
