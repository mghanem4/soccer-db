import React, { useState } from 'react';
import { addManager } from '../api';
import { TextField, Button, Box, Typography } from '@mui/material';


{/* This is the interface for the AddManagerFormProps 
  It takes in the following props:
  - onManagerChange: a function that takes in no arguments and returns void

  This interface is used to define the props for the AddManagerForm component
  

  */}
interface AddManagerFormProps {
  onManagerChange: () => void;
}

// state variables for the form fields to add a manager

// This uses react hooks to manage the state of the form fields for adding a manager 

// to add a level of restriction to the form fields, i.e you can only enter a number if the field is initalized to 0 or uses number as a type
const AddManagerForm: React.FC<AddManagerFormProps> = ({ onManagerChange }) => {

  const [managerName, setManagerName] = useState('');
  const [managerAge, setManagerAge] = useState(0);
  // const [age, setAge] = useState<number | ''>('');
  const [managerCountry, setManagerCountry] = useState('');

  // This function is called when the user clicks the add manager button, it adds a new manager to the database by calling the api function addManager

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // if the manager name, age, or country is empty, alert the user that the manager name, age, and country are required
    if (!managerName || !managerAge || !managerCountry) {
      alert('Manager name, date of birth, and country are required.');
      return;
    }

    try {
      // add the manager to the database by calling the addManager function from the api
      await addManager({
        manager_name: managerName,
        age: managerAge,
        // age: age === '' ? undefined : Number(age),
        manager_country: managerCountry,
      });
      alert('Manager added successfully!');
      // adjust the manager list
      onManagerChange();
    } catch (error) {
      // if there is an error, log the error to the console and alert the user that the manager was not added
      console.error('Error adding manager:', error);
      alert('Failed to add manager.');
    }
  };

  return (
    // This is the form to add a manager to the database
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
