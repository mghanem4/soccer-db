import React, { useState } from 'react';
import { updateLeague, Trophy } from '../api';

import {
  TextField,
  Button,
  Box,
  Typography,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from '@mui/material';

interface UpdateLeagueFormProps {
  onLeagueChange: () => void;
  onTrophyChange: () => void;
  trophies: Trophy[];
}

const UpdateLeagueForm: React.FC<UpdateLeagueFormProps> = ({
  onLeagueChange,
  onTrophyChange,
  trophies,
}) => {
  const [leagueId, setLeagueId] = useState<number | ''>('');
  const [totalMatches, setTotalMatches] = useState<number | ''>('');
  const [totalTeams, setTotalTeams] = useState<number | ''>('');
  const [prize, setPrize] = useState<number | ''>('');
  const [leagueName, setLeagueName] = useState('');
  const [leagueTrophyId, setLeagueTrophyId] = useState<number | ''>('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (leagueId === '') {
      alert('League ID is required.');
      return;
    }

    try {
      await updateLeague(leagueId, {
        total_matches: totalMatches === '' ? undefined : totalMatches,
        total_teams: totalTeams === '' ? undefined : totalTeams,
        prize: prize === '' ? undefined : prize,
        league_name: leagueName || undefined,
        league_trophy_id: leagueTrophyId === '' ? undefined : leagueTrophyId,
      });
      alert('League updated successfully!');
      onLeagueChange();
      onTrophyChange(); // Refresh trophies if needed
    } catch (error) {
      console.error('Error updating league:', error);
      alert('Failed to update league.');
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
      <Typography variant="h5" gutterBottom>
        Update League
      </Typography>
      <TextField
        label="League ID"
        fullWidth
        margin="normal"
        type="number"
        value={leagueId}
        onChange={(e) => setLeagueId(e.target.value === '' ? '' : Number(e.target.value))}
        required
      />
      <TextField
        label="Total Matches"
        fullWidth
        margin="normal"
        type="number"
        value={totalMatches}
        onChange={(e) => setTotalMatches(e.target.value === '' ? '' : Number(e.target.value))}
      />
      <TextField
        label="Total Teams"
        fullWidth
        margin="normal"
        type="number"
        value={totalTeams}
        onChange={(e) => setTotalTeams(e.target.value === '' ? '' : Number(e.target.value))}
      />
      <TextField
        label="Prize"
        fullWidth
        margin="normal"
        type="number"
        value={prize}
        onChange={(e) => setPrize(e.target.value === '' ? '' : Number(e.target.value))}
      />
      <TextField
        label="League Name"
        fullWidth
        margin="normal"
        value={leagueName}
        onChange={(e) => setLeagueName(e.target.value)}
      />
      <FormControl fullWidth margin="normal">
        <InputLabel id="trophy-select-label">Trophy</InputLabel>
        <Select
          labelId="trophy-select-label"
          value={leagueTrophyId}
          onChange={(e) => setLeagueTrophyId(Number(e.target.value))}
        >
          <MenuItem value="">None</MenuItem>
          {trophies.map((trophy) => (
            <MenuItem key={trophy.trophy_id} value={trophy.trophy_id}>
              {trophy.trophy_name} ({trophy.trophy_type})
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Button variant="contained" color="primary" type="submit" sx={{ mt: 2 }}>
        Update League
      </Button>
    </Box>
  );
};

export default UpdateLeagueForm;
