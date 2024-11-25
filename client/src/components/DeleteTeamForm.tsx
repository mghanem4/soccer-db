import React, { useState } from 'react';
import { deleteTeam } from '../api';
import { TextField, Button, Box, Typography } from '@mui/material';

interface DeleteTeamFormProps {
  onTeamChange: () => void; // Callback to refresh the team list
}

const DeleteTeamForm: React.FC<DeleteTeamFormProps> = ({ onTeamChange }) => {
  const [teamId, setTeamId] = useState<number | ''>(''); // Team ID to delete

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Ensure teamId is valid
    if (teamId === '') {
      alert('Team ID is required.');
      return;
    }

    try {
      await deleteTeam(teamId); // Call the deleteTeam API function
      alert('Team deleted successfully!');
      onTeamChange(); // Refresh the team list
    } catch (error) {
      console.error('Error deleting team:', error);
      alert('Failed to delete team.');
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
      <Typography variant="h5" gutterBottom>
        Delete Team
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
      <Button variant="contained" color="error" type="submit" sx={{ mt: 2 }}>
        Delete Team
      </Button>
    </Box>
  );
};

export default DeleteTeamForm;
