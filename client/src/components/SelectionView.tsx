import React, { useState, useEffect } from 'react';
import PlayerList from './PlayerList';
import AddPlayerForm from './AddPlayerForm';
import UpdatePlayerForm from './UpdatePlayerForm';
import DeletePlayerForm from './DeletePlayerForm';
import { getPlayers, Player } from '../api';

const SelectionView: React.FC = () => {
  const [players, setPlayers] = useState<Player[]>([]); // Shared state for players
  const [selectedAction, setSelectedAction] = useState<string | null>(null);

  // Fetch players from the database
  const fetchPlayers = async () => {
    try {
      const data = await getPlayers();
      setPlayers(data);
    } catch (error) {
      console.error('Error fetching players:', error);
    }
  };

  useEffect(() => {
    fetchPlayers(); // Fetch players on component mount
  }, []);

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', padding: '20px' }}>
      <h1>Soccer Player Manager</h1>

      {/* Dropdown menu for action selection */}
      <div style={{ marginBottom: '20px' }}>
        <label htmlFor="action-select" style={{ fontWeight: 'bold', marginRight: '10px' }}>
          Select Action:
        </label>
        <select
          id="action-select"
          value={selectedAction || ''}
          onChange={(e) => setSelectedAction(e.target.value)}
          style={{
            padding: '10px',
            fontSize: '16px',
            borderRadius: '5px',
            border: '1px solid #ccc',
          }}
        >
          <option value="" disabled>
            -- Select an Action --
          </option>
          <option value="add">Add Player</option>
          <option value="update">Update Player</option>
          <option value="delete">Delete Player</option>
        </select>
      </div>

      {/* Show the current list of players */}
      <PlayerList players={players} />

      {/* Show forms based on the selected action */}
      <div style={{ marginTop: '20px' }}>
        {selectedAction === 'add' && <AddPlayerForm onPlayerChange={fetchPlayers} />}
        {selectedAction === 'update' && <UpdatePlayerForm onPlayerChange={fetchPlayers} />}
        {selectedAction === 'delete' && <DeletePlayerForm onPlayerChange={fetchPlayers} />}
      </div>
    </div>
  );
};

export default SelectionView;
