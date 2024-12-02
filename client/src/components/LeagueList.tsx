import React from 'react';
import ScrollableTable from './ScrollableTable';
import { League } from '../api';

interface LeagueListProps {
  leagues: League[];
}

const LeagueList: React.FC<LeagueListProps> = ({ leagues }) => {
  const columns = [
    { id: 'league_id' as keyof League, label: 'ID' },
    { id: 'league_name' as keyof League, label: 'Name' },
    { id: 'total_matches' as keyof League, label: 'Total Matches' },
    { id: 'total_teams' as keyof League, label: 'Total Teams' },
    { id: 'prize' as keyof League, label: 'Prize' },
    { id: 'league_trophy_id' as keyof League, label: 'League Trophy ID' },
  ];

  const filterBy = (league: League, query: string) => {
    return (
      league.league_name.toLowerCase().includes(query) ||
      league.league_id.toString().includes(query)
    );
  };

  return (
    <ScrollableTable<League>
      data={leagues}
      columns={columns}
      filterBy={filterBy}
    />
  );
};

export default LeagueList;
