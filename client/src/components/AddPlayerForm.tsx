import React, { useState, useEffect } from 'react';
import { addPlayer, assignPlayerTrophy, addPlayerToTeam, getTeams } from '../api'; 
import { TextField, Button, Box, Typography, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { Trophy, Team } from '../api';

interface AddPlayerFormProps {
  onPlayerChange: () => void;
  trophies: Trophy[]; // List of trophies
}
{/* This is the AddPlayerForm component that is used to add a player to the database
  It takes in the onPlayerChange function and the list of trophies as props
  The component has the following state variables:
  - playerName: the name of the player
  - playerCountry: the country of the player
  - playerTrophy: the trophy that the player is assigned to
  - playerAge: the age of the player
  - position: the position of the player
  - team: the team that the player is assigned to
  - teams: the list of teams
  */}
const AddPlayerForm: React.FC<AddPlayerFormProps> = ({ onPlayerChange, trophies }) => {
  const [playerName, setPlayerName] = useState('');
  const [playerCountry, setPlayerCountry] = useState('');
  const [playerAge, setPlayerAge] = useState<number | ''>('');
  const [position, setPosition] = useState('');
  const [selectedTrophy, setSelectedTrophy] = useState<number | ''>(''); // Trophy to assign
  const [yearAwarded, setYearAwarded] = useState<number | ''>(''); // Year awarded for the trophy
  const [selectedTeam, setSelectedTeam] = useState<number | ''>(''); // Team to assign
  const [startDate, setStartDate] = useState<string>(''); // Start date for the team
  const [teams, setTeams] = useState<Team[]>([]); // List of teams

  // Fetch teams on component mount
  useEffect(() => {
    const fetchTeams = async () => {
      try {
        // call the getTeams api function and wait for the response
        const data = await getTeams();
        setTeams(data);
      } catch (error) {
        console.error('Error fetching teams:', error);
      }
    };
    // Call the fetchTeams function to get the teams
    fetchTeams();
  }, []);

  {/* This function is called when the user clicks the add player button, it adds a new player to the database */}
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    if (!playerName || !playerCountry || !position) {
      alert('Player name, country, and position are required.');
      return;
    }
  
    try {
      // Add the player and get their ID
      const playerId = await addPlayer({
        player_name: playerName,
        player_country: playerCountry,
        age: playerAge === '' ? 0 : Number(playerAge),
        position,
      });
  
      console.log('Created Player ID:', playerId); // Debug log
  
      // Assign the player to a team if selected
      if (selectedTeam !== '' && startDate) {
        await addPlayerToTeam(playerId, Number(selectedTeam), startDate);
        alert('Player added to team successfully!');
      }
  
      alert('Player added successfully!');
      onPlayerChange(); // Refresh the player list
    } catch (error) {
      console.error('Error adding player:', error);
      alert('Failed to add player.');
    }
  };

  // This is the form to add a player to the database
  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
      <Typography variant="h5" gutterBottom>
        Add Player
      </Typography>
      <TextField
        label="Name"
        fullWidth
        margin="normal"
        value={playerName}
        onChange={(e) => setPlayerName(e.target.value)}
        required
      />
      <TextField
        label="Country"
        fullWidth
        margin="normal"
        value={playerCountry}
        onChange={(e) => setPlayerCountry(e.target.value)}
        required
      />
      <TextField
        label="Player Age"
        fullWidth
        margin="normal"
        type="number"
        value={playerAge}
        onChange={(e) => setPlayerAge(e.target.value === '' ? '' : Number(e.target.value))}
      />
      <TextField
        label="Position"
        fullWidth
        margin="normal"
        value={position}
        onChange={(e) => setPosition(e.target.value)}
        required
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
              .filter((trophy) => trophy.trophy_type === 'Individual') // Only show individual trophies
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
          disabled={selectedTrophy === ''} // Disable only if no trophy is selected
        />
      </Box>

      <Box sx={{ mt: 3 }}>
        <Typography variant="h6" gutterBottom>
          Assign Team (Optional)
        </Typography>
        <FormControl fullWidth sx={{ marginBottom: 2 }}>
          <InputLabel id="team-select-label">Select Team</InputLabel>
          <Select
            labelId="team-select-label"
            value={selectedTeam}
            onChange={(e) => setSelectedTeam(e.target.value === '' ? '' : Number(e.target.value))}
          >
            {teams.map((team) => (
              <MenuItem key={team.team_id} value={team.team_id}>
                {team.team_name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          label="Start Date"
          fullWidth
          margin="normal"
          type="date"
          InputLabelProps={{ shrink: true }}
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          disabled={selectedTeam === ''} // Disable only if no team is selected
        />
      </Box>

      <Button variant="contained" color="primary" type="submit" sx={{ mt: 2 }}>
        Add Player
      </Button>
    </Box>
  );
};

export default AddPlayerForm;
