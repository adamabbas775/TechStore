import React from 'react';
import clsx from 'clsx';
import {Grid, Paper} from '@material-ui/core';

import {useStyles} from '../styles';

function Home() {
  const classes = useStyles();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  return (
    <div>
      <Grid container spacing={3}>
        <Grid item xs={12} md={8} lg={9}>
          <Paper className={fixedHeightPaper}>
            <h1>Home Page</h1>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4} lg={3}>
          <Paper className={fixedHeightPaper}>
            <h2>App Info</h2>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}

export default Home;
