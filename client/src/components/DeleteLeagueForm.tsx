import React, { useState } from 'react';
import { deleteLeague } from '../api';
import { TextField, Button, Box, Typography } from '@mui/material';

interface DeleteLeagueFormProps {
  onLeagueChange: () => void; // Callback to refresh the league list
}

const DeleteLeagueForm: React.FC<DeleteLeagueFormProps> = ({ onLeagueChange }) => {
  const [leagueId, setLeagueId] = useState<number | ''>(''); // League ID to delete

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (leagueId === '') {
      alert('League ID is required.');
      return;
    }

    try {
      await deleteLeague(leagueId);
      alert('League deleted successfully!');
      onLeagueChange(); // Refresh the league list
    } catch (error) {
      console.error('Error deleting league:', error);
      alert('Failed to delete league.');
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
      <Typography variant="h5" gutterBottom>
        Delete League
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
      <Button variant="contained" color="error" type="submit" sx={{ mt: 2 }}>
        Delete League
      </Button>
    </Box>
  );
};

export default DeleteLeagueForm;
