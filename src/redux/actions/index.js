import Axios from "axios"

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
export const ADD_SONG_TO_PLAYLIST = 'ADD_SONG_TO_PLAYLIST'

export const logIn = (credentials, done) => dispatch => {
  dispatch({ type: FETCH_LOG_IN })
  Axios.post(`https://spotify1-pt-bw.herokuapp.com/api/auth/signup`, credentials)
    .then(res => {
      dispatch({ type: FETCH_LOG_IN_SUCCESS, payload: res.data })
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