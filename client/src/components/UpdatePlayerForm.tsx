import React, { useState } from 'react';
import { updatePlayer } from '../api';
import { TextField, Button, Box, Typography } from '@mui/material';

interface UpdatePlayerFormProps {
  onPlayerChange: () => void; // Callback to refresh the player list
}

const UpdatePlayerForm: React.FC<UpdatePlayerFormProps> = ({ onPlayerChange }) => {
  const [playerId, setPlayerId] = useState<number | ''>(''); // Player ID to update
  const [playerName, setPlayerName] = useState('');
  const [playerCountry, setPlayerCountry] = useState('');
  const [playerDob, setPlayerDob] = useState('');
  const [contract, setContract] = useState('');
  const [position, setPosition] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Ensure playerId is valid
    if (playerId === '') {
      alert('Player ID is required.');
      return;
    }

    try {
      await updatePlayer(playerId, {
        player_name: playerName || null,
        player_country: playerCountry || null,
        player_dob: playerDob || null,
        contract: contract || null,
        position: position || null,
      });
      alert('Player updated successfully!');
      onPlayerChange(); // Refresh the player list
    } catch (error) {
      console.error('Error updating player:', error);
      alert('Failed to update player.');
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
      <Typography variant="h5" gutterBottom>
        Update Player
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
      <TextField
        label="Name"
        fullWidth
        margin="normal"
        value={playerName}
        onChange={(e) => setPlayerName(e.target.value)}
      />
      <TextField
        label="Country"
        fullWidth
        margin="normal"
        value={playerCountry}
        onChange={(e) => setPlayerCountry(e.target.value)}
      />
      <TextField
        label="Date of Birth"
        fullWidth
        margin="normal"
        type="date"
        InputLabelProps={{ shrink: true }}
        value={playerDob}
        onChange={(e) => setPlayerDob(e.target.value)}
      />
      <TextField
        label="Contract"
        fullWidth
        margin="normal"
        value={contract}
        onChange={(e) => setContract(e.target.value)}
      />
      <TextField
        label="Position"
        fullWidth
        margin="normal"
        value={position}
        onChange={(e) => setPosition(e.target.value)}
      />
      <Button variant="contained" color="primary" type="submit" sx={{ mt: 2 }}>
        Update Player
      </Button>
    </Box>
  );
};

export default UpdatePlayerForm;
