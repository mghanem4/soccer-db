import React, { useState, useEffect } from 'react';
import { getPlayers, getPlayerStats } from '../api'; // Fetch all players and player stats
import PlayerList from './PlayerList'; // Player list component
import PlayerStats from './PlayerStats'; // Component to display player stats
import { Player } from '../api';

const PlayerStatsPage: React.FC = () => {
  const [players, setPlayers] = useState<Player[]>([]); // All players
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null); // Currently selected player
  const [playerStats, setPlayerStats] = useState<any | null>(null); // Stats for the selected player

  // Fetch all players on mount
  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const playersData = await getPlayers();
        setPlayers(playersData);
      } catch (error) {
        console.error('Error fetching players:', error);
      }
    };

    fetchPlayers();
  }, []);

  // Handle when a player is clicked
  const handlePlayerClick = async (player: Player) => {
    setSelectedPlayer(player); // Set the clicked player as selected

    try {
      const stats = await getPlayerStats(player.player_id); // Fetch stats for the selected player
      setPlayerStats(stats); // Update state with fetched stats
    } catch (error) {
      console.error('Error fetching player stats:', error);
      setPlayerStats(null); // Reset stats if there is an error
    }
  };

  return (
    <div>
      <h2>Player Stats Page</h2>
      {/* Render the player list and pass handlePlayerClick */}
      <PlayerList players={players} onPlayerClick={handlePlayerClick} />

      {/* Show stats if a player is selected */}
      {selectedPlayer && playerStats && (
        <div>
          <h3>Stats for {selectedPlayer.player_name}</h3>
          <PlayerStats stats={playerStats} />
        </div>
      )}
    </div>
  );
};

export default PlayerStatsPage;
