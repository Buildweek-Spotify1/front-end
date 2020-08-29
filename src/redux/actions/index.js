import Axios from "axios"
import { authAxios } from '../../utilities/authAxios'

//Basic Actions
export const START_FETCH = 'START_FETCH'
export const FETCH_FAILED = 'FETCH_FAILED'

//Log in Actions
export const FETCH_LOG_IN_SUCCESS = 'FETCH_LOG_IN_SUCCESS'

//Sign up Actions
export const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS'

//Song Actions
export const GET_PLAYLIST_SUCCESS = 'GET_PLAYLIST_SUCCESS'

//Search Actions
export const SEARCH_SUCCESS = 'SEARCH_SUCCESS'

//Playlist Actions
export const GET_PLAYLISTS_SUCCESS = 'GET_PLAYLISTS_SUCCESS'
export const ADD_SONG_TO_PLAYLIST_SUCCESS = 'ADD_SONG_TO_PLAYLIST_SUCCESS'
export const REMOVE_SONG_FROM_PLAYLIST_SUCCESS = 'REMOVE_SONG_FROM_PLAYLIST_SUCCESS'
export const SAVE_PLAYLIST_SUCCESS = 'SAVE_PLAYLIST_SUCCESS'
export const UPDATE_PLAYLIST_NAME_SUCCESS = 'UPDATE_PLAYLIST_NAME_SUCCESS'
export const DELETE_PLAYLIST_SUCCESS = 'DELETE_PLAYLIST_SUCCESS'
export const CHANGE_SELECTED_PLAYLIST = 'CHANGE_SELECTED_PLAYLIST'

//Recommend Actions
export const GET_RECOMENDATIONS_SUCCESS = 'GET_RECOMENDATIONS_SUCCESS'

export const RESET_ERROR = 'RESET_ERROR'

/**
 * Uses given credentials to retrieve an authentication token from the backend api
 * 
 * @param {object} credentials user login information {username: {string} password: {string}}
 * @param {function} done callback to excecute after a successful login
 */
export const logIn = (credentials, done) => dispatch => {
  dispatch({ type: START_FETCH })

  authAxios().post(`/auth/login`, credentials)
    .then(res => {
      //logged in successfully
      dispatch({ type: FETCH_LOG_IN_SUCCESS, payload: res.data })
      localStorage.setItem('token', res.data.token)
      localStorage.setItem('logTime', Date.now())
      done()
    })
    .catch(err => {
      //failed to log in
      err.response ?
        dispatch({ type: FETCH_FAILED, payload: err.response.data.message })
        :
        dispatch({ type: FETCH_FAILED, payload: 'Sorry, Something went wrong' })
    })
}
/**
 * creates a new user using the given information, and retrieves an authentication token from the backend api
 * @param {object} userInfo information provided by the user to create a new account
 * @param {function} done callback to execute after a successful signup
 */
export const signUp = (userInfo, done) => dispatch => {
  dispatch({ type: START_FETCH })
  Axios.post(`https://spotify1-pt-bw.herokuapp.com/api/auth/signup`, userInfo)
    .then(res => {
      //signed up successfully
      localStorage.setItem('token', res.data.token)
      localStorage.setItem('user', JSON.stringify(res.data.createdUser))
      localStorage.setItem('logTime', Date.now())
      dispatch({ type: SIGNUP_SUCCESS, payload: res.data })
      done()
    })
    .catch(err => {
      //failed to sign up
      err.response ?
        dispatch({ type: FETCH_FAILED, payload: err.response.data.message })
        :
        dispatch({ type: FETCH_FAILED, payload: 'Sorry, Something went wrong' })
    })
}

/**
 * searches the spotify api for a given string, and returns a list of songs that match that string
 * 
 * @param {string} searchText a string containing either a track name or album name to search for
 */
export const search = searchText => dispatch => {
  dispatch({ type: START_FETCH })
  //get a spotify token from backend
  authAxios().get('/songs/search')
    .then(res => {
      //use token from backend to search spotify api for given track name
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
          //successfully got spotify tracks
          console.log(res)

          //shape data recieved from spotify for the app
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
          //failed to either get search token, or get results from spotify api
          err.response ?
            dispatch({ type: FETCH_FAILED, payload: err.response.data.message })
            :
            dispatch({ type: FETCH_FAILED, payload: 'Sorry, Something went wrong' })
        })
    })
}

/**
 * adds the given song to the current playlist
 * 
 * @param {integer} playlistId api's given id for a playlist
 * @param {object} song a song object to add to the playlist
 */
export const addToPlaylist = (playlistId, song) => dispatch => {
  dispatch({ type: START_FETCH })
  if (playlistId === -1) {
    authAxios().post('/playlists', { playlist_name: 'New Playlist' })
      .then(res => {
        //successfully created a new playlist
        dispatch({ type: SAVE_PLAYLIST_SUCCESS, payload: { ...res.data, songs: [] } })
        addNewSong(res.data.id, song, dispatch)
      })
      .catch(err => {
        //failed to create a new playlist
        err.response ?
          dispatch({ type: FETCH_FAILED, payload: err.response.data.message })
          :
          dispatch({ type: FETCH_FAILED, payload: 'Sorry, Something went wrong' })
      })
  }
  else {
    addNewSong(playlistId, song, dispatch)
  }
}

const addNewSong = (playlistId, song, dispatch) => {
  authAxios().post(`/playlists/${playlistId}/songs`, song)
    .then(res => {
      //add successful
      dispatch({ type: ADD_SONG_TO_PLAYLIST_SUCCESS, payload: { ...res.data, id: parseInt(res.data.id) } })
    })
    .catch(err => {
      //add failed
      err.response ?
        dispatch({ type: FETCH_FAILED, payload: err.response.data.message })
        :
        dispatch({ type: FETCH_FAILED, payload: 'Sorry, Something went wrong' })
    })
}

/**
 * removes a given song from the current playlist
 * 
 * @param {integer} playlistId id for a specific playlist
 * @param {string} songId spotify's track id for a specific song
 */
export const removeFromPlaylist = (playlistId, songId) => dispatch => {
  dispatch({ type: START_FETCH })
  authAxios().delete(`/playlists/${playlistId}/songs/${songId}`)
    .then(res => {
      //removal successful
      dispatch({ type: REMOVE_SONG_FROM_PLAYLIST_SUCCESS, payload: { ...res.data, id: parseInt(res.data.id) } })
    })
    .catch(err => {
      //removal failed
      err.response ?
        dispatch({ type: FETCH_FAILED, payload: err.response.data.message })
        :
        dispatch({ type: FETCH_FAILED, payload: 'Sorry, Something went wrong' })
    })
}

/**
 * searches the data science api with a given song, and retrieves recommended songs
 * 
 * @param {object} song A song object to use when searching the DS api for recommendations
 */
export const getRecommendedSongs = song => dispatch => {
  dispatch({ type: START_FETCH })
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
      //successfully retrieved recommendation data from api
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
      //failed to retrieve recommended data
      dispatch({ type: FETCH_FAILED, payload: 'Could not retrieve recommendations' })
    })
}

/**
 * retrieves playlist data from the backend api
 */
export const getPlaylists = () => dispatch => {
  dispatch({ type: START_FETCH })
  authAxios().get('/playlists')
    .then(res => {
      //successfully retrieved playlist data
      if (res.data.playlists.length === 0) {
        //user has no playlists, so create one
        authAxios().post('/playlists', { playlist_name: 'New Playlist' })
          .then(response => {
            //successfully created a new playlist, and now should set it as the currently active playlist
            dispatch({ type: GET_PLAYLISTS_SUCCESS, payload: [{ ...response.data, songs: [] }] })
            dispatch({ type: CHANGE_SELECTED_PLAYLIST, payload: response.data.id })
          })
          .catch(err => {
            //failed to create a new playlist
            err.response ?
              dispatch({ type: FETCH_FAILED, payload: err.response.data.message })
              :
              dispatch({ type: FETCH_FAILED, payload: 'Sorry, Something went wrong' })
          })
      }
      else {
        //user has one or more playlist
        let promises = []
        res.data.playlists.forEach(list => {
          //retrieve all song data for each playlist belonging to user
          promises.push(authAxios().get(`/playlists/${list.id}/songs`))
        })
        Axios.all(promises).then(Axios.spread((...responses) => {
          //successfully retrieved all song data for all playlists
          dispatch({
            type: GET_PLAYLISTS_SUCCESS,
            payload: responses.map(res => { return { ...res.data, id: parseInt(res.data.id) } })
          })
          //sets the first playlist as the currently active one
          dispatch({ type: CHANGE_SELECTED_PLAYLIST, payload: res.data.playlists[0].id })
        }))
      }
    })
    .catch(err => {
      //failed to retrieve either song or playlist data
      err.response ?
        dispatch({ type: FETCH_FAILED, payload: err.response.data.message })
        :
        dispatch({ type: FETCH_FAILED, payload: 'Sorry, Something went wrong' })
    })
}

/**
 * creates a new playlist object and adds it to the list of playlists
 */
export const addNewPlaylist = () => dispatch => {
  dispatch({ type: START_FETCH })
  authAxios().post('/playlists', { playlist_name: 'New Playlist' })
    .then(res => {
      //successfully created a new playlist
      dispatch({ type: SAVE_PLAYLIST_SUCCESS, payload: { ...res.data, songs: [] } })
    })
    .catch(err => {
      //failed to create a new playlist
      err.response ?
        dispatch({ type: FETCH_FAILED, payload: err.response.data.message })
        :
        dispatch({ type: FETCH_FAILED, payload: 'Sorry, Something went wrong' })
    })
}

/**
 * Renames a playlist
 * 
 * @param {object} playlist The playlist to update the name of
 */
export const changePlaylistName = playlist => dispatch => {
  dispatch({ type: START_FETCH })
  authAxios().put(`/playlists/${playlist.id}`, { id: playlist.id, playlist_name: playlist.playlist_name })
    .then(res => {
      //successfully changed playlist's name
      dispatch({ type: UPDATE_PLAYLIST_NAME_SUCCESS, payload: playlist })
    })
    .catch(err => {
      //failed to change playlist's name
      err.response ?
        dispatch({ type: FETCH_FAILED, payload: err.response.data.message })
        :
        dispatch({ type: FETCH_FAILED, payload: 'Sorry, Something went wrong' })
    })
}

/**
 * Deletes a playlist from the database
 * 
 * @param {integer} id id of playlist to delete
 */
export const deletePlaylist = id => dispatch => {
  dispatch({ type: START_FETCH })
  authAxios().delete(`/playlists/${id}`)
    .then(res => {
      //successfully deleted playlist
      dispatch({ type: DELETE_PLAYLIST_SUCCESS, payload: id })
    })
    .catch(err => {
      //failed to delete playlist
      err.response ?
        dispatch({ type: FETCH_FAILED, payload: err.response.data.message })
        :
        dispatch({ type: FETCH_FAILED, payload: 'Sorry, Something went wrong' })
    })
}

/**
 * switches the active playlist to a new one
 * 
 * @param {integer} id id of playlist to switch to
 */
export const changeSelectedPlaylist = id => {
  return { type: CHANGE_SELECTED_PLAYLIST, payload: id }
}

/**
 * Resets the error property to an empty string
 */
export const resetError = () => {
  return { type: RESET_ERROR }
}