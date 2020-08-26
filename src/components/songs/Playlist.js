import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import PlaylistItem from './PlaylistItem'
import PlaylistModal from './PlaylistModal'

const Playlist = (props) => {
  const songs = useSelector(state => state.songs)
  const [selectedSong, setSelectedSong] = useState(songs[0])
  const [modalOpen, setModalOpen] = useState(false)

  console.log(songs)
  return (
    <div>
      {songs.map(song => <PlaylistItem setSelectedSong={setSelectedSong} setModalOpen={setModalOpen} song={song} key={`${song.title} - ${song.artist}`} />)}
      <PlaylistModal song={selectedSong} open={modalOpen} setOpen={setModalOpen} />
    </div>
  )
}

export default Playlist