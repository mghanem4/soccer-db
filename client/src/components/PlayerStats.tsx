import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

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

  // const preferredFootMap = { Left: 0, Right: 1 };
  const workRateMap = { Low: 0, Medium: 1, High: 2 };

const PlayerStats: React.FC<PlayerStatsProps> = ({ stats }) => {
  const labels = stats.map((stat) => `Season ${stat.season_year}`);
  const data = {
    labels,
    datasets: [
      {
        label: 'Penalties',
        data: stats.map((stat) => stat.penalties),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
      {
        label: 'Positioning',
        data: stats.map((stat) => stat.positioning),
        backgroundColor: 'rgba(153, 102, 255, 0.6)',
      },
      {
        label: 'Interceptions',
        data: stats.map((stat) => stat.interceptions),
        backgroundColor: 'rgba(255, 159, 64, 0.6)',
      },
      {
        label: 'Sliding Tackle',
        data: stats.map((stat) => stat.sliding_tackle),
        backgroundColor: 'rgba(255, 99, 132, 0.6)',
      },
      {
        label: 'Attacking Work Rate',
        data: stats.map((stat) => workRateMap[stat.attacking_work_rate as keyof typeof workRateMap] || 0),
        backgroundColor: 'rgba(255, 206, 86, 0.6)',
      },
      {
        label: 'Defensive Work Rate',
        data: stats.map((stat) => workRateMap[stat.defensive_work_rate as keyof typeof workRateMap] || 0),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
      {
        label: 'Heading Accuracy',
        data: stats.map((stat) => stat.heading_accuracy),
        backgroundColor: 'rgba(153, 102, 255, 0.6)',
      },
      {
        label: 'Short Passing',
        data: stats.map((stat) => stat.short_passing),
        backgroundColor: 'rgba(255, 159, 64, 0.6)',
      },
      {
        label: 'Dribbling',
        data: stats.map((stat) => stat.dribbling),
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
      },
      {
        label: 'Long Passing',
        data: stats.map((stat) => stat.long_passing),
        backgroundColor: 'rgba(255, 206, 86, 0.6)',
      },
      {
        label: 'Ball Control',
        data: stats.map((stat) => stat.ball_control),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
      {
        label: 'Acceleration',
        data: stats.map((stat) => stat.acceleration),
        backgroundColor: 'rgba(153, 102, 255, 0.6)',
      },
      {
        label: 'Sprint Speed',
        data: stats.map((stat) => stat.sprint_speed),
        backgroundColor: 'rgba(255, 159, 64, 0.6)',
      },
      {
        label: 'Shot Power',
        data: stats.map((stat) => stat.shot_power),
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
      },
      {
        label: 'Long Shots',
        data: stats.map((stat) => stat.long_shots),
        backgroundColor: 'rgba(255, 206, 86, 0.6)',
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
