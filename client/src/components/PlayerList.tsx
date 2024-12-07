import React from 'react';
import ScrollableTable from './ScrollableTable';
import { Player } from '../api';

// This is the interface for the PlayerListProps
{/*
  It takes in the following props:
  - players: An array of Player objects
  - onPlayerClick: A function that takes in a Player object and returns void
  */}

interface PlayerListProps {
  players: Player[];
  onPlayerClick: (player: Player) => void; // Pass the player click handler
}

// This is the PlayerList component that displays a list of players in a table
// It takes in the PlayerListProps interface as its props
const PlayerList: React.FC<PlayerListProps> = ({ players, onPlayerClick }) => {
  const columns = [
    { id: 'player_id' as keyof Player, label: 'ID' },
    { id: 'player_name' as keyof Player, label: 'Name' },
    { id: 'player_country' as keyof Player, label: 'Country' },
    { id: 'age' as keyof Player, label: 'Age' },
    { id: 'position' as keyof Player, label: 'Position' },
  ];

  // Filter the player by the player name or player id
  const filterBy = (player: Player, query: string) => {
    const nameMatches = player.player_name?.toLowerCase().includes(query) || false;
    const idMatches = player.player_id.toString().includes(query);
    return nameMatches || idMatches;
  };
// return the scrollable table with the players data, columns, and filterBy function
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
