import React from 'react';

interface Player {
  id: number;
  name: string;
  team: string;
}

const players: Player[] = [
  { id: 1, name: "Lionel Messi", team: "Inter Miami" },
  { id: 2, name: "Cristiano Ronaldo", team: "Al-Nassr" },
];

const PlayerList: React.FC = () => {
  return (
    <div>
      <h1>Player List</h1>
      <ul>
        {players.map((player) => (
          <li key={player.id}>
            {player.name} - {player.team}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PlayerList;
