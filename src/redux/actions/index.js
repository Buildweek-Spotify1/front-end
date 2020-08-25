import Axios from "axios"
import { push } from 'react-router-redux'

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

export const logIn = (credentials, done) => dispatch => {
  dispatch({ type: FETCH_LOG_IN })
  Axios.post(`https://spotify1-pt-bw.herokuapp.com/api/auth/signup`, credentials)
    .then(res => {
      debugger
      dispatch({ type: FETCH_LOG_IN_SUCCESS, payload: res.data })
        .then(done())
    })
    .catch(err => {
      dispatch({ type: FETCH_LOG_IN_ERROR, payload: err.response.data.message })
    })
}

export const signUp = (userInfo, done) => dispatch => {
  dispatch({ type: START_SIGNUP })
  Axios.post(`https://spotify1-pt-bw.herokuapp.com/api/auth/signup`, userInfo)
    .then(res => {
      localStorage.setItem('token', res.data.token)
      dispatch({ type: SIGNUP_SUCCESS, payload: res.data })
        .then(done())
    })
    .catch(err => {
      debugger
      console.log(err)
      dispatch({ type: SIGNUP_FAILURE, payload: err.response.data.message })
    })
}