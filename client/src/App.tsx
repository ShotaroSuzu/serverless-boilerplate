import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Avatar, Card, CardContent, CardHeader, Grid, Typography } from '@mui/material';

function App() {
  return (
    <>
      <Grid container direction="column" spacing={2}>
        <Grid item>
          <Typography variant="h2">MUIテスト</Typography>
        </Grid>
        <Grid item>
          <Card>
            <CardHeader
              avatar={<Avatar src="./logo" sx={{ width: 56, height: 56 }} />}
              title="learn React"
            ></CardHeader>
            <CardContent>
              <Typography variant="body1">I'll be a react expert.</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );
}

export default App;
