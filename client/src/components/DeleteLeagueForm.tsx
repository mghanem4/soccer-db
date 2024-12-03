import React, { useState } from 'react';
import { deleteLeague } from '../api';
import { TextField, Button, Box, Typography } from '@mui/material';

interface DeleteLeagueFormProps {
  onLeagueChange: () => void;
}

const DeleteLeagueForm: React.FC<DeleteLeagueFormProps> = ({ onLeagueChange }) => {
  const [leagueId, setLeagueId] = useState<number | ''>(''); // League ID to delete
  const [warningMessage, setWarningMessage] = useState<string | null>(null); // Error warning message

  const handleLeagueSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (leagueId === '') {
      setWarningMessage('League ID is required.');
      return;
    }

    try {
      await deleteLeague(leagueId);
      alert('League deleted successfully!');
      onLeagueChange();
      setWarningMessage(null); // Clear any previous warnings
    } catch (error) {
      console.error('Error deleting league:', error);
      setWarningMessage('Failed to delete league. Please try again.');
    }
  };

  return (
    <Box sx={{ mt: 3 }}>
      <Typography variant="h5" gutterBottom>
        Delete League
      </Typography>

      {/* Static Warning Box */}
      <Box
        sx={{
          backgroundColor: '#fff4e5',
          color: '#b71c1c',
          border: '1px solid #f5c6cb',
          padding: '10px',
          borderRadius: '5px',
          marginBottom: '15px',
        }}
      >
        <strong>Important:</strong> Deleting a league will also delete the trophy assigned to it because of the 1:1 relationship.
      </Box>

      {/* Dynamic Warning Box for Errors */}
      {warningMessage && (
        <Box
          sx={{
            backgroundColor: '#fff4e5',
            color: '#b71c1c',
            border: '1px solid #f5c6cb',
            padding: '10px',
            borderRadius: '5px',
            marginBottom: '10px',
          }}
        >
          <strong>Warning:</strong> {warningMessage}
        </Box>
      )}

      {/* Form */}
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
    </Box>
  );
};

export default DeleteLeagueForm;
