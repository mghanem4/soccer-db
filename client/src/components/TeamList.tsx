import React from 'react';
import ScrollableTable from './ScrollableTable';
import { Team } from '../api';

interface TeamListProps {
  teams: Team[];
}
// This is the TeamList component that displays a list of teams in a table

const TeamList: React.FC<TeamListProps> = ({ teams }) => {
  const columns = [
    { id: 'team_id' as keyof Team, label: 'ID' },
    { id: 'team_name' as keyof Team, label: 'Name' },
    { id: 'team_wins' as keyof Team, label: 'Wins' },
    { id: 'team_draws' as keyof Team, label: 'Draws' },
    { id: 'team_loses' as keyof Team, label: 'Losses' },
    { id: 'goals_scored' as keyof Team, label: 'Goals Scored' },
  ];
// Filter the team by the team name or team id
  const filterBy = (team: Team, query: string) => {
    const nameMatches = team.team_name?.toLowerCase().includes(query) || false;
    const idMatches = team.team_id.toString().includes(query);
    return nameMatches || idMatches;
  };
// return the scrollable table with the teams data, columns, and filterBy function
  return (
    <ScrollableTable<Team>
      data={teams}
      columns={columns}
      filterBy={filterBy}
    />
  );
};

export default TeamList;
