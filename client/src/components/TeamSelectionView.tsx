import React, { useState, useEffect } from 'react';
import { getTeams, Team } from '../api';
import AddTeamForm from './AddTeamForm';
import UpdateTeamForm from './UpdateTeamForm';
import DeleteTeamForm from './DeleteTeamForm';
import TeamList from './TeamList';
import { Container, Typography, MenuItem, Select, FormControl, InputLabel, Box } from '@mui/material';

const TeamSelectionView: React.FC = () => {
  const [teams, setTeams] = useState<Team[]>([]); // Shared state for teams
  const [selectedAction, setSelectedAction] = useState<string | null>(null);

  // Fetch teams from the database
  const fetchTeams = async () => {
    try {
      const data = await getTeams();
      setTeams(data);
    } catch (error) {
      console.error('Error fetching teams:', error);
    }
  };

  useEffect(() => {
    fetchTeams(); // Fetch teams on component mount
  }, []);

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

      {selectedAction === 'add' && <AddTeamForm onTeamChange={fetchTeams} />}
      {selectedAction === 'update' && <UpdateTeamForm onTeamChange={fetchTeams} />}
      {selectedAction === 'delete' && <DeleteTeamForm onTeamChange={fetchTeams} />}
    </Container>
  );
};

export default TeamSelectionView;
