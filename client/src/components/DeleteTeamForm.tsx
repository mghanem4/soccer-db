import React, { useState } from 'react';
import { deleteTeam, deleteTeamTrophies } from '../api'; // Import deleteTeamTrophies API function
import { TextField, Button, Box, Typography } from '@mui/material';

// This is the interface for the DeleteTeamFormProps
interface DeleteTeamFormProps {

  onTeamChange: () => void; // Callback to refresh the team list
}

// This interface is used to define the props for the DeleteTeamForm component
const DeleteTeamForm: React.FC<DeleteTeamFormProps> = ({ onTeamChange }) => {
  const [teamId, setTeamId] = useState<number | ''>(''); // Team ID to delete
  // This function is called when the user clicks the delete team button, it deletes a team from the database

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    if (teamId === '') {
      alert('Team ID is required.');
      return;
    }
  
    try {
      // First delete the team's trophies
      await deleteTeamTrophies(Number(teamId));
      // Then delete the team
      await deleteTeam(Number(teamId));
      alert('Team and associated trophies deleted successfully!');
      onTeamChange(); // Refresh the team list
    } catch (error) {
      console.error('Error deleting team:', error);
      alert('Failed to delete team or associated trophies.');
    }
  };
// This is the form to delete a team from the database
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
