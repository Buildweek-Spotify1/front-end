import Axios from "axios"
import { authAxios } from '../../utilities/authAxios'

//Log in Actions
export const FETCH_LOG_IN = 'FETCH_LOG_IN'
export const FETCH_LOG_IN_SUCCESS = 'FETCH_LOG_IN_SUCCESS'
export const FETCH_LOG_IN_ERROR = 'FETCH_LOG_IN_ERROR'

//Sign up Actions
export const START_SIGNUP = 'START_SIGNUP'
export const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS'
export const SIGNUP_FAILURE = 'SIGNUP_FAILURE'

//Song Actions
export const START_GET_PLAYLIST = 'START_GET_PLAYLIST'
export const GET_PLAYLIST_FAILURE = 'GET_PLAYLIST_FAILURE'
export const GET_PLAYLIST_SUCCESS = 'GET_PLAYLIST_SUCCESS'

//Search Actions
export const START_SEARCH = 'START_SEARCH'
export const SEARCH_SUCCESS = 'SEARCH_SUCCESS'
export const SEARCH_FAILURE = 'SEARCH_FAILURE'

//Playlist Actions
export const GET_PLAYLISTS = 'GET_PLAYLISTS'
export const GET_PLAYLISTS_SUCCESS = 'GET_PLAYLISTS_SUCCESS'
export const GET_PLAYLISTS_FAILURE = 'GET_PLAYLISTS_FAILURE'
export const ADD_SONG_TO_PLAYLIST = 'ADD_SONG_TO_PLAYLIST'
export const ADD_SONG_TO_PLAYLIST_SUCCESS = 'ADD_SONG_TO_PLAYLIST_SUCCESS'
export const ADD_SONG_TO_PLAYLIST_FAILURE = 'ADD_SONG_TO_PLAYLIST_FAILURE'
export const REMOVE_SONG_FROM_PLAYLIST = 'REMOVE_SONG_FROM_PLAYLIST'
export const REMOVE_SONG_FROM_PLAYLIST_SUCCESS = 'REMOVE_SONG_FROM_PLAYLIST_SUCCESS'
export const REMOVE_SONG_FROM_PLAYLIST_FAILURE = 'REMOVE_SONG_FROM_PLAYLIST_FAILURE'
export const SAVE_PLAYLIST = 'SAVE_PLAYLIST'
export const SAVE_PLAYLIST_SUCCESS = 'SAVE_PLAYLIST_SUCCESS'
export const SAVE_PLAYLIST_FAILURE = 'SAVE_PLAYLIST_FAILURE'
export const UPDATE_PLAYLIST_NAME = 'UPDATE_PLAYLIST_NAME'
export const UPDATE_PLAYLIST_NAME_SUCCESS = 'UPDATE_PLAYLIST_NAME_SUCCESS'
export const UPDATE_PLAYLIST_NAME_FAILURE = 'UPDATE_PLAYLIST_NAME_FAILURE'
export const DELETE_PLAYLIST = 'DELETE_PLAYLIST'
export const DELETE_PLAYLIST_SUCCESS = 'DELETE_PLAYLIST_SUCCESS'
export const DELETE_PLAYLIST_FAILURE = 'DELETE_PLAYLIST_FAILURE'
export const CHANGE_SELECTED_PLAYLIST = 'CHANGE_SELECTED_PLAYLIST'

//Recommend Actions
export const GET_RECOMMENDATIONS = 'GET_RECOMMENDATIONS'
export const GET_RECOMENDATIONS_SUCCESS = 'GET_RECOMENDATIONS_SUCCESS'
export const GET_RECOMENDATIONS_ERROR = 'GET_RECOMENDATIONS_ERROR'

export const RESET_ERROR = 'RESET_ERROR'

/**
 * Redux Action to log into the site
 * @param {object} credentials user login information {username: {string} password: {string}}
 * @param {function} done callback to excecute after a successful login
 */
export const logIn = (credentials, done) => dispatch => {
  dispatch({ type: FETCH_LOG_IN })

  authAxios().post(`/auth/login`, credentials)
    .then(res => {
      dispatch({ type: FETCH_LOG_IN_SUCCESS, payload: res.data })
      localStorage.setItem('token', res.data.token)
      done()
    })
    .catch(err => {
      err.response ?
        dispatch({ type: FETCH_LOG_IN_ERROR, payload: err.response.data.message })
        :
        dispatch({ type: FETCH_LOG_IN_ERROR, payload: 'Sorry, Something went wrong' })
    })
}
/**
 * Redux Action to sign a new user up to the service
 * @param {*} userInfo 
 * @param {*} done 
 */
export const signUp = (userInfo, done) => dispatch => {
  dispatch({ type: START_SIGNUP })
  Axios.post(`https://spotify1-pt-bw.herokuapp.com/api/auth/signup`, userInfo)
    .then(res => {
      localStorage.setItem('token', res.data.token)
      localStorage.setItem('user', JSON.stringify(res.data.createdUser))
      dispatch({ type: SIGNUP_SUCCESS, payload: res.data })
      done()
    })
    .catch(err => {
      err.response ?
        dispatch({ type: SIGNUP_FAILURE, payload: err.response.data.message })
        :
        dispatch({ type: SIGNUP_FAILURE, payload: 'Sorry, Something went wrong' })
    })
}

export const search = searchText => dispatch => {
  dispatch({ type: START_SEARCH })
  authAxios().get('/songs/search')
    .then(res => {
      Axios({
        method: 'get',
        url: `https://api.spotify.com/v1/search?q=${searchText}&type=album,track`,
        dataType: 'json',
        headers: {
          'Authorization': 'Bearer ' + res.data.spotifyToken,
          'Content-Type': 'application/json'
        }
      })
        .then(res => {
          console.log(res)
          let newTracks = []
          res.data.tracks.items.forEach(track => {
            newTracks.push({
              title: track.name,
              artist: track.artists[0].name,
              albumCover: track.album.images[0].url,
              album: track.album.name,
              id: track.id
            })
          })
          dispatch({ type: SEARCH_SUCCESS, payload: newTracks })
        })
        .catch(err => {
          err.response ?
            dispatch({ type: SEARCH_FAILURE, payload: err.response.data.message })
            :
            dispatch({ type: SEARCH_FAILURE, payload: 'Sorry, Something went wrong' })
        })
    })
    .catch(err => {
    })
}

export const addToPlaylist = (playlistId, song) => dispatch => {
  dispatch({ type: ADD_SONG_TO_PLAYLIST })
  authAxios().post(`/playlists/${playlistId}/songs`, song)
    .then(res => {
      dispatch({ type: ADD_SONG_TO_PLAYLIST_SUCCESS, payload: { ...res.data, id: parseInt(res.data.id) } })
    })
    .catch(err => {
      err.response ?
        dispatch({ type: ADD_SONG_TO_PLAYLIST_FAILURE, payload: err.response.data.message })
        :
        dispatch({ type: ADD_SONG_TO_PLAYLIST_FAILURE, payload: 'Sorry, Something went wrong' })
    })
}

export const removeFromPlaylist = (playlistId, songId) => dispatch => {
  dispatch({ type: REMOVE_SONG_FROM_PLAYLIST })
  authAxios().delete(`/playlists/${playlistId}/songs/${songId}`)
    .then(res => {
      dispatch({ type: REMOVE_SONG_FROM_PLAYLIST_SUCCESS, payload: { ...res.data, id: parseInt(res.data.id) } })
    })
    .catch(err => {
      err.response ?
        dispatch({ type: REMOVE_SONG_FROM_PLAYLIST_FAILURE, payload: err.response.data.message })
        :
        dispatch({ type: REMOVE_SONG_FROM_PLAYLIST_FAILURE, payload: 'Sorry, Something went wrong' })
    })
}

export const getRecommendedSongs = song => dispatch => {
  dispatch({ type: GET_RECOMMENDATIONS })
  Axios({
    method: 'get',
    url: `https://suggestords2.herokuapp.com/suggestions`,
    dataType: 'json',
    headers: {
      'Content-Type': 'application/json'
    },
    params: {
      title: song.title,
      artist: song.artist
    }
  })
    .then(res => {
      let newTracks = res.data.tracks.map(track => {
        return {
          title: track.info.title,
          album: track.info.album,
          artist: track.info.artist,
          albumCover: track.info.image,
          id: track.info.id
        }
      })
      dispatch({ type: SEARCH_SUCCESS, payload: newTracks })
    })
    .catch(err => {
      dispatch({ type: SEARCH_FAILURE, payload: 'Could not retrieve recommendations' })
    })
}

export const getPlaylists = () => dispatch => {
  dispatch({ type: GET_PLAYLISTS })
  authAxios().get('/playlists')
    .then(res => {
      if (res.data.playlists.length === 0) {
        authAxios().post('/playlists', { playlist_name: 'New Playlist' })
          .then(response => {
            dispatch({ type: GET_PLAYLISTS_SUCCESS, payload: [{ ...response.data, songs: [] }] })
            dispatch({ type: CHANGE_SELECTED_PLAYLIST, payload: response.data.id })
          })
          .catch(err => {
            err.response ?
              dispatch({ type: SAVE_PLAYLIST_FAILURE, payload: err.response.data.message })
              :
              dispatch({ type: SAVE_PLAYLIST_FAILURE, payload: 'Sorry, Something went wrong' })
          })
      }
      else {
        let promises = []
        let newPlaylists = []
        res.data.playlists.forEach(list => {
          promises.push(authAxios().get(`/playlists/${list.id}/songs`))
        })
        Axios.all(promises).then(Axios.spread((...responses) => {
          dispatch({
            type: GET_PLAYLISTS_SUCCESS,
            payload: responses.map(res => { return { ...res.data, id: parseInt(res.data.id) } })
          })
          dispatch({ type: CHANGE_SELECTED_PLAYLIST, payload: res.data.playlists[0].id })
        }))
      }
    })
    .catch(err => {
      err.response ?
        dispatch({ type: GET_PLAYLISTS_FAILURE, payload: err.response.data.message })
        :
        dispatch({ type: GET_PLAYLISTS_FAILURE, payload: 'Sorry, Something went wrong' })
    })
}

export const addNewPlaylist = () => dispatch => {
  dispatch({ type: SAVE_PLAYLIST })
  authAxios().post('/playlists', { playlist_name: 'New Playlist' })
    .then(res => {
      dispatch({ type: SAVE_PLAYLIST_SUCCESS, payload: { ...res.data, songs: [] } })
    })
    .catch(err => {
      err.response ?
        dispatch({ type: SAVE_PLAYLIST_FAILURE, payload: err.response.data.message })
        :
        dispatch({ type: SAVE_PLAYLIST_FAILURE, payload: 'Sorry, Something went wrong' })
    })
}

export const changePlaylistName = playlist => dispatch => {
  dispatch({ type: UPDATE_PLAYLIST_NAME })
  authAxios().put(`/playlists/${playlist.id}`, { id: playlist.id, playlist_name: playlist.playlist_name })
    .then(res => {
      dispatch({ type: UPDATE_PLAYLIST_NAME_SUCCESS, payload: playlist })
    })
    .catch(err => {
      err.response ?
        dispatch({ type: UPDATE_PLAYLIST_NAME_FAILURE, payload: err.response.data.message })
        :
        dispatch({ type: UPDATE_PLAYLIST_NAME_FAILURE, payload: 'Sorry, Something went wrong' })
    })
}

export const deletePlaylist = id => dispatch => {
  dispatch({ type: DELETE_PLAYLIST })
  authAxios().delete(`/playlists/${id}`)
    .then(res => {
      dispatch({ type: DELETE_PLAYLIST_SUCCESS, payload: id })
    })
    .catch(err => {
      err.response ?
        dispatch({ type: DELETE_PLAYLIST_FAILURE, payload: err.response.data.message })
        :
        dispatch({ type: DELETE_PLAYLIST_FAILURE, payload: 'Sorry, Something went wrong' })
    })
}

export const changeSelectedPlaylist = id => {
  return { type: CHANGE_SELECTED_PLAYLIST, payload: id }
}

export const resetError = () => {
  return { type: RESET_ERROR }
}