import React, { useState, useEffect } from 'react';
import { getTeams, getTrophies, Team, Trophy } from '../api'; // Ensure you have getTrophies imported
import AddTeamForm from './AddTeamForm';
import UpdateTeamForm from './UpdateTeamForm';
import DeleteTeamForm from './DeleteTeamForm';
import TeamList from './TeamList';
import { Container, Typography, MenuItem, Select, FormControl, InputLabel } from '@mui/material';

const TeamSelectionView: React.FC = () => {
  const [teams, setTeams] = useState<Team[]>([]); // Shared state for teams
  const [trophies, setTrophies] = useState<Trophy[]>([]); // Shared state for trophies
  const [selectedAction, setSelectedAction] = useState<string | null>(null);

  // Fetch teams from the database
  const fetchTeams = async () => {
    try {
      // Call the getTeams api function and wait for the response
      const data = await getTeams();
      setTeams(data);
    } catch (error) {
      console.error('Error fetching teams:', error);
    }
  };

  // Fetch trophies from the database
  const fetchTrophies = async () => {
    try {
      // Call the getTrophies api function and wait for the response
      const data = await getTrophies();
      setTrophies(data.filter((trophy) => trophy.trophy_type !== 'Individual')); // Exclude individual trophies
    } catch (error) {
      console.error('Error fetching trophies:', error);
    }
  };

  useEffect(() => {
    fetchTeams(); // Fetch teams on component mount
    fetchTrophies(); // Fetch trophies on component mount
  }, []);
// This is the TeamSelectionView component that is used to manage teams
  return (
    <Container maxWidth="md">
      <Typography variant="h4" gutterBottom textAlign="center" sx={{ marginTop: '20px' }}>
        Manage Teams
      </Typography>

      <FormControl fullWidth sx={{ marginY: 2 }}>
        <InputLabel id="team-action-select-label">Choose an Action</InputLabel>
        <Select
          labelId="team-action-select-label"
          value={selectedAction || ''}
          onChange={(e) => setSelectedAction(e.target.value)}
        >
          <MenuItem value="add">Add Team</MenuItem>
          <MenuItem value="update">Update Team</MenuItem>
          <MenuItem value="delete">Delete Team</MenuItem>
        </Select>
      </FormControl>

      <TeamList teams={teams} />

      {selectedAction === 'add' && <AddTeamForm onTeamChange={fetchTeams} trophies={trophies} />}
      {selectedAction === 'update' && <UpdateTeamForm onTeamChange={fetchTeams} trophies={trophies} />}
      {selectedAction === 'delete' && <DeleteTeamForm onTeamChange={fetchTeams} />}
    </Container>
  );
};

export default TeamSelectionView;
