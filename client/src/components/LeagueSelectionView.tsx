import React, { useState, useEffect } from 'react';
import { getLeagues, League } from '../api';
import AddLeagueForm from './AddLeagueForm';
import UpdateLeagueForm from './UpdateLeagueForm';
import DeleteLeagueForm from './DeleteLeagueForm';
import { Container, Typography, MenuItem, Select, FormControl, InputLabel, Box } from '@mui/material';

const LeagueSelectionView: React.FC = () => {
  const [leagues, setLeagues] = useState<League[]>([]); // Shared state for leagues
  const [selectedAction, setSelectedAction] = useState<string | null>(null);

  // Fetch leagues from the database
  const fetchLeagues = async () => {
    try {
      const data = await getLeagues();
      setLeagues(data);
    } catch (error) {
      console.error('Error fetching leagues:', error);
    }
  };

  useEffect(() => {
    fetchLeagues(); // Fetch leagues on component mount
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

      {/* Display the list of leagues */}
      <Box sx={{ marginBottom: 2 }}>
        <Typography variant="h5" gutterBottom>
          Current Leagues
        </Typography>
        {leagues.map((league) => (
          <Typography key={league.league_id}>
            {league.league_id}. {league.league_name} - Matches: {league.total_matches}, Teams: {league.total_teams}, Prize: ${league.prize}
          </Typography>
        ))}
      </Box>

      {/* Render the appropriate form based on the selected action */}
      {selectedAction === 'add' && <AddLeagueForm onLeagueChange={fetchLeagues} />}
      {selectedAction === 'update' && <UpdateLeagueForm onLeagueChange={fetchLeagues} />}
      {selectedAction === 'delete' && <DeleteLeagueForm onLeagueChange={fetchLeagues} />}
    </Container>
  );
};

export default LeagueSelectionView;
