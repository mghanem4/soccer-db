import React, { useState } from 'react';
import { deletePlayerTrophies, deletePlayer } from '../api';
import { TextField, Button, Box, Typography } from '@mui/material';

interface DeletePlayerFormProps {
  onPlayerChange: () => void; // Callback to refresh the player list
}

const DeletePlayerForm: React.FC<DeletePlayerFormProps> = ({ onPlayerChange }) => {
  const [playerId, setPlayerId] = useState<number | ''>('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (playerId === '') {
      alert('Player ID is required.');
      return;
    }

    try {
      // Step 1: Delete the player's trophies
      await deletePlayerTrophies(Number(playerId));

      // Step 2: Delete the player from the Players table
      await deletePlayer(Number(playerId));

      alert('Player and their trophies deleted successfully!');
      onPlayerChange(); // Refresh player list
    } catch (error) {
      console.error('Error deleting player or their trophies:', error);
      alert('Failed to delete player.');
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
      <Typography variant="h5" gutterBottom>
        Delete Player
      </Typography>
      <TextField
        label="Player ID"
        fullWidth
        margin="normal"
        type="number"
        value={playerId}
        onChange={(e) => setPlayerId(e.target.value === '' ? '' : Number(e.target.value))}
        required
      />
      <Button variant="contained" color="error" type="submit" sx={{ mt: 2 }}>
        Delete Player
      </Button>
    </Box>
  );
};

export default DeletePlayerForm;
