import React, { useState } from 'react';
import {
  updatePlayer,
  updatePlayerTeam,
  assignPlayerTrophy,
  stripPlayerTrophy,
} from '../api';
import {
  TextField,
  Button,
  Box,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import { Trophy, Team } from '../api';

interface UpdatePlayerFormProps {
  
  onPlayerChange: () => void; // Callback to refresh the player list
  trophies: Trophy[]; // List of available trophies
  teams: Team[]; // List of available teams
}
// This is the UpdatePlayerForm component that is used to update a player in the database
const UpdatePlayerForm: React.FC<UpdatePlayerFormProps> = ({
  onPlayerChange,
  trophies,
  teams,
}) => {
  const [playerId, setPlayerId] = useState<number | ''>(''); // Player ID to update
  const [playerName, setPlayerName] = useState('');
  const [playerCountry, setPlayerCountry] = useState('');
  const [playerAge, setPlayerAge] = useState<number | ''>('');
  const [position, setPosition] = useState('');
  const [selectedTrophy, setSelectedTrophy] = useState<number | ''>(''); // Trophy to assign
  const [yearAwarded, setYearAwarded] = useState<number | ''>(''); // Year of trophy assignment
  const [teamId, setTeamId] = useState<number | ''>(''); // Team to assign
  const [startDate, setStartDate] = useState<string>(''); // Start date with the team
  const [endDate, setEndDate] = useState<string>(''); // End date with the team

  const handleUpdateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (playerId === '') {
      alert('Player ID is required.');
      return;
    }

    try {
      // Update the player
      await updatePlayer(playerId, {
        player_name: playerName || null,
        player_country: playerCountry || null,
        age: playerAge === '' ? undefined : playerAge,
        position: position || null,
      });
      if (teamId !== '') {
        // Update the player's team assignment
        await updatePlayerTeam(playerId, Number(teamId), startDate || undefined, endDate || undefined);
        alert('Player team updated successfully!');
      }

      alert('Player updated successfully!');
      onPlayerChange(); // Refresh the player list
    } catch (error) {
      console.error('Error updating player:', error);
      alert('Failed to update player.');
    }
  };
// This function is called when the user clicks the assign trophy button, it assigns a trophy to a player
// It checks if the player ID, trophy, and year awarded are not empty
  const handleAssignTrophy = async () => {
    if (playerId === '' || selectedTrophy === '' || yearAwarded === '') {
      alert('Player ID, Trophy, and Year Awarded are required.');
      return;
    }

    try {
      // Call the assignPlayerTrophy api function to assign the player to the trophy
      await assignPlayerTrophy(Number(playerId), Number(selectedTrophy), Number(yearAwarded));
      alert('Trophy assigned successfully!');
      onPlayerChange(); // Refresh the player list
    } catch (error) {
      console.error('Error assigning trophy:', error);
      alert('Failed to assign trophy.');
    }
  };
// This function is called when the user clicks the strip trophy button, it strips a trophy from a player
  const handleStripTrophy = async () => {
    if (playerId === '' || selectedTrophy === '' || yearAwarded === '') {
      alert('Player ID, Trophy, and Year Awarded are required.');
      return;
    }

    try {
      // Call the stripPlayerTrophy api function to strip the trophy from the player
      await stripPlayerTrophy(Number(playerId), Number(selectedTrophy), Number(yearAwarded));
      alert('Trophy stripped successfully!');
      onPlayerChange(); // Refresh the player list
    } catch (error) {
      console.error('Error stripping trophy:', error);
      alert('Failed to strip trophy.');
    }
  };
// return the form to update a player
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

      <Box sx={{ mt: 3 }}>
        <Typography variant="h6" gutterBottom>
          Update Team Assignment
        </Typography>
        <FormControl fullWidth sx={{ marginBottom: 2 }}>
          <InputLabel id="team-select-label">Select Team</InputLabel>
          <Select
            labelId="team-select-label"
            value={teamId}
            onChange={(e) => setTeamId(e.target.value === '' ? '' : Number(e.target.value))}
          >
            {teams.map((team) => (
              <MenuItem key={team.team_id} value={team.team_id}>
                {team.team_name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          label="Start Date"
          fullWidth
          margin="normal"
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
        <TextField
          label="End Date"
          fullWidth
          margin="normal"
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
      </Box>

      <Button variant="contained" color="primary" type="submit" sx={{ mt: 3 }}>
        Update Player
      </Button>
    </Box>
  );
};

export default UpdatePlayerForm;
