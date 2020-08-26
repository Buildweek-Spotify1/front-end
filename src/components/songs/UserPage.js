import React from 'react'
import { Typography, Grid, Accordion, AccordionDetails, AccordionSummary } from '@material-ui/core'
import Playlist from './Playlist'
import Search from './Search'
import useStyles from '../../utilities/Styles'

const UserPage = props => {
  const classes = useStyles()
  return (
    <div>
      <Grid container spacing={1} justify='space-around'>
        <Grid item className={classes.playlist}>
          <Playlist />
        </Grid>
        <Grid item className={classes.mobilePlaylist}>
          <Accordion>
            <AccordionSummary>
              <Typography>View Playlist</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Playlist />
            </AccordionDetails>
          </Accordion>
        </Grid>
        <Grid item xs={8}>
          <Search />
        </Grid>
      </Grid>
    </div>
  )
}

export default UserPage