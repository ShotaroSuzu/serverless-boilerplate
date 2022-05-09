import * as React from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { BrowserRouter as Router } from 'react-router-dom';

import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const ErrorFallback = () => {
  return (
    <>
      <Grid container spacing={2}>
        <Grid item>
          <Alert severity="error">
            <AlertTitle>Ooops, something went wrong :(</AlertTitle>
          </Alert>
        </Grid>
        <Grid item textAlign="center" xs={12}>
          <Button
            variant="contained"
            onClick={() => {
              window.location.assign(window.location.origin);
            }}
          ></Button>
        </Grid>
      </Grid>
    </>
  );
};

type AppProviderProps = {
  children: React.ReactNode;
};

export const AppProvider = ({ children }: AppProviderProps) => {
  return (
    <React.Suspense fallback={<CircularProgress />}>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <CssBaseline />
        <Router>{children}</Router>
      </ErrorBoundary>
    </React.Suspense>
  );
};
