import React, { useState } from 'react';
import { addTeam, assignTeamTrophy } from '../api';
import { TextField, Button, Box, Typography, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { Trophy } from '../api';
// This is the interface for the AddTeamFormProps
interface AddTeamFormProps {
  onTeamChange: () => void;
  trophies: Trophy[]; // Add this to the props
}

{/* This is the AddTeamForm component that is used to add a team to the database
  It takes in the onTeamChange function and the list of trophies as props
   */
}


// state variables for the form fields to add a team
const AddTeamForm: React.FC<AddTeamFormProps> = ({ onTeamChange, trophies }) => {
  const [teamName, setTeamName] = useState('');
  const [teamWins, setTeamWins] = useState<number | ''>('');
  const [teamDraws, setTeamDraws] = useState<number | ''>('');
  const [teamLoses, setTeamLoses] = useState<number | ''>('');
  const [goalsScored, setGoalsScored] = useState<number | ''>('');
  const [selectedTrophy, setSelectedTrophy] = useState<number | ''>(''); 
  const [yearAwarded, setYearAwarded] = useState<number | ''>(''); 

  // This function is called when the user clicks the add team button, it adds a new team to the database
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  // trim to not accept empty strings
    if (teamName.trim() === '') {
      alert('Team Name is required.');
      return;
    }
  
    try {
      // Add the team and get the generated team ID
      const teamId = await addTeam({
        team_name: teamName,
        team_wins: teamWins === '' ? 0 : Number(teamWins),
        team_draws: teamDraws === '' ? 0 : Number(teamDraws),
        team_loses: teamLoses === '' ? 0 : Number(teamLoses),
        goals_scored: goalsScored === '' ? 0 : Number(goalsScored),
      });
  
      // Assign the trophy if selected with the generated team ID
      if (selectedTrophy !== '' && yearAwarded !== '') {
        await assignTeamTrophy(teamId, Number(selectedTrophy), Number(yearAwarded));
        alert('Trophy assigned successfully!');
      }
  
      alert('Team added successfully!');
      onTeamChange(); // Refresh the team list
    } catch (error) {
      console.error('Error adding team:', error);
      alert('Failed to add team.');
    }
  };
  
// This is the form to add a team to the database
  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
      <Typography variant="h5" gutterBottom>
        Add Team
      </Typography>
      <TextField
        label="Team Name"
        fullWidth
        margin="normal"
        value={teamName}
        onChange={(e) => setTeamName(e.target.value)}
        required
      />
      <TextField
        label="Wins"
        fullWidth
        margin="normal"
        type="number"
        value={teamWins}
        onChange={(e) => setTeamWins(e.target.value === '' ? '' : Number(e.target.value))}
      />
      <TextField
        label="Draws"
        fullWidth
        margin="normal"
        type="number"
        value={teamDraws}
        onChange={(e) => setTeamDraws(e.target.value === '' ? '' : Number(e.target.value))}
      />
      <TextField
        label="Losses"
        fullWidth
        margin="normal"
        type="number"
        value={teamLoses}
        onChange={(e) => setTeamLoses(e.target.value === '' ? '' : Number(e.target.value))}
      />
      <TextField
        label="Goals Scored"
        fullWidth
        margin="normal"
        type="number"
        value={goalsScored}
        onChange={(e) => setGoalsScored(e.target.value === '' ? '' : Number(e.target.value))}
      />

      <Box sx={{ mt: 3 }}>
        <Typography variant="h6" gutterBottom>
          Assign Trophy (Optional)
        </Typography>
        <FormControl fullWidth sx={{ marginBottom: 2 }}>
          <InputLabel id="trophy-select-label">Select Trophy</InputLabel>
          <Select
            labelId="trophy-select-label"
            value={selectedTrophy}
            onChange={(e) => setSelectedTrophy(e.target.value === '' ? '' : Number(e.target.value))}
          >
            {trophies
              .filter((trophy) => trophy.trophy_type !== 'Individual') // Exclude individual trophies
              .map((trophy) => (
                <MenuItem key={trophy.trophy_id} value={trophy.trophy_id}>
                  {trophy.trophy_name}
                </MenuItem>
              ))}
          </Select>
        </FormControl>
        <TextField
          label="Year Awarded"
          fullWidth
          margin="normal"
          type="number"
          value={yearAwarded}
          onChange={(e) => setYearAwarded(e.target.value === '' ? '' : Number(e.target.value))}
          disabled={selectedTrophy === ''} // Disable if no trophy is selected
        />
      </Box>

      <Button variant="contained" color="primary" type="submit" sx={{ mt: 2 }}>
        Add Team
      </Button>
    </Box>
  );
};

export default AddTeamForm;
