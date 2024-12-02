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

interface PlayerStatsProps {
  stats: {
    season_year: number;
    penalties: number;
    positioning: number;
    interceptions: number;
    sliding_tackle: number;
    preferred_foot: string;
    attacking_work_rate: string;
    defensive_work_rate: string;
    heading_accuracy: number;
    short_passing: number;
    dribbling: number;
    long_passing: number;
    ball_control: number;
    acceleration: number;
    sprint_speed: number;
    shot_power: number;
    long_shots: number;
  }[];
}

const PlayerStats: React.FC<PlayerStatsProps> = ({ stats }) => {
  // Extract the stat labels
  const statLabels = [
    'Penalties',
    'Positioning',
    'Interceptions',
    'Sliding Tackle',
    'Preferred Foot',
    'Attacking Work Rate',
    'Defensive Work Rate',
    'Heading Accuracy',
    'Short Passing',
    'Dribbling',
    'Long Passing',
    'Ball Control',
    'Acceleration',
    'Sprint Speed',
    'Shot Power',
    'Long Shots',
  ];

  // Map the stat keys for dynamic access
  const statKeys: (keyof typeof stats[0])[] = [
    'penalties',
    'positioning',
    'interceptions',
    'sliding_tackle',
    'preferred_foot',
    'attacking_work_rate',
    'defensive_work_rate',
    'heading_accuracy',
    'short_passing',
    'dribbling',
    'long_passing',
    'ball_control',
    'acceleration',
    'sprint_speed',
    'shot_power',
    'long_shots',
  ];

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
