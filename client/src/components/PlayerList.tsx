import React, { useState } from 'react';
import ScrollableTable from './ScrollableTable';
import { Player } from '../api';
import PlayerStats from './PlayerStats'; // Component to display the bar graph
import { getPlayerById } from '../api'; // API call to fetch player stats

interface PlayerListProps {
  players: Player[];
}

const PlayerList: React.FC<PlayerListProps> = ({ players }) => {
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);
  const [playerStats, setPlayerStats] = useState<any | null>(null); // Stats for the selected player

  const columns = [
    { id: 'player_id' as keyof Player, label: 'ID' },
    { id: 'player_name' as keyof Player, label: 'Name' },
    { id: 'player_country' as keyof Player, label: 'Country' },
    { id: 'age' as keyof Player, label: 'Age' },
    { id: 'contract' as keyof Player, label: 'Contract' },
    { id: 'position' as keyof Player, label: 'Position' },
  ];

  const handleRowClick = async (player: Player) => {
    setSelectedPlayer(player);

    try {
      const data = await getPlayerById(player.player_id);
      setPlayerStats(data.attributes); // Extract stats from the API response
    } catch (error) {
      console.error('Error fetching player stats:', error);
      setPlayerStats(null);
    }
  };

  const filterBy = (player: Player, query: string) => {
    const nameMatches = player.player_name?.toLowerCase().includes(query) || false;
    const idMatches = player.player_id.toString().includes(query);
    return nameMatches || idMatches;
  };

  return (
    <div>
      <ScrollableTable<Player>
        data={players}
        columns={columns}
        filterBy={filterBy}
        // onRowClick={handleRowClick} // Pass row click handler
      />
      {selectedPlayer && playerStats && (
        <div>
          <h3>Stats for {selectedPlayer.player_name}</h3>
          <PlayerStats stats={playerStats} />
        </div>
      )}
    </div>
  );
};

export default PlayerList;
