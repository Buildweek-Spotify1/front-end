import React, { useState } from 'react'
import { GridList, GridListTile, GridListTileBar, TextField } from '@material-ui/core'
import useStyles from '../../utilities/Styles'
import { useSelector } from 'react-redux'
import { init } from '../../redux/reducers'

const Search = (props) => {
  const classes = useStyles()
  const [songs, setSongs] = useState([])
  const doSearch = e => {
    e.preventDefault()
    setSongs(init.songs)
  }
  return (
    <div>
      <form onSubmit={doSearch}><TextField label='search' /></form>
      <GridList cellHeight={160} className={classes.gridList} cols={4}>
        {songs.map(song => (
          <GridListTile key={song.albumCover} cols={1}>
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