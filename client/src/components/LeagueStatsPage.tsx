import React, { useState, useEffect } from 'react';
import { getLeagues, getTeamsByLeague } from '../api'; // Add these API functions
import { League, Team } from '../api'; // Import types
import ScrollableTable from './ScrollableTable'; // Reuse the table component
import { Box, Typography } from '@mui/material';

// This is the LeagueStatsPage component that displays league stats

const LeagueStatsPage: React.FC = () => {
  const [leagues, setLeagues] = useState<League[]>([]);
  const [selectedLeague, setSelectedLeague] = useState<League | null>(null);
  const [teams, setTeams] = useState<Team[]>([]);

  // Fetch leagues on component mount
  useEffect(() => {
    // get leagues from the api
    const fetchLeagues = async () => {
      try {
        const data = await getLeagues();
        setLeagues(data);
      } catch (error) {
        console.error('Error fetching leagues:', error);
      }
    };

    fetchLeagues();
  }, []);

  // Handle league row click, fetch teams for the selected league
  const handleRowClick = async (league: League) => {
    setSelectedLeague(league);

    try {
      // get the teams by league id
      const data = await getTeamsByLeague(league.league_id);
      setTeams(data);
    } catch (error) {
      console.error('Error fetching teams:', error);
      setTeams([]);
    }
  };

  const leagueColumns = [
    { id: 'league_id' as keyof League, label: 'League ID' },
    { id: 'league_name' as keyof League, label: 'Name' },
    { id: 'total_matches' as keyof League, label: 'Matches' },
    { id: 'total_teams' as keyof League, label: 'Teams' },
    { id: 'prize' as keyof League, label: 'Prize' },
    { id: 'league_trophy_id' as keyof League, label: 'League Trophy ID' },
  ];

  const teamColumns = [
    { id: 'team_id' as keyof Team, label: 'Team ID' },
    { id: 'team_name' as keyof Team, label: 'Name' },
    { id: 'team_wins' as keyof Team, label: 'Wins' },
    { id: 'team_draws' as keyof Team, label: 'Draws' },
    { id: 'team_loses' as keyof Team, label: 'Losses' },
    { id: 'titles_won' as keyof Team, label: 'Titles Won' },
  ];
// filter the league by the league name or league id
  const filterByLeague = (league: League, query: string) => {
    const nameMatches = league.league_name?.toLowerCase().includes(query) || false;
    const idMatches = league.league_id.toString().includes(query);
    return nameMatches || idMatches;
  };
// filter the team by the team name or team id
  const filterByTeam = (team: Team, query: string) => {
    const nameMatches = team.team_name?.toLowerCase().includes(query) || false;
    const idMatches = team.team_id.toString().includes(query);
    return nameMatches || idMatches;
  };
// return the table with the league stats
  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        League Stats
      </Typography>

      {/* League Table */}
      <ScrollableTable<League>
        data={leagues}
        columns={leagueColumns}
        filterBy={filterByLeague}
        onRowClick={handleRowClick}
      />

      {selectedLeague && (
        <Box mt={4}>
          <Typography variant="h6">
            Teams in {selectedLeague.league_name}
          </Typography>
          <ScrollableTable<Team>
            data={teams}
            columns={teamColumns}
            filterBy={filterByTeam}
          />
        </Box>
      )}
    </Box>
  );
};

export default LeagueStatsPage;
