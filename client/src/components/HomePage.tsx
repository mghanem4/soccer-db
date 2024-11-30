import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Container, Typography, Box } from '@mui/material';

// import { createTheme } from '@mui/material/styles';



const HomePage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Container maxWidth="sm" sx={{ textAlign: 'center', mt: 5 }}>
      <Typography variant="h4" gutterBottom>
        Welcome to Soccer Manager
      </Typography>
      <Typography variant="body1" gutterBottom>
        Choose an option below to manage your data.
      </Typography>
      <Box sx={{ mt: 4 }}>
        <Button
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mb: 2 }}
          onClick={() => navigate('/player-crud')}
        >
          Player CRUD (Create, Read, Update, Delete)
        </Button>
        <Button
          variant="contained"
          color="secondary"
          fullWidth
          sx={{ mb: 2 }}

          onClick={() => navigate('/team-crud')}
        >
          Team CRUD (Create, Read, Update, Delete)
        </Button>

        <Button
          variant="contained"
          color="success"
          fullWidth
          sx={{ mb: 2 }}
          onClick={() => navigate('/league-crud')}
        >
          League CRUD (Create, Read, Update, Delete)
        </Button>

        <Button
          variant="contained"
          color="info"
          fullWidth
          sx={{ mb: 2 }}
          onClick={() => navigate('/manager-crud')}
        >
          Manager CRUD (Create, Read, Update, Delete)
        </Button>

        <Button
          variant="contained"
          color="warning"
          fullWidth
          sx={{ mb: 2 }}
          onClick={() => navigate('/player-stats')}
        >
          Player Stats 
        </Button>

        <Button
          variant="contained"
          color="warning"
          fullWidth
          sx={{ mb: 2 }}
          onClick={() => navigate('/league-stats')}
        >
          League Stats 
        </Button>

      </Box>
    </Container>
  );
};

export default HomePage;
