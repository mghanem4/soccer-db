import React, { useState } from 'react';
import { updateManager } from '../api';
import { TextField, Button, Box, Typography } from '@mui/material';

interface UpdateManagerFormProps {
  onManagerChange: () => void; // Callback to refresh the manager list
}

const UpdateManagerForm: React.FC<UpdateManagerFormProps> = ({ onManagerChange }) => {
  const [managerId, setManagerId] = useState<number | ''>(''); // Manager ID to update
  const [managerName, setManagerName] = useState('');
  const [managerAge, setManagerAge] = useState(0);
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
        age: managerAge || undefined,
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
        label="Manager Age"
        fullWidth
        margin="normal"
        type="number"
        value={managerAge}
        onChange={(e) => setManagerAge(Number(e.target.value))}
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
