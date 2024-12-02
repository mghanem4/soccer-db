import React from 'react';
import ScrollableTable from './ScrollableTable';
import { Player } from '../api';

interface PlayerListProps {
  players: Player[];
  onPlayerClick: (player: Player) => void; // Pass the player click handler
}

const PlayerList: React.FC<PlayerListProps> = ({ players, onPlayerClick }) => {
  const columns = [
    { id: 'player_id' as keyof Player, label: 'ID' },
    { id: 'player_name' as keyof Player, label: 'Name' },
    { id: 'player_country' as keyof Player, label: 'Country' },
    { id: 'age' as keyof Player, label: 'Age' },
    { id: 'position' as keyof Player, label: 'Position' },
  ];

  const filterBy = (player: Player, query: string) => {
    const nameMatches = player.player_name?.toLowerCase().includes(query) || false;
    const idMatches = player.player_id.toString().includes(query);
    return nameMatches || idMatches;
  };

  return (
    <ScrollableTable<Player>
      data={players}
      columns={columns}
      filterBy={filterBy}
      onRowClick={onPlayerClick} // Use the provided handler for row clicks
    />
  );
};

export default PlayerList;
