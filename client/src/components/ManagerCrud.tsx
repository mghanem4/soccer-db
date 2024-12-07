import React from 'react';
import { Container, Typography } from '@mui/material';
import ManagerSelectionView from './ManagerSelectionView';
// This is the ManagerCrud component that holds the ManagerSelectionView component
const ManagerCrud: React.FC = () => {
  return (
    <Container maxWidth="md" sx={{ mt: 5 }}>
      <Typography variant="h4" gutterBottom>
        Manager CRUD Operations
      </Typography>
      <ManagerSelectionView/>
    </Container>
  );
};

export default ManagerCrud;


