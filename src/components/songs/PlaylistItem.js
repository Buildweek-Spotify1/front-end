import React from 'react'

const PlaylistItem = ({ song, ...rest }) => {
  return (
    <div>
      {song.title}
    </div>
  )
}

export default PlaylistItem