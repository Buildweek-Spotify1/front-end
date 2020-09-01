import React, { useState } from 'react'
import { GridList, GridListTile, GridListTileBar, TextField, useMediaQuery, useTheme } from '@material-ui/core'
import useStyles from '../../../utilities/Styles'
import SongModal from './SongModal'
import { useDispatch, useSelector } from 'react-redux'
import { search } from '../../../redux/actions'
import { checkExpired } from '../../../utilities/checkExpired'
import { useHistory } from 'react-router'


const Search = (props) => {
  //hooks
  const classes = useStyles()
  const matches = useMediaQuery(useTheme().breakpoints.down('md'))
  const dispatch = useDispatch()
  const history = useHistory()

  //redux state
  const songs = useSelector(state => state.searchResults)

  //component state
  const [searchText, setSearchText] = useState('')
  const [modalOpen, setModalOpen] = useState(false)
  const [selectedSong, setSelectedSong] = useState({ title: '' })

  /**
   * submit handler for search box
   * 
   * @param {event} e click event
   */
  const doSearch = e => {
    e.preventDefault()
    checkExpired() ? history.push('/signin') : dispatch(search(searchText))
  }

  /**
   * change event handler for search
   * 
   * @param {event} e change event
   */
  const handleChange = e => {
    setSearchText(e.target.value)
  }

  /**
   * sets the selected song to the one that was clicked on, and opens the song modal
   * 
   * @param {object} song song object that was clicked on
   */
  const addSongToPlaylist = (song) => {
    // dispatch(addToPlaylist(song))
    setSelectedSong(song)
    setModalOpen(true)
  }

  return (
    <div>
      <form onSubmit={doSearch}><TextField fullWidth label='search' value={searchText} onChange={handleChange} /></form>
      <GridList cellHeight={matches ? 250 : 450} className={classes.gridList} cols={matches ? 2 : 3}>
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