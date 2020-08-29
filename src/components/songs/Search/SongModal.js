import React from 'react'
import { Modal, Card, CardMedia, CardContent, Typography, Button, CardActions } from '@material-ui/core'
import useStyles from '../../../utilities/Styles'
import { useDispatch, useSelector } from 'react-redux'
import { addToPlaylist, getRecommendedSongs, addNewPlaylist } from '../../../redux/actions'
import { useHistory } from 'react-router'
import { checkExpired } from '../../../utilities/checkExpired'



const SongModal = ({ song, ...props }) => {
  const classes = useStyles()
  const history = useHistory()
  const dispatch = useDispatch()
  const selectedPlaylist = useSelector(state => state.selectedPlaylist)
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
              if (checkExpired()) {
                history.push('/')
              }
              dispatch(addToPlaylist(selectedPlaylist.id, song))
              props.setOpen(false)
            }}>Add To Playlist</Button>
            <Button size='small' onClick={() => {
              if (selectedPlaylist.id === -1) {
                dispatch(addNewPlaylist())
              }
              if (checkExpired()) {
                history.push('/')
              }
              dispatch(getRecommendedSongs(song))
              props.setOpen(false)
            }}>Suggest Songs</Button>
          </CardActions>
        </Card>
      </div>
    </Modal>
  )
}

export default SongModal