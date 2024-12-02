import React, { useState } from 'react';
import { updatePlayer, assignPlayerTrophy, stripPlayerTrophy } from '../api';
import { TextField, Button, Box, Typography, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { Trophy } from '../api';

interface UpdatePlayerFormProps {
  onPlayerChange: () => void; // Callback to refresh the player list
  trophies: Trophy[]; // List of available trophies
}

const UpdatePlayerForm: React.FC<UpdatePlayerFormProps> = ({ onPlayerChange, trophies }) => {
  const [playerId, setPlayerId] = useState<number | ''>(''); // Player ID to update
  const [playerName, setPlayerName] = useState('');
  const [playerCountry, setPlayerCountry] = useState('');
  const [playerAge, setPlayerAge] = useState<number | ''>('');
  const [position, setPosition] = useState('');
  const [selectedTrophy, setSelectedTrophy] = useState<number | ''>(''); // Trophy to assign
  const [yearAwarded, setYearAwarded] = useState<number | ''>(''); // Year of trophy assignment

  const handleUpdateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (playerId === '') {
      alert('Player ID is required.');
      return;
    }

    try {
      await updatePlayer(playerId, {
        player_name: playerName || null,
        player_country: playerCountry || null,
        age: playerAge === '' ? undefined : playerAge,
        position: position || null,
      });
      alert('Player updated successfully!');
      onPlayerChange(); // Refresh the player list
    } catch (error) {
      console.error('Error updating player:', error);
      alert('Failed to update player.');
    }
  };

  const handleAssignTrophy = async () => {
    if (playerId === '' || selectedTrophy === '' || yearAwarded === '') {
      alert('Player ID, Trophy, and Year Awarded are required.');
      return;
    }

    try {
      await assignPlayerTrophy(Number(playerId), Number(selectedTrophy), Number(yearAwarded));
      alert('Trophy assigned successfully!');
      onPlayerChange(); // Refresh the player list
    } catch (error) {
      console.error('Error assigning trophy:', error);
      alert('Failed to assign trophy.');
    }
  };

  const handleStripTrophy = async () => {
    if (playerId === '' || selectedTrophy === '' || yearAwarded === '') {
      alert('Player ID, Trophy, and Year Awarded are required.');
      return;
    }

    try {
      await stripPlayerTrophy(Number(playerId), Number(selectedTrophy), Number(yearAwarded));
      alert('Trophy stripped successfully!');
      onPlayerChange(); // Refresh the player list
    } catch (error) {
      console.error('Error stripping trophy:', error);
      alert('Failed to strip trophy.');
    }
  };

  return (
    <Box component="form" onSubmit={handleUpdateSubmit} sx={{ mt: 3 }}>
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
        label="Player Age"
        fullWidth
        margin="normal"
        type="number"
        value={playerAge}
        onChange={(e) => setPlayerAge(e.target.value === '' ? '' : Number(e.target.value))}
      />
      <TextField
        label="Position"
        fullWidth
        margin="normal"
        value={position}
        onChange={(e) => setPosition(e.target.value)}
      />

      <Box sx={{ mt: 3 }}>
        <Typography variant="h6" gutterBottom>
          Manage Trophies
        </Typography>
        <FormControl fullWidth sx={{ marginBottom: 2 }}>
          <InputLabel id="trophy-select-label">Select Trophy</InputLabel>
          <Select
            labelId="trophy-select-label"
            value={selectedTrophy}
            onChange={(e) => setSelectedTrophy(e.target.value === '' ? '' : Number(e.target.value))}
          >
            {trophies
              .filter((trophy) => trophy.trophy_type === 'Individual') // Only individual trophies
              .map((trophy) => (
                <MenuItem key={trophy.trophy_id} value={trophy.trophy_id}>
                  {trophy.trophy_name}
                </MenuItem>
              ))}
          </Select>
        </FormControl>
        <TextField
          label="Year Awarded"
          fullWidth
          margin="normal"
          type="number"
          value={yearAwarded}
          onChange={(e) => setYearAwarded(e.target.value === '' ? '' : Number(e.target.value))}
          disabled={selectedTrophy === ''}
        />
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleAssignTrophy}
            disabled={selectedTrophy === '' || yearAwarded === ''}
          >
            Assign Trophy
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={handleStripTrophy}
            disabled={selectedTrophy === '' || yearAwarded === ''}
          >
            Strip Trophy
          </Button>
        </Box>
      </Box>

      <Button variant="contained" color="primary" type="submit" sx={{ mt: 3 }}>
        Update Player
      </Button>
    </Box>
  );
};

export default UpdatePlayerForm;
