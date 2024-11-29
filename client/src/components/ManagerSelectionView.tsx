import React, { useState, useEffect } from 'react';
import { getManagers, Manager } from '../api';
import AddManagerForm from './AddManagerForm';
import UpdateManagerForm from './UpdateManagerForm';
import DeleteManagerForm from './DeleteManagerForm';
import { Container, Typography, MenuItem, Select, FormControl, InputLabel, Box } from '@mui/material';

const ManagerSelectionView: React.FC = () => {
  const [managers, setManagers] = useState<Manager[]>([]); // Shared state for managers
  const [selectedAction, setSelectedAction] = useState<string | null>(null);

  // Fetch managers from the database
  const fetchManagers = async () => {
    try {
      const data = await getManagers();
      setManagers(data);
    } catch (error) {
      console.error('Error fetching managers:', error);
    }
  };

  useEffect(() => {
    fetchManagers(); // Fetch managers on component mount
  }, []);

  return (
    <Container maxWidth="md">
      <Typography variant="h4" gutterBottom textAlign="center" sx={{ marginTop: '20px' }}>
        Manage Managers
      </Typography>

      <FormControl fullWidth sx={{ marginY: 2 }}>
        <InputLabel id="action-select-label">Choose an Action</InputLabel>
        <Select
          labelId="action-select-label"
          value={selectedAction || ''}
          onChange={(e) => setSelectedAction(e.target.value)}
        >
          <MenuItem value="add">Add Manager</MenuItem>
          <MenuItem value="update">Update Manager</MenuItem>
          <MenuItem value="delete">Delete Manager</MenuItem>
        </Select>
      </FormControl>

      {/* Display the list of managers */}
      <Box sx={{ marginBottom: 2 }}>
        <Typography variant="h5" gutterBottom>
          Current Managers
        </Typography>
        {managers.map((manager) => (
          <Typography key={manager.manager_id}>
            {manager.manager_id}. {manager.manager_name} - DOB: {manager.manager_dob}, Country: {manager.manager_country}
          </Typography>
        ))}
      </Box>

      {/* Render the appropriate form based on the selected action */}
      {selectedAction === 'add' && <AddManagerForm onManagerChange={fetchManagers} />}
      {selectedAction === 'update' && <UpdateManagerForm onManagerChange={fetchManagers} />}
      {selectedAction === 'delete' && <DeleteManagerForm onManagerChange={fetchManagers} />}
    </Container>
  );
};

export default ManagerSelectionView;
