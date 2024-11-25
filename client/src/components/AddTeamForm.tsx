import React, { useState } from 'react';
import { addTeam } from '../api';
import { TextField, Button, Box, Typography } from '@mui/material';

interface AddTeamFormProps {
  onTeamChange: () => void;
}

const AddTeamForm: React.FC<AddTeamFormProps> = ({ onTeamChange }) => {
  const [teamName, setTeamName] = useState('');
  const [teamWins, setTeamWins] = useState(0);
  const [teamLosses, setTeamLosses] = useState(0);
  const [teamDraws, setTeamDraws] = useState(0);
  const [teamTrophies, setTeamTrophies] = useState(0);
  const [goalsScored, setGoalsScored] = useState(0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (teamName === '') {
      alert('Team name is required.');
      return;
    }
    try {
      await addTeam({
        team_name: teamName,
        team_wins: teamWins,
        team_loses: teamLosses,
        team_draws: teamDraws,
        team_trophies: teamTrophies,
        goals_scored: goalsScored,
      });
      alert('Team added successfully!');
      onTeamChange(); // Refresh team list
    } catch (error) {
      console.error('Error adding team:', error);
      alert('Failed to add team.');
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
      <Typography variant="h5" gutterBottom>
        Add Team
      </Typography>
      <TextField
        label="Team Name"
        fullWidth
        margin="normal"
        value={teamName}
        onChange={(e) => setTeamName(e.target.value)}
        required
      />
      <TextField
        label="Wins"
        fullWidth
        margin="normal"
        type="number"
        value={teamWins}
        onChange={(e) => setTeamWins(Number(e.target.value))}
      />
      <TextField
        label="Losses"
        fullWidth
        margin="normal"
        type="number"
        value={teamLosses}
        onChange={(e) => setTeamLosses(Number(e.target.value))}
      />
      <TextField
        label="Draws"
        fullWidth
        margin="normal"
        type="number"
        value={teamDraws}
        onChange={(e) => setTeamDraws(Number(e.target.value))}
      />
      <TextField
        label="Trophies"
        fullWidth
        margin="normal"
        type="number"
        value={teamTrophies}
        onChange={(e) => setTeamTrophies(Number(e.target.value))}
      />
      <TextField
        label="Goals Scored"
        fullWidth
        margin="normal"
        type="number"
        value={goalsScored}
        onChange={(e) => setGoalsScored(Number(e.target.value))}
      />
      <Button variant="contained" color="primary" type="submit" sx={{ mt: 2 }}>
        Add Team
      </Button>
    </Box>
  );
};

export default AddTeamForm;
