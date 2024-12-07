import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
} from '@mui/material';

// Define the PlayerStatsProps interface 
/* each stats is determined by season, later on the code will show that 
(I apolgize for the amount of variables, it will help me later on in a future project)  */
interface PlayerStatsProps {
  stats: {
    season_year: number;
    defending: number;
    preferred_foot: string;
    attacking_work_rate: string;
    defensive_work_rate: string;
    passing: number;
    dribbling: number;
    pace: number;
    shooting: number;
    physicality: number;
  }[];
}

const PlayerStats: React.FC<PlayerStatsProps> = ({ stats }) => {
  // create the stat labels
  const statLabels = [
    'Defending',
    'Preferred Foot',
    'Attacking Work Rate',
    'Defensive Work Rate',
    'Passing',
    'Dribbling',
    'Pace',
    'Shooting',
    'Physicality',
  ];

  // Map the stat keys for dynamic access
  const statKeys: (keyof typeof stats[0])[] = [
    'defending',
    'preferred_foot',
    'attacking_work_rate',
    'defensive_work_rate',
    'passing',
    'dribbling',
    'pace',
    'shooting',
    'physicality'
  ];

  // return the table with the player stats

  return (
    <div>
      <Typography variant="h5" gutterBottom>
        Player Stats
      </Typography>
      <TableContainer component={Paper} sx={{ maxHeight: 400 }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>Stat</TableCell>
              {stats.map((stat) => (
                <TableCell key={stat.season_year}>Season {stat.season_year}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {statLabels.map((label, index) => (
              <TableRow key={label}>
                <TableCell>{label}</TableCell>
                {stats.map((stat) => (
                  <TableCell key={`${stat.season_year}-${label}`}>
                    {stat[statKeys[index]] !== undefined ? stat[statKeys[index]] : 'N/A'}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default PlayerStats;
