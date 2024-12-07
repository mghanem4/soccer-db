import React, { useState } from 'react';
import { deleteLeague } from '../api';
import { TextField, Button, Box, Typography } from '@mui/material';
// This is the interface for the DeleteLeagueFormProps

interface DeleteLeagueFormProps {
  onLeagueChange: () => void;
}
{/*
  It takes in the following props:
  - onLeagueChange: a function that takes in no arguments and returns void
  */}
// This interface is used to define the props for the DeleteLeagueForm component
// This page is a form that takes a league id to delete from the database.

const DeleteLeagueForm: React.FC<DeleteLeagueFormProps> = ({ onLeagueChange }) => {
  const [leagueId, setLeagueId] = useState<number | ''>(''); // League ID to delete
  const [warningMessage, setWarningMessage] = useState<string | null>(null); // Error warning message
// This function is called when the user clicks the delete league button, it deletes a league from the database
  const handleLeagueSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (leagueId === '') {
      // check if the league id is empty, if it is, set the warning message to League ID is required
      setWarningMessage('League ID is required.');
      return;
    }

    try {
      // delete the league by calling the deleteLeague function from the api
      await deleteLeague(leagueId);
      alert('League deleted successfully!');
      onLeagueChange();
      setWarningMessage(null); // Clear any previous warnings
    } catch (error) {
      console.error('Error deleting league:', error);
      setWarningMessage('Failed to delete league. Please try again.');
    }
  };
// This is the form to delete a league from the database
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
