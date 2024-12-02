import React, { useState, useEffect } from 'react';
import { getPlayers, getIndividualTrophies } from '../api';
import AddPlayerForm from './AddPlayerForm';
import UpdatePlayerForm from './UpdatePlayerForm';
import DeletePlayerForm from './DeletePlayerForm';
import { Player, Trophy } from '../api';
import {
  Container,
  Typography,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';

const SelectionView: React.FC = () => {
  const [players, setPlayers] = useState<Player[]>([]);
  const [trophies, setTrophies] = useState<Trophy[]>([]);
  const [selectedAction, setSelectedAction] = useState<string | null>(null);

  // Fetch players
  const fetchPlayers = async () => {
    try {
      const data = await getPlayers();
      setPlayers(data);
    } catch (error) {
      console.error('Error fetching players:', error);
    }
  };

  // Fetch individual trophies
  const fetchTrophies = async () => {
    try {
      const data = await getIndividualTrophies();
      setTrophies(data);
    } catch (error) {
      console.error('Error fetching trophies:', error);
    }
  };

  // Fetch both players and trophies on mount
  useEffect(() => {
    fetchPlayers();
    fetchTrophies();
  }, []);

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" gutterBottom textAlign="center" sx={{ marginTop: '20px' }}>
        Manage Players
      </Typography>

      <FormControl fullWidth sx={{ marginY: 2 }}>
        <InputLabel id="player-action-select-label">Choose an Action</InputLabel>
        <Select
          labelId="player-action-select-label"
          value={selectedAction || ''}
          onChange={(e) => setSelectedAction(e.target.value)}
        >
          <MenuItem value="add">Add Player</MenuItem>
          <MenuItem value="update">Update Player</MenuItem>
          <MenuItem value="delete">Delete Player</MenuItem>
        </Select>
      </FormControl>

      {/* Render the appropriate form based on the selected action */}
      <Box sx={{ marginTop: '20px' }}>
        {selectedAction === 'add' && <AddPlayerForm onPlayerChange={fetchPlayers} trophies={trophies} />}
        {selectedAction === 'update' && <UpdatePlayerForm onPlayerChange={fetchPlayers} trophies={trophies} />}
        {selectedAction === 'delete' && <DeletePlayerForm onPlayerChange={fetchPlayers} />}
      </Box>

      {/* Scrollable table to display players */}
      <Typography variant="h6" gutterBottom textAlign="center" sx={{ marginTop: '40px' }}>
        Player List
      </Typography>
      <TableContainer component={Paper} sx={{ maxHeight: 400, marginTop: '20px' }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Country</TableCell>
              <TableCell>Age</TableCell>
              <TableCell>Position</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {players.map((player) => (
              <TableRow key={player.player_id}>
                <TableCell>{player.player_id}</TableCell>
                <TableCell>{player.player_name}</TableCell>
                <TableCell>{player.player_country}</TableCell>
                <TableCell>{player.age}</TableCell>
                <TableCell>{player.position}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default SelectionView;
