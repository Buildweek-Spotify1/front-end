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
export const REMOVE_SONG_FROM_PLAYLIST = 'REMOVE_SONG_FROM_PLAYLIST'
export const SAVE_PLAYLIST = 'SAVE_PLAYLIST'
export const SAVE_PLAYLIST_SUCCESS = 'SAVE_PLAYLIST_SUCCESS'
export const SAVE_PLAYLIST_FAILURE = 'SAVE_PLAYLIST_FAILURE'
export const UPDATE_PLAYLIST_NAME = 'UPDATE_PLAYLIST_NAME'
export const UPDATE_PLAYLIST_NAME_SUCCESS = 'UPDATE_PLAYLIST_NAME_SUCCESS'
export const UPDATE_PLAYLIST_NAME_FAILURE = 'UPDATE_PLAYLIST_NAME_FAILURE'
export const DELETE_PLAYLIST = 'DELETE_PLAYLIST'
export const DELETE_PLAYLIST_SUCCESS = 'DELETE_PLAYLIST_SUCCESS'
export const DELETE_PLAYLIST_FAILURE = 'DELETE_PLAYLIST_FAILURE'

export const logIn = (credentials, done) => dispatch => {
  dispatch({ type: FETCH_LOG_IN })

  authAxios().post(`/auth/login`, credentials)
    .then(res => {
      dispatch({ type: FETCH_LOG_IN_SUCCESS, payload: res.data })
      localStorage.setItem('token', res.data.token)
      done()
    })
    .catch(err => {
      dispatch({ type: FETCH_LOG_IN_ERROR, payload: err.response.data.message })
    })
}

export const signUp = (userInfo, done) => dispatch => {
  dispatch({ type: START_SIGNUP })
  Axios.post(`https://spotify1-pt-bw.herokuapp.com/api/auth/signup`, userInfo)
    .then(res => {
      debugger
      localStorage.setItem('token', res.data.token)
      localStorage.setItem('user', JSON.stringify(res.data.createdUser))
      dispatch({ type: SIGNUP_SUCCESS, payload: res.data })
      done()
    })
    .catch(err => {
      debugger
      dispatch({ type: SIGNUP_FAILURE, payload: err.response.data.message })
    })
}

export const addToPlaylist = song => {
  return { type: ADD_SONG_TO_PLAYLIST, payload: song }
}

export const removeFromPlaylist = song => {
  return { type: REMOVE_SONG_FROM_PLAYLIST, payload: song.id }
}

export const getRecommendedSongs = song => dispatch => {

}

export const getPlaylists = () => dispatch => {
  dispatch({ type: GET_PLAYLISTS })
  authAxios().get('/playlists')
    .then(res => {
      dispatch({ type: GET_PLAYLISTS_SUCCESS, payload: res.data.playlists })
    })
    .catch(err => {
      dispatch({ type: GET_PLAYLISTS_FAILURE, payload: err.response.data.message })
    })
}

export const savePlaylist = playlist => dispatch => {
  dispatch({ type: SAVE_PLAYLIST })
  authAxios().post('/playlists', playlist)
    .then(res => {
      dispatch({ type: SAVE_PLAYLIST_SUCCESS, payload: res.data })
    })
    .catch(err => {
      dispatch({ type: SAVE_PLAYLIST_FAILURE, payload: err.response.data.message })
    })
}

export const changePlaylistName = playlist => dispatch => {
  dispatch({ type: UPDATE_PLAYLIST_NAME })
  authAxios().put(`/playlists/${playlist.id}`, playlist)
    .then(res => {
      dispatch({ type: UPDATE_PLAYLIST_NAME_SUCCESS, payload: playlist })
    })
    .catch(err => {
      dispatch({ type: UPDATE_PLAYLIST_NAME_FAILURE, payload: err.response.data.message })
    })
}

export const deletePlaylist = id => dispatch => {
  dispatch({ type: DELETE_PLAYLIST })
  authAxios().delete(`/playlists/${id}`)
    .then(res => {
      dispatch({ type: DELETE_PLAYLIST_SUCCESS, payload: id })
    })
    .then(err => {
      dispatch({ type: DELETE_PLAYLIST_FAILURE, payload: err.response.data.message })
    })
}