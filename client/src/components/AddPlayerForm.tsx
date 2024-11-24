import React, { useState } from 'react';
import { addPlayer } from '../api';
import { TextField, Button, Box, Typography } from '@mui/material';

interface AddPlayerFormProps {
  onPlayerChange: () => void;
}

const AddPlayerForm: React.FC<AddPlayerFormProps> = ({ onPlayerChange }) => {
  const [playerName, setPlayerName] = useState('');
  const [playerCountry, setPlayerCountry] = useState('');
  const [playerDob, setPlayerDob] = useState('');
  const [contract, setContract] = useState('');
  const [position, setPosition] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addPlayer({
        player_name: playerName,
        player_country: playerCountry,
        player_dob: playerDob,
        contract,
        position,
      });
      alert('Player added successfully!');
      onPlayerChange(); // Refresh player list
    } catch (error) {
      console.error('Error adding player:', error);
      alert('Failed to add player.');
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
      <Typography variant="h5" gutterBottom>
        Add Player
      </Typography>
      <TextField
        label="Name"
        fullWidth
        margin="normal"
        value={playerName}
        onChange={(e) => setPlayerName(e.target.value)}
        required
      />
      <TextField
        label="Country"
        fullWidth
        margin="normal"
        value={playerCountry}
        onChange={(e) => setPlayerCountry(e.target.value)}
        required
      />
      <TextField
        label="Date of Birth"
        fullWidth
        margin="normal"
        type="date"
        InputLabelProps={{ shrink: true }}
        value={playerDob}
        onChange={(e) => setPlayerDob(e.target.value)}
        required
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
        required
      />
      <Button variant="contained" color="primary" type="submit" sx={{ mt: 2 }}>
        Add Player
      </Button>
    </Box>
  );
};

export default AddPlayerForm;
