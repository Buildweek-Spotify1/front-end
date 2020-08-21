import React from 'react'
import { useSelector } from 'react-redux'
import PlaylistItem from './PlaylistItem'

const Playlist = (props) => {
  const songs = useSelector(state => state.songs)

  console.log(songs)
  return (
    <div>
      {songs.map(song => <PlaylistItem song={song} key={`${song.title} - ${song.artist}`} />)}

    </div>
  )
}

export default Playlist