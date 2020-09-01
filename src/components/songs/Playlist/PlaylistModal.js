import React from 'react'
import { Modal, Card, CardMedia, CardContent, Typography, Button, CardActions } from '@material-ui/core'
import useStyles from '../../../utilities/Styles'
import { useDispatch, useSelector } from 'react-redux'
import { removeFromPlaylist, getRecommendedSongs } from '../../../redux/actions'
import { checkExpired } from '../../../utilities/checkExpired'
import { useHistory } from 'react-router'



const PlaylistModal = ({ song, ...props }) => {
  //hooks
  const classes = useStyles()
  const dispatch = useDispatch()
  const history = useHistory()

  //redux state
  const selectedPlaylist = useSelector(state => state.selectedPlaylist)

  /**
   * close handler for modal
   */
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
              checkExpired() ? history.push('/signin') : dispatch(removeFromPlaylist(selectedPlaylist.id, song.id))
              props.setOpen(false)
            }
            }>Remove from Playlist</Button>
            <Button size='small' onClick={() => {
              props.setOpen(false)
              checkExpired() ? history.push('/signin') : dispatch(getRecommendedSongs(song))
            }} >Suggest Songs</Button>
          </CardActions>
        </Card>
      </div>
    </Modal>
  )
}

export default PlaylistModal