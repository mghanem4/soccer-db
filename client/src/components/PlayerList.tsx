import React from 'react';
import { Player } from '../api';
import { Card, CardContent, Typography, Grid } from '@mui/material';

interface PlayerListProps {
  players: Player[];
}

const PlayerList: React.FC<PlayerListProps> = ({ players }) => {
  return (
    <div>
      <Typography variant="h5" gutterBottom>
        Current Players
      </Typography>
      <Grid container spacing={2}>
        {players.map((player) => (
          <Grid item xs={12} sm={6} md={4} key={player.player_id}>
            <Card variant="outlined">
              <CardContent>
                <Typography variant="h6" component="div">
                  {player.player_name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  ID: {player.player_id}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Position: {player.position}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Country: {player.player_country}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default PlayerList;
