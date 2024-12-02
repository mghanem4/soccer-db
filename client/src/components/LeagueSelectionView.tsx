import React, { useState, useEffect } from 'react';
import AddLeagueForm from './AddLeagueForm';
import UpdateLeagueForm from './UpdateLeagueForm';
import DeleteLeagueForm from './DeleteLeagueForm';
import LeagueList from './LeagueList';
import { getLeagues, getTrophies, League, Trophy } from '../api';
import {
  Container,
  Typography,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Box,
} from '@mui/material';

const LeagueSelectionView: React.FC = () => {
  const [leagues, setLeagues] = useState<League[]>([]);
  const [trophies, setTrophies] = useState<Trophy[]>([]);
  const [selectedAction, setSelectedAction] = useState<string | null>(null);

  // Fetch leagues
  const fetchLeagues = async () => {
    try {
      const data = await getLeagues();
      setLeagues(data);
    } catch (error) {
      console.error('Error fetching leagues:', error);
    }
  };

  // Fetch trophies
  const fetchTrophies = async () => {
    try {
      const data = await getTrophies();
      setTrophies(data);
    } catch (error) {
      console.error('Error fetching trophies:', error);
    }
  };

  useEffect(() => {
    fetchLeagues();
    fetchTrophies();
  }, []);

  return (
    <Container maxWidth="md">
      <Typography variant="h4" gutterBottom textAlign="center" sx={{ marginTop: '20px' }}>
        Manage Leagues
      </Typography>

      <FormControl fullWidth sx={{ marginY: 2 }}>
        <InputLabel id="action-select-label">Choose an Action</InputLabel>
        <Select
          labelId="action-select-label"
          value={selectedAction || ''}
          onChange={(e) => setSelectedAction(e.target.value)}
        >
          <MenuItem value="add">Add League</MenuItem>
          <MenuItem value="update">Update League</MenuItem>
          <MenuItem value="delete">Delete League</MenuItem>
        </Select>
      </FormControl>

      <LeagueList leagues={leagues} />

      {selectedAction === 'add' && <AddLeagueForm onLeagueChange={fetchLeagues} />}
      {selectedAction === 'update' && (
        <UpdateLeagueForm
          onLeagueChange={fetchLeagues}
          onTrophyChange={fetchTrophies} // Pass onTrophyChange
          trophies={trophies} // Pass trophies
        />
      )}
      {selectedAction === 'delete' && (
        <DeleteLeagueForm
          onLeagueChange={fetchLeagues}
          onTrophyChange={fetchTrophies} // Pass onTrophyChange
        />
      )}
    </Container>
  );
};

export default LeagueSelectionView;
