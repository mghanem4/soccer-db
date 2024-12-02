import React, { useState } from 'react';
import { Button, Box, Typography, CircularProgress } from '@mui/material';
import axios from 'axios';
import ScrollableTable from './ScrollableTable';

const QueriesPage = () => {
  const [data, setData] = useState<any[]>([]); // Data for the table
  const [columns, setColumns] = useState<{ id: string; label: string }[]>([]); // Columns for the table
  const [loading, setLoading] = useState(false);

  // Fetch data from the server and update table
  const fetchData = async (endpoint: string) => {
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:5000/queries/${endpoint}`);
      const responseData = Array.isArray(response.data) ? response.data : [response.data];

      setData(responseData);

      // Dynamically generate columns based on the first row
      if (responseData.length > 0) {
        setColumns(
          Object.keys(responseData[0]).map((key) => ({
            id: key,
            label: key.replace(/_/g, ' ').toUpperCase(), // Format column names
          }))
        );
      } else {
        setColumns([]);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      setData([]);
      setColumns([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom>
        Database Queries
      </Typography>

      {/* Buttons for Queries */}
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
      </Box>

      {/* Loading Indicator */}
      {loading && <CircularProgress />}

      {/* ScrollableTable for Results */}
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

      {/* No Results Message */}
      {!loading && data.length === 0 && <Typography>No data available.</Typography>}
    </Box>
  );
};

export default QueriesPage;
