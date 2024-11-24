import React, { useState } from 'react';
import { deletePlayer } from '../api';
import { TextField, Button, Box, Typography } from '@mui/material';

interface DeletePlayerFormProps {
  onPlayerChange: () => void;
}

const DeletePlayerForm: React.FC<DeletePlayerFormProps> = ({ onPlayerChange }) => {
  const [playerId, setPlayerId] = useState<number | ''>('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Ensure playerId is valid
    if (playerId === '') {
      alert('Player ID is required.');
      return;
    }

    try {
      await deletePlayer(playerId);
      alert('Player deleted successfully!');
      onPlayerChange(); // Refresh player list
    } catch (error) {
      console.error('Error deleting player:', error);
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
