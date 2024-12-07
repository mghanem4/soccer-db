import React, { useState } from 'react';
import { updateTeam, stripTeamTrophy, assignTeamTrophy } from '../api';
import { TextField, Button, Box, Typography, MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import { Trophy } from '../api';

// This is the interface for the UpdateTeamFormProps
interface UpdateTeamFormProps {
  onTeamChange: () => void; // refresh the team list
  trophies: Trophy[]; // List of trophies available for assignment
}
// This is the UpdateTeamForm component that is used to update a team in the database
const UpdateTeamForm: React.FC<UpdateTeamFormProps> = ({ onTeamChange, trophies }) => {
  const [teamId, setTeamId] = useState<number | ''>(''); // Team ID to update
  const [teamName, setTeamName] = useState('');
  const [teamWins, setTeamWins] = useState<number | ''>('');
  const [teamDraws, setTeamDraws] = useState<number | ''>('');
  const [teamLoses, setTeamLoses] = useState<number | ''>('');
  const [goalsScored, setGoalsScored] = useState<number | ''>('');
  const [selectedTrophy, setSelectedTrophy] = useState<number | ''>(''); // Trophy to assign
  const [yearAwarded, setYearAwarded] = useState<number | ''>(''); // Year for the assigned trophy

  const handleUpdateSubmit = async (e: React.FormEvent) => {
    // Prevent the default form submission behavior
    e.preventDefault();

    if (teamId === '') {
      alert('Team ID is required.');
      return;
    }

    try {
      // Update the team using the api function
      await updateTeam(teamId, {
        team_name: teamName || undefined,
        team_wins: teamWins === '' ? undefined : Number(teamWins),
        team_draws: teamDraws === '' ? undefined : Number(teamDraws),
        team_loses: teamLoses === '' ? undefined : Number(teamLoses),
        goals_scored: goalsScored === '' ? undefined : Number(goalsScored),
      });
      alert('Team updated successfully!');
      onTeamChange(); // Refresh the team list
    } catch (error) {
      console.error('Error updating team:', error);
      alert('Failed to update team.');
    }
  };
// Handles the assignment of a trophy to a team
  const handleAssignTrophy = async () => {
    if (teamId === '' || selectedTrophy === '' || yearAwarded === '') {
      alert('Team ID, Trophy, and Year Awarded are required.');
      return;
    }

    try {
      // Assign the trophy to the team using the api function
      await assignTeamTrophy(Number(teamId), Number(selectedTrophy), Number(yearAwarded));
      alert('Trophy assigned successfully!');
      onTeamChange(); // Refresh the team list
    } catch (error) {
      console.error('Error assigning trophy:', error);
      alert('Failed to assign trophy.');
    }
  };
// Handles the stripping of a trophy from a team
  const handleStripTrophy = async () => {
    if (teamId === '' || selectedTrophy === '') {
      alert('Both Team ID and Trophy ID are required.');
      return;
    }

    try {
      // Strip the trophy from the team using the api function
      await stripTeamTrophy(Number(teamId), Number(selectedTrophy));
      alert('Trophy stripped successfully!');
      onTeamChange(); // Refresh the team list
    } catch (error) {
      console.error('Error stripping trophy:', error);
      alert('Failed to strip trophy.');
    }
  };
// This is the form to update a team in the database
  return (
    <Box component="form" onSubmit={handleUpdateSubmit} sx={{ mt: 3 }}>
      <Typography variant="h5" gutterBottom>
        Update Team
      </Typography>
      <TextField
        label="Team ID"
        fullWidth
        margin="normal"
        type="number"
        value={teamId}
        onChange={(e) => setTeamId(e.target.value === '' ? '' : Number(e.target.value))}
        required
      />
      <TextField
        label="Team Name"
        fullWidth
        margin="normal"
        value={teamName}
        onChange={(e) => setTeamName(e.target.value)}
      />
      <TextField
        label="Wins"
        fullWidth
        margin="normal"
        type="number"
        value={teamWins}
        onChange={(e) => setTeamWins(e.target.value === '' ? '' : Number(e.target.value))}
      />
      <TextField
        label="Draws"
        fullWidth
        margin="normal"
        type="number"
        value={teamDraws}
        onChange={(e) => setTeamDraws(e.target.value === '' ? '' : Number(e.target.value))}
      />
      <TextField
        label="Losses"
        fullWidth
        margin="normal"
        type="number"
        value={teamLoses}
        onChange={(e) => setTeamLoses(e.target.value === '' ? '' : Number(e.target.value))}
      />
      <TextField
        label="Goals Scored"
        fullWidth
        margin="normal"
        type="number"
        value={goalsScored}
        onChange={(e) => setGoalsScored(e.target.value === '' ? '' : Number(e.target.value))}
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
              .filter((trophy) => trophy.trophy_type !== 'Individual') // Exclude individual trophies
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
          disabled={selectedTrophy === ''} // Disable if no trophy is selected
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleAssignTrophy}
          sx={{ marginRight: 2 }}
          disabled={teamId === '' || selectedTrophy === '' || yearAwarded === ''}
        >
          Assign Trophy
        </Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={handleStripTrophy}
          disabled={teamId === '' || selectedTrophy === ''}
        >
          Strip Trophy
        </Button>
      </Box>

      <Button variant="contained" color="primary" type="submit" sx={{ mt: 3 }}>
        Update Team
      </Button>
    </Box>
  );
};

export default UpdateTeamForm;
