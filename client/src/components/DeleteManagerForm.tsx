import React, { useState } from 'react';
import { deleteManager } from '../api';
import { TextField, Button, Box, Typography } from '@mui/material';

// This is the interface for the DeleteManagerFormProps
// It takes in the following props:
// - onManagerChange: a function that takes in no arguments and returns void
interface DeleteManagerFormProps {
  onManagerChange: () => void; // Callback to refresh the manager list
}
// This interface is used to define the props for the DeleteManagerForm component
// This page is a form that takes a manager id to delete from the database.

const DeleteManagerForm: React.FC<DeleteManagerFormProps> = ({ onManagerChange }) => {
  const [managerId, setManagerId] = useState<number | ''>(''); // Manager ID to delete

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
// if the manager id is empty, alert the user that the manager id is required
    if (managerId === '') {
      alert('Manager ID is required.');
      return;
    }
    // if the manager id is not a number, alert the user that the manager id must be a number

    try {
      // delete the manager by calling the deleteManager function from the api
      await deleteManager(managerId);
      alert('Manager deleted successfully!');
      onManagerChange(); // Refresh the manager list
    } catch (error) {
      console.error('Error deleting manager:', error);
      alert('Failed to delete manager.');
    }
  };
// This is the form to delete a manager from the database
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
