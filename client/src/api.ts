import axios from 'axios';


// Base URL for the API (backend)
const API_BASE_URL = 'http://localhost:5000';


// Define the type of a player retrieved from the database
export interface Player {
  player_id: number; // This is included for fetched data
  player_name: string;
  player_country: string;
  player_dob: string;
  contract: string;
  position: string;
}

// Define the type of a player sent to the database
export interface NewPlayer {
  player_name: string;
  player_country: string;
  player_dob: string;
  contract: string;
  position: string;
}

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
