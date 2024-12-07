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
  InputLabel
} from '@mui/material';
// This is the LeagueSelectionView component that is used to manage leagues
const LeagueSelectionView: React.FC = () => {
  const [leagues, setLeagues] = useState<League[]>([]);
  const [trophies, setTrophies] = useState<Trophy[]>([]);
  const [selectedAction, setSelectedAction] = useState<string | null>(null);

  // Fetch leagues
  const fetchLeagues = async () => {
    try {
      // get the leagues from the api and wait for the response
      const data = await getLeagues();
      setLeagues(data);
    } catch (error) {
      console.error('Error fetching leagues:', error);
    }
  };

  // Fetch trophies
  const fetchTrophies = async () => {
    try {
      // get the trophies from the api and wait for the response
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
          {/* This is the select dropdown for the user to choose an action */}
          <MenuItem value="add">Add League</MenuItem>
          <MenuItem value="update">Update League</MenuItem>
          <MenuItem value="delete">Delete League</MenuItem>
        </Select>
      </FormControl>

      <LeagueList leagues={leagues} />

      {selectedAction === 'add' && <AddLeagueForm onLeagueChange={fetchLeagues} />}
      {selectedAction === 'update' && (
        <UpdateLeagueForm
        // get new changes to the leagues and trophies
          onLeagueChange={fetchLeagues}
          onTrophyChange={fetchTrophies} // Pass onTrophyChange
          trophies={trophies} // Pass trophies
        />
      )}
      {selectedAction === 'delete' && (
        <DeleteLeagueForm
          onLeagueChange={fetchLeagues}
        />
      )}
    </Container>
  );
};

export default LeagueSelectionView;
