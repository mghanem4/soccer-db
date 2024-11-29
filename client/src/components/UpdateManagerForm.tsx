import React, { useState } from 'react';
import { updateManager } from '../api';
import { TextField, Button, Box, Typography } from '@mui/material';

interface UpdateManagerFormProps {
  onManagerChange: () => void; // Callback to refresh the manager list
}

const UpdateManagerForm: React.FC<UpdateManagerFormProps> = ({ onManagerChange }) => {
  const [managerId, setManagerId] = useState<number | ''>(''); // Manager ID to update
  const [managerName, setManagerName] = useState('');
  const [managerDob, setManagerDob] = useState('');
  // const [age, setAge] = useState<number | ''>(''); // Optional
  const [managerCountry, setManagerCountry] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (managerId === '') {
      alert('Manager ID is required.');
      return;
    }

    try {
      await updateManager(managerId, {
        manager_name: managerName || undefined,
        manager_dob: managerDob || undefined,
        // age: age === '' ? undefined : age,
        manager_country: managerCountry || undefined,
      });
      alert('Manager updated successfully!');
      onManagerChange(); // Refresh the manager list
    } catch (error) {
      console.error('Error updating manager:', error);
      alert('Failed to update manager.');
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
      <Typography variant="h5" gutterBottom>
        Update Manager
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
      <TextField
        label="Manager Name"
        fullWidth
        margin="normal"
        value={managerName}
        onChange={(e) => setManagerName(e.target.value)}
      />
      <TextField
        label="Date of Birth"
        fullWidth
        margin="normal"
        type="date"
        InputLabelProps={{ shrink: true }}
        value={managerDob}
        onChange={(e) => setManagerDob(e.target.value)}
      />

      <TextField
        label="Country"
        fullWidth
        margin="normal"
        value={managerCountry}
        onChange={(e) => setManagerCountry(e.target.value)}
      />
      <Button variant="contained" color="primary" type="submit" sx={{ mt: 2 }}>
        Update Manager
      </Button>
    </Box>
  );
};

export default UpdateManagerForm;
