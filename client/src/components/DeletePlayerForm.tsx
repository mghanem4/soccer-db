import React, { useState } from 'react';
import { deletePlayerTrophies, deletePlayer } from '../api';
import { TextField, Button, Box, Typography } from '@mui/material';
// This is the interface for the DeletePlayerFormProps
interface DeletePlayerFormProps {
  onPlayerChange: () => void; // Callback to refresh the player list
}

// This interface is used to define the props for the DeletePlayerForm component


const DeletePlayerForm: React.FC<DeletePlayerFormProps> = ({ onPlayerChange }) => {
  const [playerId, setPlayerId] = useState<number | ''>('');
// submit the form to delete a player from the database
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (playerId === '') {
      alert('Player ID is required.');
      return;
    }

    try {
// deleting the player will also handle deleting the trophies associated with the player
      await deletePlayer(Number(playerId));

      alert('Player and their trophies deleted successfully!');
      onPlayerChange(); // Refresh player list
    } catch (error) {
      console.error('Error deleting player or their trophies:', error);
      alert('Failed to delete player.');
    }
  };
// This is the form to delete a player from the database
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
