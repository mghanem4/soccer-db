import React, { useState, useEffect } from 'react';
import PlayerList from './PlayerList';
import AddPlayerForm from './AddPlayerForm';
import UpdatePlayerForm from './UpdatePlayerForm';
import DeletePlayerForm from './DeletePlayerForm';
import { getPlayers, Player } from '../api';
import { Container, Typography, MenuItem, Select, FormControl, InputLabel, Box } from '@mui/material';

const SelectionView: React.FC = () => {
  const [players, setPlayers] = useState<Player[]>([]); // Shared state for players
  const [selectedAction, setSelectedAction] = useState<string | null>(null);

  // Fetch players from the database
  const fetchPlayers = async () => {
    try {
      const data = await getPlayers();
      setPlayers(data);
    } catch (error) {
      console.error('Error fetching players:', error);
    }
  };

  useEffect(() => {
    fetchPlayers(); // Fetch players on component mount
  }, []);

  return (
    <Container maxWidth="md">
      <Typography variant="h4" gutterBottom textAlign="center" sx={{ marginTop: '20px' }}>
        Manage Players
      </Typography>

      <FormControl fullWidth sx={{ marginY: 2 }}>
        <InputLabel id="action-select-label">Choose an Action</InputLabel>
        <Select
          labelId="action-select-label"
          value={selectedAction || ''}
          onChange={(e) => setSelectedAction(e.target.value)}
        >
          <MenuItem value="add">Add Player</MenuItem>
          <MenuItem value="update">Update Player</MenuItem>
          <MenuItem value="delete">Delete Player</MenuItem>
        </Select>
      </FormControl>

      <PlayerList players={players} />

      {selectedAction === 'add' && <AddPlayerForm onPlayerChange={fetchPlayers} />}
      {selectedAction === 'update' && <UpdatePlayerForm onPlayerChange={fetchPlayers} />}
      {selectedAction === 'delete' && <DeletePlayerForm onPlayerChange={fetchPlayers} />}
    </Container>
  );
};

export default SelectionView;
