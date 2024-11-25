import React from 'react';
import SelectionView from './SelectionView'; // Reuse the existing Player CRUD component
import { Container, Typography } from '@mui/material';

const PlayerCrud: React.FC = () => {
  return (
    <Container maxWidth="md" sx={{ mt: 5 }}>
      <Typography variant="h4" gutterBottom>
        Player CRUD Operations
      </Typography>
      <SelectionView/>
    </Container>
  );
};

export default PlayerCrud;
