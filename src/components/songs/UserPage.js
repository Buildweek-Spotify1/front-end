import React from 'react'
import { TextField, Card, CardContent, CardActionArea, Typography, Grid } from '@material-ui/core'
import Playlist from './Playlist'
import Search from './Search'

const UserPage = props => {
  return (
    <div>
      <Grid container spacing={1} justify='space-around'>
        <Grid item>
          <Playlist />
        </Grid>
        <Grid item xs={9}>
          <Search />
        </Grid>
      </Grid>
    </div>
  )
}

export default UserPage