import React from 'react';
import { Manager } from '../api';
import { Card, CardContent, Typography, Grid } from '@mui/material';

interface ManagerListProps {
  managers: Manager[];
}

const ManagerList: React.FC<ManagerListProps> = ({ managers }) => {
  return (
    <div>
      <Typography variant="h5" gutterBottom>
        Current Managers
      </Typography>
      <Grid container spacing={2}>
        {managers.map((manager) => (
          <Grid item xs={12} sm={6} md={4} key={manager.manager_id}>
            <Card variant="outlined">
              <CardContent>
                <Typography variant="h6" component="div">
                  {manager.manager_name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Manager ID: {manager.manager_id}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Date of Birth: {manager.manager_dob}
                </Typography>
                {/* <Typography variant="body2" color="text.secondary">
                  Age: {manager.age || 'Not Specified'}
                </Typography> */}
                <Typography variant="body2" color="text.secondary">
                  Country: {manager.manager_country}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default ManagerList;
