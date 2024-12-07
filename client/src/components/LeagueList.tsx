import React from 'react';
import ScrollableTable from './ScrollableTable';
import { League } from '../api';

// This is the interface for the LeagueListProps
// It takes in the following props:
// - leagues: An array of League objects

interface LeagueListProps {
  leagues: League[];
}

// This is the LeagueList component that displays a list of leagues in a table
const LeagueList: React.FC<LeagueListProps> = ({ leagues }) => {
  const columns = [
    { id: 'league_id' as keyof League, label: 'ID' },
    { id: 'league_name' as keyof League, label: 'Name' },
    { id: 'total_matches' as keyof League, label: 'Total Matches' },
    { id: 'total_teams' as keyof League, label: 'Total Teams' },
    { id: 'prize' as keyof League, label: 'Prize' },
    { id: 'league_trophy_id' as keyof League, label: 'League Trophy ID' },
  ];
// filter the league by the league name or league id
  const filterBy = (league: League, query: string) => {
    return (
      league.league_name.toLowerCase().includes(query) ||
      league.league_id.toString().includes(query)
    );
  };
// return the scrollable table with the leagues data, columns, and filterBy function
  return (
    <ScrollableTable<League>
      data={leagues}
      columns={columns}
      filterBy={filterBy}
    />
  );
};

export default LeagueList;
