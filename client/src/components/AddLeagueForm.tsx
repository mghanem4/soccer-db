import React, { useState, useEffect } from 'react';
import { addLeague, getLeagueTrophies, addTrophy, Trophy } from '../api';
import { TextField, Button, Box, Typography, MenuItem, Select, FormControl, InputLabel } from '@mui/material';

{/* This is the interface for the AddLeagueFormProps
  It takes in the following props:
  - leagueName: the name of the league
  - trophies: an array of trophies
  This interface is used to define the props for the AddLeagueForm component
  This page is a form that takes a league and a trophy to add to the database.
  Note: If a users wants to add a trophy to attach to the league, they can do so by clicking the add trophy button. 
  The league id is a required field, and the user must select a trophy to attach to the league. Since a league must have a trophy attached to it. (teams won't play for free lol)
  The user can also add a new trophy to the database by clicking the add trophy button.
  */}


interface AddLeagueFormProps {
  onLeagueChange: () => void;
}
// state variables for the form fields to add a league
// This uses react hooks to manage the state of the form fields for adding a league and
// to add a level of restriction to the form fields, i.e you can only enter a number if the field is initalized to 0 or uses number as a type
const AddLeagueForm: React.FC<AddLeagueFormProps> = ({ onLeagueChange }) => {
  const [totalMatches, setTotalMatches] = useState(0);
  const [totalTeams, setTotalTeams] = useState(0);
  const [prize, setPrize] = useState<number | ''>('');
  const [leagueName, setLeagueName] = useState('');
  const [trophies, setTrophies] = useState<Trophy[]>([]);
  const [selectedTrophy, setSelectedTrophy] = useState<number | null>(null);
  const [newTrophyName, setNewTrophyName] = useState('');
  const [newTrophyType, setNewTrophyType] = useState<'League' | 'Cup'>('League');

  // Fetch trophies on component mount
  useEffect(() => {
    const fetchTrophies = async () => {
      try {
        // get the league trophies from the api and wait for the response, this sets the data to show to user.
        const data = await getLeagueTrophies();
        // set the trophies to the data received from the api
        setTrophies(data);
      } catch (error) {
        // if there is an error, log the error to the console
        console.error('Error fetching trophies:', error);
      }
    };
    // call the fetchTrophies function
    fetchTrophies();
  }, []);

  {/* This function is called when the user clicks the add trophy button, it adds a new trophy to the database */}
  const handleAddTrophy = async () => {
    if (!newTrophyName || !newTrophyType) {
      // alert that the trophy name and type are required
      alert('Trophy name and type are required.');
      return;
    }

    {/* This is a try catch block that tries to add a trophy to the database, if it fails, it logs the error to the console and alerts the user that the trophy was not added */}
    try {
      await addTrophy({ trophy_name: newTrophyName, trophy_type: newTrophyType });
      alert('Trophy added successfully!');
      setNewTrophyName('');
      setNewTrophyType('League');
      const data = await getLeagueTrophies(); // Refresh trophies
      setTrophies(data);
    } catch (error) {
      console.error('Error adding trophy:', error);
      alert('Failed to add trophy.');
    }
  };


  {/* This function is called when the user submits the form, it adds a new league to the database */}
  const handleSubmit = async (e: React.FormEvent) => {
    // prevent the default form submission, makes user stay on the page after submitting the form and not refresh the page. 
    e.preventDefault();
// if the total matches, total teams, league name, or selected trophy is null, alert the user that these fields are required.
    if (!totalMatches || !totalTeams || !leagueName || selectedTrophy === null) {
      alert('Total matches, total teams, and league name are required.');
      return;
    }
    try {
      // call the addLeague function to add a new league to the database
      await addLeague({
        // check each field to see if it is null, if it is, set it to undefined, otherwise set it to the value of the field
        total_matches: totalMatches,
        total_teams: totalTeams,
        prize: prize === '' ? undefined : Number(prize),
        league_name: leagueName,
        league_trophy_id: selectedTrophy,
      });
      // alert the user that the league was added successfully
      alert('League added successfully!');
      // on league change, call the onLeagueChange function to update the leagues list
      onLeagueChange();
      // throw error if the league is not added successfully, that could be a db issue
    } catch (error) {
      console.error('Error adding league:', error);
      alert('Failed to add league.');
    }
  };
// submit the form when the user clicks the add league button
  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
{/* form design */}
<Typography variant="h6" gutterBottom>
        Add New Trophy
      </Typography>
      <TextField
        label="Trophy Name"
        fullWidth
        margin="normal"
        value={newTrophyName}
        onChange={(e) => setNewTrophyName(e.target.value)}
      />
      <FormControl fullWidth margin="normal">
        <InputLabel>Trophy Type</InputLabel>
        <Select
          value={newTrophyType}
          onChange={(e) => setNewTrophyType(e.target.value as 'League' | 'Cup')}
        >
          <MenuItem value="League">League</MenuItem>
          <MenuItem value="Cup">Cup</MenuItem>
        </Select>
      </FormControl>
      <Button variant="outlined" color="secondary" onClick={handleAddTrophy} sx={{ mt: 2 }}>
        Add Trophy
      </Button>

      <Typography variant="h5" gutterBottom>
        Add League
      </Typography>

      

      <TextField
        label="League Name"
        fullWidth
        margin="normal"
        value={leagueName}
        onChange={(e) => setLeagueName(e.target.value)}
        required
      />
      <TextField
        label="Total Matches"
        fullWidth
        margin="normal"
        type="number"
        value={totalMatches}
        onChange={(e) => setTotalMatches(Number(e.target.value))}
        required
      />
      <TextField
        label="Total Teams"
        fullWidth
        margin="normal"
        type="number"
        value={totalTeams}
        onChange={(e) => setTotalTeams(Number(e.target.value))}
        required
      />
      <TextField
        label="Prize"
        fullWidth
        margin="normal"
        type="number"
        value={prize}
        onChange={(e) => setPrize(Number(e.target.value))}
      />

      <FormControl fullWidth margin="normal">
        <InputLabel>Trophy</InputLabel>
        <Select
          value={selectedTrophy || ''}
          onChange={(e) => setSelectedTrophy(Number(e.target.value))}
        >
          <MenuItem value="">None</MenuItem>
          {trophies.map((trophy) => (
            <MenuItem key={trophy.trophy_id} value={trophy.trophy_id}>
              {trophy.trophy_name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Button variant="contained" color="primary" type="submit" sx={{ mt: 2 }}>
        Add League
      </Button>

    </Box>
  );
};

export default AddLeagueForm;
