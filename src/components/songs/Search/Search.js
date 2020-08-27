import React, { useState } from 'react'
import { GridList, GridListTile, GridListTileBar, TextField, useMediaQuery, useTheme } from '@material-ui/core'
import useStyles from '../../../utilities/Styles'
import SongModal from './SongModal'
import { useDispatch, useSelector } from 'react-redux'
import { search } from '../../../redux/actions'


const Search = (props) => {
  const classes = useStyles()
  const songs = useSelector(state => state.searchResults)
  const [searchText, setSearchText] = useState('')
  const matches = useMediaQuery(useTheme().breakpoints.down('md'))
  const dispatch = useDispatch()

  const doSearch = e => {
    e.preventDefault()
    dispatch(search(searchText))
    // Axios({
    //   method: 'get',
    //   url: `https://api.spotify.com/v1/search?q=${search}&type=album,track`,
    //   dataType: 'json',
    //   headers: {
    //     'Authorization': 'Bearer ' + localStorage.getItem('spotifyToken'),
    //     'Content-Type': 'application/json'
    //   }
    // })
    //   .then(res => {
    //     console.log(res)
    //     let newTracks = []
    //     res.data.tracks.items.forEach(track => {
    //       newTracks.push({
    //         title: track.name,
    //         artist: track.artists[0].name,
    //         albumCover: track.album.images[0].url,
    //         album: track.album.name
    //         id: track.id
    //       })
    //     })
    //     console.log(newTracks)

    //     setSongs(newTracks)
    //   })
    //   .catch(err => {
    //     debugger
    //     console.log(err)
    //   })

  }

  const handleChange = e => {
    setSearchText(e.target.value)
  }

  const [modalOpen, setModalOpen] = useState(false)
  const [selectedSong, setSelectedSong] = useState({ title: '' })

  const addSongToPlaylist = (song) => {
    // dispatch(addToPlaylist(song))
    setSelectedSong(song)
    setModalOpen(true)
  }

  return (
    <div>
      <form onSubmit={doSearch}><TextField label='search' value={searchText} onChange={handleChange} /></form>
      <GridList cellHeight={matches ? 250 : 450} className={classes.gridList} cols={matches ? 2 : 4}>
        {songs.map(song => (
          <GridListTile onClick={e => addSongToPlaylist(song)} key={`${song.title}${song.albumCover}`} cols={1}>
            <img src={song.albumCover} alt={song.title} />
            <GridListTileBar
              title={song.title}
              subtitle={song.artist}
            />
          </GridListTile>
        ))}
      </GridList>
      <SongModal song={selectedSong} open={modalOpen} setOpen={setModalOpen} />
    </div >

  )
}

export default Search