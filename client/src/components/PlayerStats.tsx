import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

interface PlayerStatsProps {
  stats: {
    season_year: number;
    tackles_won: number;
    recoveries: number;
    aerial_duels_won: number;
    aerial_duels_lost: number;
  }[];
}

const PlayerStats: React.FC<PlayerStatsProps> = ({ stats }) => {
  const labels = stats.map((stat) => `Season ${stat.season_year}`);
  const data = {
    labels,
    datasets: [
      {
        label: 'Tackles Won',
        data: stats.map((stat) => stat.tackles_won),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
      {
        label: 'Recoveries',
        data: stats.map((stat) => stat.recoveries),
        backgroundColor: 'rgba(153, 102, 255, 0.6)',
      },
      {
        label: 'Aerial Duels Won',
        data: stats.map((stat) => stat.aerial_duels_won),
        backgroundColor: 'rgba(255, 159, 64, 0.6)',
      },
      {
        label: 'Aerial Duels Lost',
        data: stats.map((stat) => stat.aerial_duels_lost),
        backgroundColor: 'rgba(255, 99, 132, 0.6)',
      },
    ],
  };

  return (
    <Bar
      data={data}
      options={{
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
        },
      }}
    />
  );
};

export default PlayerStats;
