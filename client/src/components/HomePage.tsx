import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Container, Typography, Box, Grid, Paper } from '@mui/material';

const HomePage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Container maxWidth="md" sx={{ mt: 8, textAlign: 'center' }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 4 }}>
        <Typography variant="h3" gutterBottom>
          Soccer Manager
        </Typography>
        <Typography variant="body1" sx={{ mb: 4, color: 'text.secondary' }}>
          This is a soccer database web application, that is designed for data entry and viewing stats.
          This is a part of a long term machine learning project that I am working on, and I am using this app as a starting point to display data.

        </Typography>

        <Grid container spacing={3}>
          {/* CRUD Buttons */}


          <Grid xs={12}>
            <Box
              component="img"
              src="logo192.png"
              alt="Soccer logor"
              sx={{
                width: '20%',
                borderRadius: 2,
                mb: 4,
              }}
            />
          </Grid>

          <Grid item xs={12}>
            <Typography variant="h5" sx={{ mb: 2 }}>
              Manage Data
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              size="large"
              onClick={() => navigate('/player-crud')}
            >
              Player CRUD
            </Button>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Button
              variant="contained"
              color="secondary"
              fullWidth
              size="large"
              onClick={() => navigate('/team-crud')}
            >
              Team & Trophy CRUD
            </Button>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Button
              variant="contained"
              color="success"
              fullWidth
              size="large"
              onClick={() => navigate('/league-crud')}
            >
              League & Trophy CRUD
            </Button>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Button
              variant="contained"
              color="info"
              fullWidth
              size="large"
              onClick={() => navigate('/manager-crud')}
            >
              Manager CRUD
            </Button>
          </Grid>

          {/* Stats Section */}
          <Grid item xs={12}>
            <Typography variant="h5" sx={{ mt: 4, mb: 2 }}>
              View Stats
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Button
              variant="contained"
              color="warning"
              fullWidth
              size="large"
              onClick={() => navigate('/player-stats')}
            >
              Player Stats
            </Button>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Button
              variant="contained"
              color="warning"
              fullWidth
              size="large"
              onClick={() => navigate('/league-stats')}
            >
              League Stats
            </Button>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Button
              variant="contained"
              color="warning"
              fullWidth
              size="large"
              onClick={() => navigate('/team-stats')}
            >
              Team Stats
            </Button>
          </Grid>

          {/* Query Page */}
          <Grid item xs={12}>
            <Button
              variant="contained"
              color="warning"
              fullWidth
              size="large"
              onClick={() => navigate('/query-page')}
              sx={{ mt: 3 }}
            >
              Query Pages
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default HomePage;
