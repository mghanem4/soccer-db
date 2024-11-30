import React, { useState } from 'react';
import { addManager } from '../api';
import { TextField, Button, Box, Typography } from '@mui/material';

interface AddManagerFormProps {
  onManagerChange: () => void;
}

const AddManagerForm: React.FC<AddManagerFormProps> = ({ onManagerChange }) => {
  const [managerName, setManagerName] = useState('');
  const [managerAge, setManagerAge] = useState(0);
  // const [age, setAge] = useState<number | ''>('');
  const [managerCountry, setManagerCountry] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!managerName || !managerAge || !managerCountry) {
      alert('Manager name, date of birth, and country are required.');
      return;
    }

    try {
      await addManager({
        manager_name: managerName,
        age: managerAge,
        // age: age === '' ? undefined : Number(age),
        manager_country: managerCountry,
      });
      alert('Manager added successfully!');
      onManagerChange();
    } catch (error) {
      console.error('Error adding manager:', error);
      alert('Failed to add manager.');
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
      <Typography variant="h5" gutterBottom>
        Add Manager
      </Typography>
      <TextField
        label="Manager Name"
        fullWidth
        margin="normal"
        value={managerName}
        onChange={(e) => setManagerName(e.target.value)}
        required
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
        required
      />
      <Button variant="contained" color="primary" type="submit" sx={{ mt: 2 }}>
        Add Manager
      </Button>
    </Box>
  );
};

export default AddManagerForm;
