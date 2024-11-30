import React, { useState } from 'react';
import { addLeague } from '../api';
import { TextField, Button, Box, Typography } from '@mui/material';

interface AddLeagueFormProps {
  onLeagueChange: () => void;
}

const AddLeagueForm: React.FC<AddLeagueFormProps> = ({ onLeagueChange }) => {
  const [totalMatches, setTotalMatches] = useState(0);
  const [totalTeams, setTotalTeams] = useState(0);
  const [prize, setPrize] = useState<number | ''>('');
  const [leagueName, setLeagueName] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!totalMatches || !totalTeams || !leagueName) {
      alert('Total matches, total teams, and league name are required.');
      return;
    }

    try {
      await addLeague({
        total_matches: totalMatches,
        total_teams: totalTeams,
        prize: prize === '' ? undefined : Number(prize),
        league_name: leagueName,
      });
      alert('League added successfully!');
      onLeagueChange();
    } catch (error) {
      console.error('Error adding league:', error);
      alert('Failed to add league.');
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
      <Typography variant="h5" gutterBottom>
        Add League
      </Typography>
      <TextField
        label="League Name"
        fullWidth
        margin="normal"
        value={leagueName}
        onChange={(e) => setLeagueName(e.target.value)}
        required
      />
      <TextField
        label="Total Matches"
        fullWidth
        margin="normal"
        type="number"
        value={totalMatches}
        onChange={(e) => setTotalMatches(Number(e.target.value))}
        required
      />
      <TextField
        label="Total Teams"
        fullWidth
        margin="normal"
        type="number"
        value={totalTeams}
        onChange={(e) => setTotalTeams(Number(e.target.value))}
        required
      />
      <TextField
        label="Prize"
        fullWidth
        margin="normal"
        type="number"
        value={prize}
        onChange={(e) => setPrize(Number(e.target.value))}
      />

      <Button variant="contained" color="primary" type="submit" sx={{ mt: 2 }}>
        Add League
      </Button>
    </Box>
  );
};

export default AddLeagueForm;
