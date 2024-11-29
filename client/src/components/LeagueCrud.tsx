import React from 'react';
import { Container, Typography } from '@mui/material';
import LeagueSelectionView from './LeagueSelectionView';

const LeagueCrud: React.FC = () => {
  return (
    <Container maxWidth="md" sx={{ mt: 5 }}>
      <Typography variant="h4" gutterBottom>
        League CRUD Operations
      </Typography>
      <LeagueSelectionView/>
    </Container>
  );
};

export default LeagueCrud;
