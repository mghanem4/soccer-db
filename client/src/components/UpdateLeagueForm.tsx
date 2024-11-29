import React, { useState } from 'react';
import { updateLeague } from '../api';
import { TextField, Button, Box, Typography } from '@mui/material';

interface UpdateLeagueFormProps {
  onLeagueChange: () => void; // Callback to refresh the league list
}

const UpdateLeagueForm: React.FC<UpdateLeagueFormProps> = ({ onLeagueChange }) => {
  const [leagueId, setLeagueId] = useState<number | ''>(''); // League ID to update
  const [totalMatches, setTotalMatches] = useState<number | ''>(''); // Optional
  const [totalTeams, setTotalTeams] = useState<number | ''>(''); // Optional
  const [prize, setPrize] = useState<number | ''>(''); // Optional
  const [leagueName, setLeagueName] = useState(''); // Optional

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (leagueId === '') {
      alert('League ID is required.');
      return;
    }

    try {
      await updateLeague(leagueId, {
        total_matches: totalMatches === '' ? undefined : totalMatches, // Use undefined for empty fields
        total_teams: totalTeams === '' ? undefined : totalTeams,
        prize: prize === '' ? undefined : prize,
        league_name: leagueName || undefined, // Handle empty string
      });
      alert('League updated successfully!');
      onLeagueChange(); // Refresh the league list
    } catch (error) {
      console.error('Error updating league:', error);
      alert('Failed to update league.');
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
      <Typography variant="h5" gutterBottom>
        Update League
      </Typography>
      <TextField
        label="League ID"
        fullWidth
        margin="normal"
        type="number"
        value={leagueId}
        onChange={(e) => setLeagueId(e.target.value === '' ? '' : Number(e.target.value))}
        required
      />
      <TextField
        label="Total Matches"
        fullWidth
        margin="normal"
        type="number"
        value={totalMatches}
        onChange={(e) => setTotalMatches(e.target.value === '' ? '' : Number(e.target.value))}
      />
      <TextField
        label="Total Teams"
        fullWidth
        margin="normal"
        type="number"
        value={totalTeams}
        onChange={(e) => setTotalTeams(e.target.value === '' ? '' : Number(e.target.value))}
      />
      <TextField
        label="Prize"
        fullWidth
        margin="normal"
        type="number"
        value={prize}
        onChange={(e) => setPrize(e.target.value === '' ? '' : Number(e.target.value))}
      />
      <TextField
        label="League Name"
        fullWidth
        margin="normal"
        value={leagueName}
        onChange={(e) => setLeagueName(e.target.value)}
      />
      <Button variant="contained" color="primary" type="submit" sx={{ mt: 2 }}>
        Update League
      </Button>
    </Box>
  );
};

export default UpdateLeagueForm;
