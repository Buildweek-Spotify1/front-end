
import React, { useState, useEffect } from 'react'
import useStyles from '../../../utilities/Styles'
import { useSelector, useDispatch } from 'react-redux'
import PlaylistItem from './PlaylistItem'
import PlaylistModal from './PlaylistModal'
import { getPlaylists, changePlaylistName, changeSelectedPlaylist, addNewPlaylist, deletePlaylist } from '../../../redux/actions'
import { Typography, Select, MenuItem, TextField, Fab, Grid } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'
import DeleteIcon from '@material-ui/icons/Delete'
import { useHistory } from 'react-router'
import { checkExpired } from '../../../utilities/checkExpired'



const Playlist = (props) => {
  const selectedPlaylist = useSelector(state => state.selectedPlaylist)
  const [selectedSong, setSelectedSong] = useState({ albumCover: '' })
  const [modalOpen, setModalOpen] = useState(false)
  const dispatch = useDispatch()
  const playlists = useSelector(state => state.playlists)
  const [editing, setEditing] = useState(false)
  const [editingText, setEditingText] = useState('')
  const classes = useStyles()
  const history = useHistory()

  useEffect(() => {
    checkExpired() ? history.push('/signin') : dispatch(getPlaylists())
  }, [dispatch, history])

  const startEdit = () => {
    setEditingText(selectedPlaylist.playlist_name)
    setEditing(true)
  }

  const changeName = e => {
    setEditing(false)
    checkExpired() ? history.push('/signin') : dispatch(changePlaylistName({ ...selectedPlaylist, playlist_name: editingText }))
  }

  return (
    <div style={{ position: 'relative', height: '100%' }}>
      <Select value={selectedPlaylist.id} onChange={e => {
        checkExpired() ? history.push('/signin') : dispatch(changeSelectedPlaylist(parseInt(e.target.value)))
      }}>
        {playlists.map(list => <MenuItem key={list.playlist_name + list.id} value={list.id}>{list.playlist_name}</MenuItem>)}
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
          <Fab variant='extended' onClick={() => {
            checkExpired() ? history.push('/signin') : dispatch(addNewPlaylist())
          }}>
            <AddIcon />
            New
          </Fab>
        </Grid>
        <Grid item>
          <Fab variant='extended' onClick={() => {
            checkExpired() ? history.push('/signin') : dispatch(deletePlaylist(selectedPlaylist.id))
          }}>
            <DeleteIcon />
            Delete
          </Fab>
        </Grid>
      </Grid>
    </div>
  )
}

export default Playlist