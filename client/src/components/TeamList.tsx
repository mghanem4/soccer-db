import React from 'react';
import { Team } from '../api';
import { Card, CardContent, Typography, Grid } from '@mui/material';

interface PlayerListProps {
  teams: Team[];
}

const PlayerList: React.FC<PlayerListProps> = ({ teams }) => {
  return (
    <div>
      <Typography variant="h5" gutterBottom>
        Current Teams
      </Typography>
      <Grid container spacing={2}>
        {teams.map((teams) => (
          <Grid item xs={12} sm={6} md={4} key={teams.team_id}>
            <Card variant="outlined">
              <CardContent>
                <Typography variant="h6" component="div">
                  {teams.team_name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Team ID: {teams.team_id}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Team wins: {teams.team_wins}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Team losses: {teams.team_loses}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Team Draws: {teams.team_draws}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Team Trophies: {teams.team_trophies}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Team total goals: {teams.goals_scored}
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
