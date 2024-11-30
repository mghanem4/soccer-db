import React, { useState, useEffect } from 'react';
import { Player, getPlayers, getPlayerById } from '../api'; // API calls
import ScrollableTable from './ScrollableTable'; // Table Component
import PlayerStats from './PlayerStats'; // Bar Chart Component
import { Box, Typography } from '@mui/material';

const PlayerStatsPage: React.FC = () => {
  const [players, setPlayers] = useState<Player[]>([]);
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);
  const [playerStats, setPlayerStats] = useState<any | null>(null);

  // Fetch players on component mount
  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const data = await getPlayers();
        setPlayers(data);
      } catch (error) {
        console.error('Error fetching players:', error);
      }
    };

    fetchPlayers();
  }, []);

  // Handle row click
  const handleRowClick = async (player: Player) => {
    setSelectedPlayer(player);

    try {
      const data = await getPlayerById(player.player_id);
      setPlayerStats(data.attributes); // Extract stats
    } catch (error) {
      console.error('Error fetching player stats:', error);
      setPlayerStats(null);
    }
  };

  const columns = [
    { id: 'player_id' as keyof Player, label: 'ID' },
    { id: 'player_name' as keyof Player, label: 'Name' },
    { id: 'player_country' as keyof Player, label: 'Country' },
    { id: 'age' as keyof Player, label: 'Age' },
    { id: 'contract' as keyof Player, label: 'Contract' },
    { id: 'position' as keyof Player, label: 'Position' },
  ];

  const filterBy = (player: Player, query: string) => {
    const nameMatches = player.player_name?.toLowerCase().includes(query) || false;
    const idMatches = player.player_id.toString().includes(query);
    return nameMatches || idMatches;
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        Player Stats
      </Typography>
      <ScrollableTable<Player>
        data={players}
        columns={columns}
        filterBy={filterBy}
        onRowClick={handleRowClick}
      />
      {selectedPlayer && playerStats && (
        <Box mt={4}>
          <Typography variant="h6">Stats for {selectedPlayer.player_name}</Typography>
          <PlayerStats stats={playerStats} />
        </Box>
      )}
    </Box>
  );
};

export default PlayerStatsPage;
