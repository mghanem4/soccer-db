import axios from 'axios';


// Base URL for the API (backend)
const API_BASE_URL = 'http://localhost:5000';


// Define the type of a player retrieved from the database
export interface Player {
  player_id: number; // This is included for fetched data
  player_name: string | null;
  player_country: string | null;
  age: number;
  contract: string | null;
  position: string | null;
}

// Define the type of a player sent to the database
export interface NewPlayer {
  player_name: string;
  player_country: string;
  age: number;
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

// Define the League type
export interface League {
  league_id: number; // Primary key
  total_matches: number;
  total_teams: number;
  prize: number;
  league_name: string;
}

// Define the League payload for adding/updating
export interface NewLeague {
  total_matches: number;
  total_teams: number;
  prize?: number;
  league_name: string;
}

// Define the Manager type
export interface Manager {
  manager_id: number;
  manager_name: string;
  age: number | null;
  // age: number | null;
  manager_country: string;
}

// Define the Manager payload for adding/updating
export interface NewManager {
  manager_name: string;
  age: number | null;
  // age?: number;
  manager_country: string;
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


// ----------------- Leagues CRUD -----------------


// Fetch all leagues
export const getLeagues = async (): Promise<League[]> => {
  try {
    const response = await axios.get<League[]>(`${API_BASE_URL}/leagues`);
    return response.data;
  } catch (error) {
    console.error('Error fetching leagues:', error);
    throw error;
  }
};

// Add a new league
export const addLeague = async (league: NewLeague): Promise<void> => {
  try {
    await axios.post(`${API_BASE_URL}/leagues`, league);
  } catch (error) {
    console.error('Error adding league:', error);
    throw error;
  }
};

// UpdateLeague function
export const updateLeague = async (
  id: number,
  league: Partial<League> // Allow undefined values
): Promise<void> => {
  try {
    await axios.put(`${API_BASE_URL}/leagues/${id}`, league);
  } catch (error) {
    console.error('Error updating league:', error);
    throw error;
  }
};


// Delete a league
export const deleteLeague = async (id: number): Promise<void> => {
  try {
    await axios.delete(`${API_BASE_URL}/leagues/${id}`);
  } catch (error) {
    console.error('Error deleting league:', error);
    throw error;
  }
};


// ----------------- Managers CRUD -----------------



// Fetch all managers
export const getManagers = async (): Promise<Manager[]> => {
  try {
    const response = await axios.get<Manager[]>(`${API_BASE_URL}/managers`);
    return response.data;
  } catch (error) {
    console.error('Error fetching managers:', error);
    throw error;
  }
};

// Add a new manager
export const addManager = async (manager: NewManager): Promise<void> => {
  try {
    await axios.post(`${API_BASE_URL}/managers`, manager);
  } catch (error) {
    console.error('Error adding manager:', error);
    throw error;
  }
};

// Update a manager
export const updateManager = async (id: number, manager: Partial<Manager>): Promise<void> => {
  try {
    await axios.put(`${API_BASE_URL}/managers/${id}`, manager);
  } catch (error) {
    console.error('Error updating manager:', error);
    throw error;
  }
};

// Delete a manager
export const deleteManager = async (id: number): Promise<void> => {
  try {
    await axios.delete(`${API_BASE_URL}/managers/${id}`);
  } catch (error) {
    console.error('Error deleting manager:', error);
    throw error;
  }
};
export const getPlayerById = async (id: number) => {
  try {
    const response = await axios.get<{ player: Player; attributes: any[] }>(`${API_BASE_URL}/players/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching player by ID:', error);
    throw error;
  }
};

// Fetch teams by league
export const getTeamsByLeague = async (leagueId: number): Promise<Team[]> => {
  try {
    const response = await axios.get<Team[]>(`${API_BASE_URL}/leagues/${leagueId}/teams`);
    return response.data;
  } catch (error) {
    console.error('Error fetching teams by league:', error);
    throw error;
  }
};








