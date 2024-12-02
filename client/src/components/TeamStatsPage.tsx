import React, { useState, useEffect } from 'react';
import { getTeams, getPlayersByTeam, getPlayerStats } from '../api';
import { Team, Player } from '../api';
import ScrollableTable from './ScrollableTable';
import PlayerStats from './PlayerStats';
import { Box, Typography } from '@mui/material';

const TeamStatsPage: React.FC = () => {
  const [teams, setTeams] = useState<Team[]>([]);
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null);
  const [players, setPlayers] = useState<Player[]>([]);
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);
  const [playerStats, setPlayerStats] = useState<any | null>(null);

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const data = await getTeams();
        setTeams(data);
      } catch (error) {
        console.error('Error fetching teams:', error);
      }
    };

    fetchTeams();
  }, []);

  const handleTeamClick = async (team: Team) => {
    setSelectedTeam(team);
    setSelectedPlayer(null);

    try {
      const data = await getPlayersByTeam(team.team_id);
      setPlayers(data);
    } catch (error) {
      console.error('Error fetching players:', error);
      setPlayers([]);
    }
  };

  const handlePlayerClick = async (player: Player) => {
    setSelectedPlayer(player);

    try {
      const data = await getPlayerStats(player.player_id);
      if (data.length === 0) {
        alert('No stats available for this player.');
      } else {
        setPlayerStats(data);
      }
    } catch (error) {
      console.error('Error fetching player stats:', error);
      setPlayerStats(null);
    }
  };

  const teamColumns = [
    { id: 'team_id' as keyof Team, label: 'Team ID' },
    { id: 'team_name' as keyof Team, label: 'Name' },
    { id: 'team_wins' as keyof Team, label: 'Wins' },
    { id: 'team_draws' as keyof Team, label: 'Draws' },
    { id: 'team_loses' as keyof Team, label: 'Losses' },
  ];

  const playerColumns = [
    { id: 'player_id' as keyof Player, label: 'Player ID' },
    { id: 'player_name' as keyof Player, label: 'Name' },
    { id: 'player_country' as keyof Player, label: 'Country' },
    { id: 'age' as keyof Player, label: 'Age' },
    { id: 'position' as keyof Player, label: 'Position' },
    { id: 'player_team_goals' as keyof Player, label: 'Goals' },
  ];

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        Team Stats
      </Typography>

      <ScrollableTable<Team>
        data={teams}
        columns={teamColumns}
        filterBy={(team, query) =>
          team.team_name?.toLowerCase().includes(query.toLowerCase()) ||
          team.team_id.toString().includes(query)
        }
        onRowClick={handleTeamClick}
      />

      {selectedTeam && (
        <Box mt={4}>
          <Typography variant="h6">
            Players in {selectedTeam.team_name}
          </Typography>
          <ScrollableTable<Player>
            data={players}
            columns={playerColumns}
            filterBy={(player, query) =>
              player.player_name?.toLowerCase().includes(query.toLowerCase()) ||
              player.player_id.toString().includes(query)
            }
            onRowClick={handlePlayerClick}
          />
        </Box>
      )}

      {selectedPlayer && playerStats && (
        <Box mt={4}>
          <Typography variant="h6">
            Stats for {selectedPlayer.player_name}
          </Typography>
          <PlayerStats stats={playerStats} />
        </Box>
      )}
    </Box>
  );
};

export default TeamStatsPage;
