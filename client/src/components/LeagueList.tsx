import React from 'react';
import { League } from '../api';
import { Card, CardContent, Typography, Grid } from '@mui/material';

interface LeagueListProps {
  leagues: League[];
}

const LeagueList: React.FC<LeagueListProps> = ({ leagues }) => {
  return (
    <div>
      <Typography variant="h5" gutterBottom>
        Current Leagues
      </Typography>
      <Grid container spacing={2}>
        {leagues.map((league) => (
          <Grid item xs={12} sm={6} md={4} key={league.league_id}>
            <Card variant="outlined">
              <CardContent>
                <Typography variant="h6" component="div">
                  {league.league_name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  League ID: {league.league_id}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Total Matches: {league.total_matches}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Total Teams: {league.total_teams}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Prize: ${league.prize.toFixed(2)}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default LeagueList;
