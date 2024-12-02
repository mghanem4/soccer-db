import React, { useState, useEffect } from 'react';
import { addLeague, getLeagueTrophies, addTrophy, Trophy } from '../api';
import { TextField, Button, Box, Typography, MenuItem, Select, FormControl, InputLabel } from '@mui/material';

interface AddLeagueFormProps {
  onLeagueChange: () => void;
}

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
        const data = await getLeagueTrophies();
        setTrophies(data);
      } catch (error) {
        console.error('Error fetching trophies:', error);
      }
    };

    fetchTrophies();
  }, []);

  const handleAddTrophy = async () => {
    if (!newTrophyName || !newTrophyType) {
      alert('Trophy name and type are required.');
      return;
    }

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!totalMatches || !totalTeams || !leagueName) {
      alert('Total matches, total teams, and league name are required.');
      return;
    }

    try {
      await addLeague({
        total_matches: totalMatches,
        total_teams: totalTeams,
        prize: prize === '' ? undefined : Number(prize),
        league_name: leagueName,
        league_trophy_id: selectedTrophy,
      });
      alert('League added successfully!');
      onLeagueChange();
    } catch (error) {
      console.error('Error adding league:', error);
      alert('Failed to add league.');
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>

      
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
