import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import PlaylistItem from './PlaylistItem'
import PlaylistModal from './PlaylistModal'
import { getPlaylists, changePlaylistName, changeSelectedPlaylist, addNewPlaylist, deletePlaylist } from '../../../redux/actions'
import { Typography, Select, MenuItem, TextField, Fab, Grid } from '@material-ui/core'
import useStyles from '../../../utilities/Styles'
import AddIcon from '@material-ui/icons/Add'
import DeleteIcon from '@material-ui/icons/Delete'
import { grid } from '@material-ui/system'

const Playlist = (props) => {
  const selectedPlaylist = useSelector(state => state.selectedPlaylist)
  const [selectedSong, setSelectedSong] = useState({ albumCover: '' })
  const [modalOpen, setModalOpen] = useState(false)
  const dispatch = useDispatch()
  const playlists = useSelector(state => state.playlists)
  const [editing, setEditing] = useState(false)
  const [editingText, setEditingText] = useState('')
  const classes = useStyles()

  useEffect(() => {
    dispatch(getPlaylists())
  }, [])

  const startEdit = () => {
    setEditingText(selectedPlaylist.playlist_name)
    setEditing(true)
  }

  const changeName = e => {
    setEditing(false)
    dispatch(changePlaylistName({ ...selectedPlaylist, playlist_name: editingText }))
  }

  return (
    <div style={{ position: 'relative', height: '100%' }}>
      <Select value={selectedPlaylist.id} onChange={e => { dispatch(changeSelectedPlaylist(parseInt(e.target.value))) }}>
        {playlists.map(list => <MenuItem value={list.id}>{list.playlist_name}</MenuItem>)}
      </Select>
      {editing ?
        <form onSubmit={changeName}>
          <TextField size='small' InputProps={{ classes: { input: classes.editTextFontSize } }} className={classes.editText} value={editingText} name='editingText' onChange={e => setEditingText(e.target.value)} />
        </form>
        :
        <Typography variant='h3' onClick={startEdit}>
          {selectedPlaylist.playlist_name}
        </Typography>}
      {selectedPlaylist.songs.map(song => <PlaylistItem setSelectedSong={setSelectedSong} setModalOpen={setModalOpen} song={song} key={`${song.title} - ${song.artist}`} />)}
      <PlaylistModal song={selectedSong} open={modalOpen} setOpen={setModalOpen} />
      <Grid container justify='center' spacing={1} className={classes.playlistButtons}>
        <Grid item>
          <Fab variant='extended' onClick={() => dispatch(addNewPlaylist())}>
            <AddIcon />
            New
          </Fab>
        </Grid>
        <Grid item>
          <Fab variant='extended' onClick={() => dispatch(deletePlaylist(selectedPlaylist.id))}>
            <DeleteIcon />
            Delete
          </Fab>
        </Grid>
      </Grid>
    </div>
  )
}

export default Playlist