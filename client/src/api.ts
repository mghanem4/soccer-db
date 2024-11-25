import axios from 'axios';


// Base URL for the API (backend)
const API_BASE_URL = 'http://localhost:5000';


// Define the type of a player retrieved from the database
export interface Player {
  player_id: number | null; // This is included for fetched data
  player_name: string | null;
  player_country: string | null;
  player_dob: string | null;
  contract: string | null;
  position: string | null;
}

// Define the type of a player sent to the database
export interface NewPlayer {
  player_name: string;
  player_country: string;
  player_dob: string;
  contract: string;
  position: string;
}

// Define the type of a team  retrieved from the database
export interface Team {
  team_id: number; // This is included for fetched data
  team_name: string | null; // Allow null
  team_wins: number | null; // Allow null
  team_draws: number | null; // Allow null
  team_loses: number | null; // Allow null
  team_trophies: number | null; // Allow null
  goals_scored: number | null; // Allow null
}


// Define the type of a team sent to the database
export interface NewTeam {
  team_name: string;
  team_wins: number;
  team_draws: number;
  team_loses: number;
  team_trophies: number;
  goals_scored: number;
}

// ----------------- Player CRUD -----------------

// Fetch all players
export const getPlayers = async (): Promise<Player[]> => {
  try {
    const response = await axios.get<Player[]>(`${API_BASE_URL}/players`);
    return response.data;
  } catch (error) {
    console.error('Error fetching players:', error);
    throw error;
  }
};


// Add a new player
export const addPlayer = async (player: NewPlayer): Promise<void> => {
  try {
    await axios.post(`${API_BASE_URL}/players`, player);
  } catch (error) {
    console.error('Error adding player:', error);
    throw error;
  }
};

// Update a player
export const updatePlayer = async (
  id: number,
  player: Partial<Player>
): Promise<void> => {
  try {
    await axios.put(`${API_BASE_URL}/players/${id}`, player);
  } catch (error) {
    console.error('Error updating player:', error);
    throw error;
  }
};

// Delete a player
export const deletePlayer = async (id: number): Promise<void> => {
  try {
    await axios.delete(`${API_BASE_URL}/players/${id}`);
  } catch (error) {
    console.error('Error deleting player:', error);
    throw error;
  }
};


// ----------------- Team CRUD -----------------

// Fetch all players
export const getTeams = async (): Promise<Team[]> => {
  try {
    const response = await axios.get<Team[]>(`${API_BASE_URL}/teams`);
    return response.data;
  } catch (error) {
    console.error('Error fetching players:', error);
    throw error;
  }
};
// Add a new team
export const addTeam = async (team: NewTeam): Promise<void> => {
  try {
    await axios.post(`${API_BASE_URL}/teams`, team);
  } catch (error) {
    console.error('Error adding team:', error);
    throw error;
    }
    }
// Update a team
export const updateTeam = async (
  id: number,
  team: Partial<Team>
  ): Promise<void> => {
    try {
      await axios.put(`${API_BASE_URL}/teams/${id}`, team);
      } catch (error) {
        console.error('Error updating team:', error);
        throw error;
        }
        }
        // Delete a team
export const deleteTeam = async (id: number): Promise<void> => {
  try {
    await axios.delete(`${API_BASE_URL}/teams/${id}`
    );
    }
    catch (error) {
      console.error('Error deleting team:', error);
      throw error;
      }
}

    