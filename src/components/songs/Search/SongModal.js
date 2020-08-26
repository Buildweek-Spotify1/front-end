import React, { useState } from 'react'
import { Modal, Card, CardMedia, CardContent, Typography, CardActionArea, Button, CardActions } from '@material-ui/core'
import useStyles from '../../../utilities/Styles'
import { useDispatch } from 'react-redux'
import { addToPlaylist, getRecommendedSongs } from '../../../redux/actions'



const SongModal = ({ song, ...props }) => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const handleClose = () => {
    props.setOpen(false)
  }
  return (
    <Modal
      open={props.open}
      onClose={handleClose}
    >
      <div className={classes.modal}>
        <Card>
          <CardMedia
            className={classes.songMedia}
            image={song.albumCover}
          />
          <CardContent>
            <ul>
              <Typography variant='h5' component='li'>
                {song.title}
              </Typography>
              <Typography variant='h5' component='li' >
                {`Artist: ${song.artist}`}
              </Typography>
              <Typography variant='h5' component='li' >
                {`Album: ${song.album}`}
              </Typography>
            </ul>
          </CardContent>
          <CardActions>
            <Button size='small' onClick={() => {
              dispatch(addToPlaylist(song))
              props.setOpen(false)
            }}>Add To Playlist</Button>
            <Button size='small' onClick={() => {
              getRecommendedSongs(song)
              props.setOpen(false)
            }}>Suggest Songs</Button>
          </CardActions>
        </Card>
      </div>
    </Modal>
  )
}

export default SongModal