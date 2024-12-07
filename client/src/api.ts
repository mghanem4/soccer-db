import axios from 'axios';


// Base URL for the API (backend)
const API_BASE_URL = 'http://localhost:5000';

/* There is two types of interfaces:

NewObject & Object
Basically, I am doing the auto-increment on the id, so the NewObject does not require an id.
However, the Object does require it since you perform an update operation or a remove.

 */

// Define the type of a player retrieved from the database
export interface Player {
  player_id: number; // This is included for fetched data
  player_name: string | null;
  player_country: string | null;
  age: number;
  position: string | null;
}

// Define the type of a player sent to the database
export interface NewPlayer {
  player_name: string;
  player_country: string;
  age: number;
  position: string;
}

// Define the type of a team  retrieved from the database
export interface Team {
  team_id: number; 
  team_name: string | null;
  team_wins: number | null;
  team_draws: number | null;
  team_loses: number | null;
  goals_scored: number | null;
}


// Define the type of a team sent to the database
export interface NewTeam {
  team_name: string;
  team_wins?: number; 
  team_draws?: number; 
  team_loses?: number; 
  goals_scored?: number; 
}


// Define the League type
export interface League {
  league_id: number; // Primary key
  total_matches: number;
  total_teams: number;
  prize: number;
  league_name: string;
  league_trophy_id: number;
}

// Define the League payload for adding/updating
export interface NewLeague {
  total_matches: number;
  total_teams: number;
  prize?: number;
  league_name: string;
  league_trophy_id: number | null;
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

// Define the type of a trophy retrieved from the database
export interface Trophy {
  trophy_id: number;        
  trophy_name: string;      
  trophy_type: 'League' | 'Cup' | 'Individual'; // Trophy type: League, Cup, or Individual
}

// Define the type of a new trophy sent to the database
export interface NewTrophy {
  trophy_name: string;      // Name of the trophy
  trophy_type: 'League' | 'Cup'; // Only 'League' or 'Cup' for leagues
}
export interface TeamWithTrophies {
  team_id: number;
  team_name: string | null;
  team_wins: number | null;
  team_draws: number | null;
  team_loses: number | null;
  goals_scored: number | null;
  trophies: Trophy[]; // List of trophies associated with the team
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
export const addPlayer = async (player: NewPlayer): Promise<number> => {
  try {
    const response = await axios.post(`${API_BASE_URL}/players`, player);
    return response.data.player_id; 
  } catch (error) {
    console.error('Error adding player:', error);
    throw error;
  }
};

// Update a player
export const updatePlayer = async (id: number,player: Partial<Player>): Promise<void> => {
  try {
    await axios.put(`${API_BASE_URL}/players/${id}`, player);
  } catch (error) {
    console.error('Error updating player:', error);
    throw error;
  }
};

// Delete a player and remove them from Player_Team if present
export const deletePlayer = async (id: number): Promise<void> => {
  try {
    await axios.delete(`${API_BASE_URL}/players/${id}`);
  } catch (error) {
    console.error('Error deleting player:', error);
    throw error;
  }
};


// ----------------- Team CRUD -----------------

// Fetch all teams
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
export const addTeam = async (team: NewTeam): Promise<number> => {
  try {
    const response = await axios.post(`${API_BASE_URL}/teams`, team);
    return response.data.team_id; 
  } catch (error) {
    console.error('Error adding team:', error);
    throw error;
  }
};
// Define a helper function for API calls
export const fetchQueryData = async (endpoint: string): Promise<{ query: string; result: any[] }> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/queries/${endpoint}`);
    const responseData = Array.isArray(response.data.result)
      ? response.data.result
      : [response.data.result];

    return {
      query: response.data
      .query,
      result: responseData,
    };
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

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


// Fetch players by team
export const getPlayersByTeam = async (teamId: number): Promise<Player[]> => {
  try {
    const response = await axios.get<Player[]>(`${API_BASE_URL}/teams/${teamId}/players`);
    return response.data;
  } catch (error) {
    console.error('Error fetching players by team:', error);
    throw error;
  }
};

export const getPlayerStats = async (playerId: number): Promise<any> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/players/${playerId}/stats`);
    return response.data.stats;
  } catch (error) {
    console.error('Error fetching player stats:', error);
    throw error;
  }
};
export const addPlayerToTeam = async (playerId: number, teamId: number, startDate: string): Promise<void> => {
  try {
    await axios.post(`${API_BASE_URL}/players/${playerId}/team`, {
      player_id: playerId,
      team_id: teamId,
      start_date: startDate,
    });
  } catch (error) {
    console.error('Error adding player to team:', error);
    throw error;
  }
};

export const updatePlayerTeam = async (
  playerId: number,
  teamId: number,
  startDate?: string,
  endDate?: string
): Promise<void> => {
  try {
    await axios.put(`${API_BASE_URL}/players/${playerId}/team`, {
      team_id: teamId,
      start_date: startDate,
      end_date: endDate,
    });
  } catch (error) {
    console.error('Error updating player team:', error);
    throw error;
  }
};


export const getLeagueTrophies = async (): Promise<Trophy[]> => {
  try {
    const response = await axios.get<Trophy[]>(`${API_BASE_URL}/trophies/league-trophies`);
    return response.data;
  } catch (error) {
    console.error('Error fetching league trophies:', error);
    throw error;
  }
};

// Add a new trophy
export const addTrophy = async (trophy: NewTrophy): Promise<void> => {
  try {
    await axios.post(`${API_BASE_URL}/trophies`, trophy);
  } catch (error) {
    console.error('Error adding trophy:', error);
    throw error;
  }
};

export const getTrophies = async (): Promise<Trophy[]> => {
  try {
    const response = await axios.get<Trophy[]>(`${API_BASE_URL}/trophies`);
    return response.data;
  } catch (error) {
    console.error('Error fetching trophies:', error);
    throw error;
  }
};

export const updateTrophy = async (id: number, trophy: NewTrophy): Promise<void> => {
  try {
    await axios.put(`${API_BASE_URL}/trophies/${id}`, trophy);
  } catch (error) {
    console.error('Error updating trophy:', error);
    throw error;
  }
};

//  Delete a trophy

export const deleteTrophy = async (id: number): Promise<void> => {
  try {
    await axios.delete(`${API_BASE_URL}/trophies/${id}`);
  } catch (error) {
    console.error('Error deleting trophy:', error);
    throw error;
  }
};
// Fetch all temas with trophies
export const getTeamsWithTrophies = async (): Promise<TeamWithTrophies[]> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/teams`);
    return response.data;
  } catch (error) {
    console.error('Error fetching teams with trophies:', error);
    throw error;
  }
};

// add a trophy to a team
export const addTeamTrophy = async (teamId: number, trophyId: number, yearAwarded: number): Promise<void> => {
  try {
    await axios.post(`${API_BASE_URL}/teams/${teamId}/trophies`, { trophy_id: trophyId, year_awarded: yearAwarded });
  } catch (error) {
    console.error('Error adding trophy to team:', error);
    throw error;
  }
};

// Delete a trophy from a team
export const deleteTeamTrophy = async (teamId: number, trophyId: number): Promise<void> => {
  try {
    await axios.delete(`${API_BASE_URL}/teams/${teamId}/trophies/${trophyId}`);
  } catch (error) {
    console.error('Error deleting trophy from team:', error);
    throw error;
  }
};

// Assign a trophy to a team
export const assignTrophyToTeam = async (teamId: number, trophyId: number, yearAwarded: number): Promise<void> => {
  try {
    await axios.post(`${API_BASE_URL}/teams/${teamId}/trophies`, {
      trophyId,
      yearAwarded,
    });
  } catch (error) {
    console.error('Error assigning trophy to team:', error);
    throw error;
  }
};

// Strip a trophy from a team
export const stripTrophyFromTeam = async (trophyId: number): Promise<void> => {
  try {
    await axios.delete(`${API_BASE_URL}/team-trophies/${trophyId}`);
  } catch (error) {
    console.error('Error stripping trophy from team:', error);
    throw error;
  }
};
// Assign a trophy to a team
export const assignTeamTrophy = async (teamId: number, trophyId: number, yearAwarded: number): Promise<void> => {
  try {
    await axios.post(`${API_BASE_URL}/teams/${teamId}/trophies`, { trophy_id: trophyId, year_awarded: yearAwarded });
  } catch (error) {
    console.error('Error assigning trophy:', error);
    throw error;
  }
};


// Strip a trophy from a team
export const deleteTeamTrophies = async (teamId: number): Promise<void> => {
  try {
    await axios.delete(`${API_BASE_URL}/teams/${teamId}/trophies`);
  } catch (error) {
    console.error('Error deleting team trophies:', error);
    throw error;
  }
};

// strip a trophy from a player
export const stripPlayerTrophy = async (playerId: number, trophyId: number, yearAwarded: number): Promise<void> => {
  try {
    await axios.delete(`${API_BASE_URL}/players/${playerId}/trophies/${trophyId}`);
  } catch (error) {
    console.error('Error stripping trophy:', error);
    throw error;
  }
};

// Fetch all individual trophies for players
export const getIndividualTrophies = async (): Promise<Trophy[]> => {
  const response = await axios.get(`${API_BASE_URL}/trophies/individual`);
  return response.data;
};

// Assign a trophy to a player
export const assignPlayerTrophy = async (playerId: number, trophyId: number, yearAwarded: number): Promise<void> => {
  try {
    await axios.post(`${API_BASE_URL}/players/${playerId}/trophies`, { trophy_id: trophyId, year_awarded: yearAwarded });
  } catch (error) {
    console.error('Error assigning trophy:', error);
    throw error;
  }
};
// delete a player trophy, this happens when u delete a player. different then removing a trophy from a player
export const deletePlayerTrophies = async (playerId: number): Promise<void> => {
  try {
    await axios.delete(`${API_BASE_URL}/players/${playerId}/trophies`);
  } catch (error) {
    console.error('Error deleting player trophies:', error);
    throw error;
  }
};

// Strip a trophy from a team
export const stripTeamTrophy = async (teamId: number, trophyId: number): Promise<void> => {
  try {
    await axios.delete(`${API_BASE_URL}/teams/${teamId}/trophies/${trophyId}`);
  } catch (error) {
    console.error('Error stripping trophy:', error);
    throw error;
  }
};



