import React from 'react';
import { useAuth } from '../contexts/auth';
import ProtectedRoutes from './ProtectedRoutes';
import PublicRoutes from './PublicRoutes';
import { CircularProgress, Grid } from '@material-ui/core';

function Routes() {
  const { isLoading, signed } = useAuth();

  if (isLoading)
    return (
      <Grid container justify="center" alignItems="center">
        <CircularProgress size={100} />
      </Grid>
    );

  return signed ? <ProtectedRoutes /> : <PublicRoutes />;
}

export default Routes;
