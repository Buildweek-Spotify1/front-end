
import React, { useState, useEffect } from 'react'
import useStyles from '../../../utilities/Styles'
import { FormControl, InputLabel, Select, MenuItem, Typography, Button } from '@material-ui/core'
import { useSelector, useDispatch } from 'react-redux'
import PlaylistItem from './PlaylistItem'
import PlaylistModal from './PlaylistModal'
import { getPlaylists } from '../../../redux/actions'



const Playlist = (props) => {
  const classes = useStyles();
  const songs = useSelector(state => state.songs)
  const [selectedSong, setSelectedSong] = useState(songs[0])
  const [modalOpen, setModalOpen] = useState(false)
  const dispatch = useDispatch()
  const playlists = useSelector(state => state.playlists)

  useEffect(() => {
    dispatch(getPlaylists())
  }, [dispatch])

  




  console.log(songs)
  return (
    <div>
      <FormControl className={classes.formControl}>
        <InputLabel id="select">Select</InputLabel>
        <Select
          labelId="1"
          id="1"
        >
          <MenuItem >One</MenuItem>
          <MenuItem >Two</MenuItem>
          <MenuItem >Three</MenuItem>
        </Select>
      </FormControl>
      <Typography component="h1" variant="h5">
        Playlist
      </Typography>
        {songs.map(song => <PlaylistItem setSelectedSong={setSelectedSong} setModalOpen={setModalOpen} song={song} key={`${song.title} - ${song.artist}`} />)}
      <PlaylistModal song={selectedSong} open={modalOpen} setOpen={setModalOpen} />
      <Button
        type="save"
        fullWidth
        variant="contained"
        color="primary"
        className={classes.submit}
      >
        Save
      </Button>
    </div>
  )
}

export default Playlist