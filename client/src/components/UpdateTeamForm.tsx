import React, { useState } from 'react';
import { updateTeam } from '../api';
import { TextField, Button, Box, Typography } from '@mui/material';

interface UpdateTeamFormProps {
  onTeamChange: () => void; // Callback to refresh the team list
}

const UpdateTeamForm: React.FC<UpdateTeamFormProps> = ({ onTeamChange }) => {
  const [teamId, setTeamId] = useState<number | ''>(''); // Team ID to update
  const [teamName, setTeamName] = useState('');
  const [teamWins, setTeamWins] = useState<number | ''>('');
  const [teamDraws, setTeamDraws] = useState<number | ''>('');
  const [teamLoses, setTeamLoses] = useState<number | ''>('');
  const [teamTrophies, setTeamTrophies] = useState<number | ''>('');
  const [goalsScored, setGoalsScored] = useState<number | ''>('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Ensure teamId is valid
    if (teamId === '') {
      alert('Team ID is required.');
      return;
    }

    try {
      await updateTeam(teamId, {
        team_name: teamName || null,
        team_wins: teamWins || null,
        team_draws: teamDraws || null,
        team_loses: teamLoses || null,
        team_trophies: teamTrophies || null,
        goals_scored: goalsScored || null,
      });
      alert('Team updated successfully!');
      onTeamChange(); // Refresh the team list
    } catch (error) {
      console.error('Error updating team:', error);
      alert('Failed to update team.');
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
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
        label="Name"
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
        label="Loses"
        fullWidth
        margin="normal"
        type="number"
        value={teamLoses}
        onChange={(e) => setTeamLoses(e.target.value === '' ? '' : Number(e.target.value))}
      />
      <TextField
        label="Trophies"
        fullWidth
        margin="normal"
        type="number"
        value={teamTrophies}
        onChange={(e) => setTeamTrophies(e.target.value === '' ? '' : Number(e.target.value))}
      />
      <TextField
        label="Goals Scored"
        fullWidth
        margin="normal"
        type="number"
        value={goalsScored}
        onChange={(e) => setGoalsScored(e.target.value === '' ? '' : Number(e.target.value))}
      />
      <Button variant="contained" color="primary" type="submit" sx={{ mt: 2 }}>
        Update Team
      </Button>
    </Box>
  );
};

export default UpdateTeamForm;
