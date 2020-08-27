import { FETCH_LOG_IN, FETCH_LOG_IN_SUCCESS, FETCH_LOG_IN_ERROR, START_SIGNUP, SIGNUP_SUCCESS, SIGNUP_FAILURE, ADD_SONG_TO_PLAYLIST, REMOVE_SONG_FROM_PLAYLIST, GET_PLAYLISTS, GET_PLAYLISTS_SUCCESS, GET_PLAYLISTS_FAILURE, SAVE_PLAYLIST, SAVE_PLAYLIST_SUCCESS, SAVE_PLAYLIST_FAILURE, UPDATE_PLAYLIST_NAME, UPDATE_PLAYLIST_NAME_SUCCESS, DELETE_PLAYLIST, DELETE_PLAYLIST_SUCCESS, DELETE_PLAYLIST_FAILURE, UPDATE_PLAYLIST_NAME_FAILURE, START_SEARCH, SEARCH_SUCCESS, CHANGE_SELECTED_PLAYLIST, RESET_ERROR } from '../actions'


export const init = {
  user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : {},
  searchResults: [],
  selectedPlaylist: {
    playlist_name: 'New Playlist',
    songs: [],
    id: -1
  },
  token: localStorage.getItem('token'),
  isFetching: false,
  error: '',
  playlists: [{
    id: 1,
    playlist_name: 'some_playlist_name',
    user_id: 1
  }]
}



export const SongReducer = (state = init, action) => {
  switch (action.type) {
    case FETCH_LOG_IN:
      return {
        ...state,
        isFetching: true,
        error: ''
      }
    case FETCH_LOG_IN_SUCCESS:
      return {
        ...state,
        token: action.payload,
        isFetching: false,
      }
    case FETCH_LOG_IN_ERROR:
      return {
        ...state,
        error: action.payload,
        isFetching: false,
      }
    case START_SIGNUP:
      return {
        ...state,
        isFetching: true,
        error: ''
      }
    case SIGNUP_SUCCESS: {
      return {
        ...state,
        token: action.payload.token,
        user: action.payload.createdUser,
        isFetching: false,
      }
    }
    case SIGNUP_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.payload,
      }
    case ADD_SONG_TO_PLAYLIST:
      return {
        ...state,
        selectedPlaylist: { ...state.selectedPlaylist, songs: [...state.selectedPlaylist.songs, action.payload] }
      }
    case REMOVE_SONG_FROM_PLAYLIST:
      return {
        ...state,
        selectedPlaylist: { ...state.selectedPlaylist, songs: state.selectedPlaylist.songs.filter(song => song.id !== action.payload) }
      }
    case GET_PLAYLISTS:
      return {
        ...state,
        error: '',
        isFetching: true
      }
    case GET_PLAYLISTS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        playlists: action.payload
      }
    case GET_PLAYLISTS_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.payload
      }
    case SAVE_PLAYLIST:
      return {
        ...state,
        isFetching: true,
        error: ''
      }
    case SAVE_PLAYLIST_SUCCESS:
      return {
        ...state,
        isFetching: false,
        playlists: [...state.playlists, action.payload],
        selectedPlaylist: action.payload
      }
    case SAVE_PLAYLIST_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.payload
      }
    case UPDATE_PLAYLIST_NAME:
      return {
        ...state,
        isFetching: true,
        error: ''
      }
    case UPDATE_PLAYLIST_NAME_SUCCESS: {
      return {
        ...state,
        isFetching: false,
        playlists: state.playlists.map(list => list.id === action.payload.id ? action.payload : list),
        selectedPlaylist: action.payload
      }
    }
    case UPDATE_PLAYLIST_NAME_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.payload
      }
    case DELETE_PLAYLIST:
      return {
        ...state,
        isFetching: true,
        error: ''
      }
    case DELETE_PLAYLIST_SUCCESS: {
      debugger
      return {
        ...state,
        isFetching: false,
        playlists: state.playlists.filter(list => list.id !== action.payload),
        selectedPlaylist: state.playlists.filter(list => list.id !== action.payload)[0]
      }
    }
    case DELETE_PLAYLIST_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.payload
      }
    case START_SEARCH:
      return {
        ...state,
        isFetching: true,
        error: ''
      }
    case SEARCH_SUCCESS:
      return {
        ...state,
        isFetching: false,
        searchResults: action.payload
      }
    case CHANGE_SELECTED_PLAYLIST:
      return {
        ...state,
        selectedPlaylist: state.playlists.filter(list => list.id === action.payload)[0],
        playlists: state.playlists.map(list => list.id === state.selectedPlaylist.id ? state.selectedPlaylist : list)
      }
    case RESET_ERROR:
      return {
        ...state,
        error: ''
      }
    default:
      return state;
  }
}