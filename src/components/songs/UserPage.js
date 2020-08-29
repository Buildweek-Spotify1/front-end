import React, { useEffect } from 'react'
import { Typography, Grid, Accordion, AccordionDetails, AccordionSummary } from '@material-ui/core'
import Playlist from './Playlist/Playlist'
import Search from './Search/Search'
import useStyles from '../../utilities/Styles'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router'
import { checkExpired } from '../../utilities/checkExpired'

const UserPage = props => {
  const classes = useStyles()
  const error = useSelector(state => state.error)
  const history = useHistory()

  useEffect(() => {
    if (checkExpired()) {
      history.push('/signin')
    }
  })

  return (
    <div>
      <Grid container spacing={1} justify='space-around'>
        <Grid item className={classes.playlist} xs={2}>
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
        <Grid item xs={7}>
          <Search />
        </Grid>
      </Grid>

      {error && <div>{error} </div>}
    </div>
  )
}

export default UserPage