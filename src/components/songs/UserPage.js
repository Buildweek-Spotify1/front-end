import React from 'react'
import { TextField, Card, CardContent, CardActionArea, Typography, Grid } from '@material-ui/core'
import Playlist from './Playlist'

const UserPage = props => {
  return (
    <div>
      <Grid container>
        <Grid item>
          <Playlist />
        </Grid>
        <Grid item>

        </Grid>
      </Grid>
    </div>
  )
}

export default UserPage