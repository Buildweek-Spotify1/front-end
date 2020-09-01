import React, { useState } from 'react'
import { Card, CardActionArea, Typography, Popover, useMediaQuery, useTheme } from '@material-ui/core'
import useStyles from '../../../utilities/Styles'

const PlaylistItem = ({ song, setSelectedSong, setModalOpen, ...rest }) => {
  //hooks
  const classes = useStyles()

  //component state
  const [popoverAnchor, setPopoverAnchor] = useState(null)

  /**
   * event handler for mouse enter event
   * 
   * @param {event} e mouse enter event
   */
  const handlePopoverOpen = e => {
    setPopoverAnchor(e.currentTarget)
  }

  /**
   * event handler for mouse leave event
   */
  const handlePopoverClose = () => {
    setPopoverAnchor(null)
  }

  //explicit truthy conversion
  const open = Boolean(popoverAnchor)

  //media query
  const matches = useMediaQuery(useTheme().breakpoints.down('md'))


  return (
    <div style={{ width: '100%', textAlign: 'left' }}>
      <Card variant='outlined'>
        <CardActionArea onClick={() => {
          setSelectedSong(song)
          setModalOpen(true)
        }} onMouseEnter={handlePopoverOpen} onMouseLeave={handlePopoverClose}>
          <Typography className={classes.songTitle} variant='button' display='block'>{song.title}</Typography>
          <Typography className={classes.songArtist} variant='overline'>{song.artist}</Typography>
        </CardActionArea>
      </Card>
      <Popover
        id={song.title}
        className={classes.popover}
        classes={{
          paper: classes.paper,
        }}
        open={open}
        anchorEl={popoverAnchor}
        anchorOrigin={{
          vertical: matches ? 'bottom' : 'top',
          horizontal: matches ? 'left' : 'right'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left'
        }}
        onClose={handlePopoverClose}
        disableRestoreFocus
      >
        {song.title}
      </Popover>
    </div>
  )
}

export default PlaylistItem