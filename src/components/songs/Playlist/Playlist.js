import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import PlaylistItem from './PlaylistItem'
import PlaylistModal from './PlaylistModal'
import { getPlaylists } from '../../../redux/actions'

const Playlist = (props) => {
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
      {songs.map(song => <PlaylistItem setSelectedSong={setSelectedSong} setModalOpen={setModalOpen} song={song} key={`${song.title} - ${song.artist}`} />)}
      <PlaylistModal song={selectedSong} open={modalOpen} setOpen={setModalOpen} />
    </div>
  )
}

export default Playlist