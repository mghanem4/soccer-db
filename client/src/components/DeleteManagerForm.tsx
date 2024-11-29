import React, { useState } from 'react';
import { deleteManager } from '../api';
import { TextField, Button, Box, Typography } from '@mui/material';

interface DeleteManagerFormProps {
  onManagerChange: () => void; // Callback to refresh the manager list
}

const DeleteManagerForm: React.FC<DeleteManagerFormProps> = ({ onManagerChange }) => {
  const [managerId, setManagerId] = useState<number | ''>(''); // Manager ID to delete

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (managerId === '') {
      alert('Manager ID is required.');
      return;
    }

    try {
      await deleteManager(managerId);
      alert('Manager deleted successfully!');
      onManagerChange(); // Refresh the manager list
    } catch (error) {
      console.error('Error deleting manager:', error);
      alert('Failed to delete manager.');
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
      <Typography variant="h5" gutterBottom>
        Delete Manager
      </Typography>
      <TextField
        label="Manager ID"
        fullWidth
        margin="normal"
        type="number"
        value={managerId}
        onChange={(e) => setManagerId(e.target.value === '' ? '' : Number(e.target.value))}
        required
      />
      <Button variant="contained" color="error" type="submit" sx={{ mt: 2 }}>
        Delete Manager
      </Button>
    </Box>
  );
};

export default DeleteManagerForm;
