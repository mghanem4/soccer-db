import React, { useState } from 'react';
import { Button, Box, Typography, CircularProgress,TextField } from '@mui/material';
import ScrollableTable from './ScrollableTable';
import { fetchQueryData } from '../api'; // Import the helper function

const QueriesPage = () => {
  const [data, setData] = useState<any[]>([]);
  const [columns, setColumns] = useState<{ id: string; label: string }[]>([]);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState<string | null>(null);
  const [attribute, setAttribute] = useState<string>('');

  const fetchData = async (endpoint: string) => {
    setLoading(true);
    try {
      // Use the helper function to fetch data by calling the API endpoint
      const { query, result } = await fetchQueryData(endpoint);
      // use th query to get the query from the response and display it 
      setData(result);
      setQuery(query);

      if (result.length > 0) {
        setColumns(
          Object.keys(result[0]).map((key) => ({
            id: key,
            label: key.replace(/_/g, ' ').toUpperCase(),
          }))
        );
      } else {
        setColumns([]);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      setData([]);
      setColumns([]);
      setQuery(null);
    } finally {
      setLoading(false);
    }
  };

  const handleAttributeSubmit = async () => {
    if (!['dribbling', 'pace', 'shooting', 'passing', 'physicality'].includes(attribute.toLowerCase())) {
      alert('Invalid attribute! Please enter dribbling, pace, shooting, passing, or physicality.');
      return;
    }
    await fetchData(`best-attribute/${attribute.toLowerCase()}`);
  };

// return the buttons with the query selected to be executed
  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom>
        Database Queries
      </Typography>

      <Box display="flex" gap={2} flexWrap="wrap" mb={3}>
        <Button variant="contained" onClick={() => fetchData('most-goals')}>
          Player with Most Goals
        </Button>
        <Button variant="contained" onClick={() => fetchData('preferred-foot-right')}>
          Players with Preferred Foot Right
        </Button>
        <Button variant="contained" onClick={() => fetchData('below-age-26')}>
          Players Below Age 26
        </Button>
        <Button variant="contained" onClick={() => fetchData('most-trophies')}>
          Players with Most Trophies
        </Button>
        <Button variant="contained" onClick={() => fetchData('most-wins')}>
          Team with Most Wins
        </Button>
        <Button variant="contained" onClick={() => fetchData('most-losses')}>
          Team with Most Losses
        </Button>
        <Button variant="contained" onClick={() => fetchData('most-team-trophies')}>
          Team with Most Trophies
        </Button>
        <Button variant="contained" onClick={() => fetchData('player-trophies')}>
          Get Player Trophies
        </Button>
        <Button variant="contained" onClick={() => fetchData('high-work-rate')}>
          Get Players with High/High Work Rate
        </Button>
        
        <Button variant="contained" onClick={() => fetchData('all-player-teams')}>
          Get Players and their Teams
        </Button>
        <Box mb={3} display="flex" alignItems="center" gap={2}>
        <TextField
          label="Player Attribute"
          variant="outlined"
          value={attribute}
          onChange={(e) => setAttribute(e.target.value)}
          placeholder="Enter attribute (e.g., dribbling)"
        />
        <Button variant="contained" onClick={handleAttributeSubmit}>
          Get Best Player
        </Button>
      </Box>
      </Box>

      {loading && <CircularProgress />}

      {query && (
        <Box my={2} p={2} sx={{ backgroundColor: '#f9f9f9', border: '1px solid #ddd' }}>
          <Typography variant="subtitle1">
            <strong>Executed Query:</strong>
          </Typography>
          <Typography variant="body2" sx={{ fontFamily: 'monospace' }}>
            {query}
          </Typography>
        </Box>
      )}

      {!loading && data.length > 0 && (
        <ScrollableTable
          data={data}
          columns={columns}
          filterBy={(item, query) =>
            Object.values(item).some((value) =>
              value?.toString().toLowerCase().includes(query)
            )
          }
        />
      )}

      {!loading && data.length === 0 && <Typography>No data available.</Typography>}
    </Box>
  );
};

export default QueriesPage;
