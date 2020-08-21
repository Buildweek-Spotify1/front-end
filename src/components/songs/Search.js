import React, { useState } from 'react'
import { GridList, GridListTile, GridListTileBar, TextField, useMediaQuery, useTheme } from '@material-ui/core'
import useStyles from '../../utilities/Styles'
import { useSelector } from 'react-redux'
import { init } from '../../redux/reducers'

const Search = (props) => {
  const classes = useStyles()
  const [songs, setSongs] = useState([])
  const matches = useMediaQuery(useTheme().breakpoints.down('md'))
  const doSearch = e => {
    e.preventDefault()
    setSongs(init.songs)
  }
  return (
    <div>
      <form onSubmit={doSearch}><TextField label='search' /></form>
      <GridList cellHeight={matches ? 250 : 450} className={classes.gridList} cols={matches ? 2 : 4}>
        {songs.map(song => (
          <GridListTile key={`${song.title}${song.albumCover}`} cols={1}>
            <img src={song.albumCover} />
            <GridListTileBar
              title={song.title}
              subtitle={song.artist}
            />
          </GridListTile>
        ))}
      </GridList>
    </div >

  )
}

export default Search