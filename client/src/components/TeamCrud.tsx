import React from 'react';
import { Container, Typography } from '@mui/material';
import TeamSelectionView from './TeamSelectionView';

// This is the TeamCrud component that holds the TeamSelectionView component

const TeamCrud: React.FC = () => {
  return (
    <Container maxWidth="md" sx={{ mt: 5 }}>
      <Typography variant="h4" gutterBottom>
        Team CRUD Operations
      </Typography>
      <TeamSelectionView/>
    </Container>
  );
};

export default TeamCrud;
