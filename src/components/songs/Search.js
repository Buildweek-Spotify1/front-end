import React, { useState, useEffect } from 'react'
import { GridList, GridListTile, GridListTileBar, TextField, useMediaQuery, useTheme } from '@material-ui/core'
import useStyles from '../../utilities/Styles'
import { init } from '../../redux/reducers'
import Axios from 'axios'
import qs from 'qs'
import { useDispatch } from 'react-redux'
import { addToPlaylist } from '../../redux/actions'


const Search = (props) => {
  const classes = useStyles()
  const [songs, setSongs] = useState([])
  const [search, setSearch] = useState('')
  const matches = useMediaQuery(useTheme().breakpoints.down('md'))
  const dispatch = useDispatch()

  // useEffect(() => {
  //   Axios.post('https://accounts.spotify.com/api/token',
  //     qs.stringify({
  //       grant_type: 'client_credentials'
  //     }),
  //     {
  //       headers: {
  //         Accept: 'application/json',
  //         'Content-Type': 'application/x-www-form-urlencoded',
  //       },
  //       auth: {
  //         username: process.env.CLIENT_ID,
  //         password: process.env.CLIENT_SECRET
  //       }
  //     }
  //   )
  //     .then(res => {
  //       localStorage.setItem('spotifyToken', res.data.access_token)
  //       console.log(res)
  //     })
  //     .catch(err => {
  //       debugger
  //       console.log(err)
  //     })
  // }, [])

  const doSearch = e => {
    e.preventDefault()

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
    setSongs(init.songs)

  }
  const handleChange = e => {
    setSearch(e.target.value)
  }

  return (
    <div>
      <form onSubmit={doSearch}><TextField label='search' value={search} onChange={handleChange} /></form>
      <GridList cellHeight={matches ? 250 : 450} className={classes.gridList} cols={matches ? 2 : 4}>
        {songs.map(song => (
          <GridListTile onClick={e => {
            dispatch(addToPlaylist(song))
          }} key={`${song.title}${song.albumCover}`} cols={1}>
            <img src={song.albumCover} alt={song.title} />
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