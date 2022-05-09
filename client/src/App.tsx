import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Avatar, Card, CardContent, CardHeader, Grid, Typography } from '@mui/material';
import { AppRoutes } from './routes';
import { AppProvider } from './providers/app';

function App() {
  return (
    <AppProvider>
      <AppRoutes />
    </AppProvider>
  );
}

export default App;
