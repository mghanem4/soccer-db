import React, { useState } from 'react';
import { deleteLeague, deleteTrophy } from '../api';
import { TextField, Button, Box, Typography } from '@mui/material';

interface DeleteLeagueFormProps {
  onLeagueChange: () => void;
  onTrophyChange: () => void;
}

const DeleteLeagueForm: React.FC<DeleteLeagueFormProps> = ({ onLeagueChange, onTrophyChange }) => {
  const [leagueId, setLeagueId] = useState<number | ''>(''); // League ID to delete
  const [trophyId, setTrophyId] = useState<number | ''>(''); // Trophy ID to delete

  const handleLeagueSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (leagueId === '') {
      alert('League ID is required.');
      return;
    }

    try {
      await deleteLeague(leagueId);
      alert('League deleted successfully!');
      onLeagueChange();
    } catch (error) {
      console.error('Error deleting league:', error);
      alert('Failed to delete league.');
    }
  };

  const handleTrophySubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (trophyId === '') {
      alert('Trophy ID is required.');
      return;
    }

    try {
      await deleteTrophy(trophyId);
      alert('Trophy deleted successfully!');
      onTrophyChange();
    } catch (error) {
      console.error('Error deleting trophy:', error);
      alert('Failed to delete trophy.');
    }
  };

  return (
    <Box sx={{ mt: 3 }}>
      <Typography variant="h5" gutterBottom>
        Delete League
      </Typography>
      <Box component="form" onSubmit={handleLeagueSubmit}>
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

      <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
        Delete Trophy
      </Typography>
      <Box component="form" onSubmit={handleTrophySubmit}>
        <TextField
          label="Trophy ID"
          fullWidth
          margin="normal"
          type="number"
          value={trophyId}
          onChange={(e) => setTrophyId(e.target.value === '' ? '' : Number(e.target.value))}
          required
        />
        <Button variant="contained" color="error" type="submit" sx={{ mt: 2 }}>
          Delete Trophy
        </Button>
      </Box>
    </Box>
  );
};

export default DeleteLeagueForm;
