import { FETCH_LOG_IN_SUCCESS, SIGNUP_SUCCESS, GET_PLAYLISTS_SUCCESS, SAVE_PLAYLIST_SUCCESS, UPDATE_PLAYLIST_NAME_SUCCESS, DELETE_PLAYLIST_SUCCESS, SEARCH_SUCCESS, CHANGE_SELECTED_PLAYLIST, RESET_ERROR, ADD_SONG_TO_PLAYLIST_SUCCESS, REMOVE_SONG_FROM_PLAYLIST_SUCCESS, START_FETCH, FETCH_FAILED } from '../actions'


export const init = {
  user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : {},
  searchResults: [],
  selectedPlaylist: {
    playlist_name: 'Loading',
    songs: [],
    id: -1
  },
  token: localStorage.getItem('token'),
  isFetching: false,
  error: '',
  playlists: [{
    id: 1,
    playlist_name: 'Loading',
    user_id: 1
  }]
}
export const SongReducer = (state = init, action) => {
  switch (action.type) {
    // display loading, reset error
    case START_FETCH:
      return {
        ...state,
        isFetching: true,
        error: ''
      }
    // display error
    case FETCH_FAILED:
      return {
        ...state,
        error: action.payload,
        isFetching: false,
      }
    // token exists
    case FETCH_LOG_IN_SUCCESS:
      return {
        ...state,
        token: action.payload,
        isFetching: false,
        searchResults: []
      }
    // set token and user, reset search results
    case SIGNUP_SUCCESS: {
      return {
        ...state,
        token: action.payload.token,
        user: action.payload.createdUser,
        isFetching: false,
        searchResults: []
      }
    }
    // add retrieved playlist to array of playlists
    case ADD_SONG_TO_PLAYLIST_SUCCESS:
      {
        return {
          ...state,
          isFetching: false,
          playlists: state.playlists.map(list => list.id === action.payload.id ? action.payload : list),
          selectedPlaylist: action.payload
        }
      }
    // modify playlist object to new one without removed song
    case REMOVE_SONG_FROM_PLAYLIST_SUCCESS:
      return {
        ...state,
        playlists: state.playlists.map(list => list.id === action.payload.id ? action.payload : list),
        selectedPlaylist: action.payload,
        isFetching: false
      }
    // set retrieved playlists to state.playlists
    case GET_PLAYLISTS_SUCCESS: {
      return {
        ...state,
        isFetching: false,
        playlists: action.payload
      }
    }
    // add newly created playlist to state.playlists and set it as the currently active playlist
    case SAVE_PLAYLIST_SUCCESS:
      return {
        ...state,
        isFetching: false,
        playlists: [...state.playlists, action.payload],
        selectedPlaylist: action.payload
      }
    // modify playlist array to rename current playlist object
    case UPDATE_PLAYLIST_NAME_SUCCESS: {
      return {
        ...state,
        isFetching: false,
        playlists: state.playlists.map(list => list.id === action.payload.id ? action.payload : list),
        selectedPlaylist: action.payload
      }
    }
    // remove selected playlist, and switch to a new playlist
    case DELETE_PLAYLIST_SUCCESS: {
      return {
        ...state,
        isFetching: false,
        playlists: state.playlists.filter(list => list.id !== action.payload),
        selectedPlaylist: state.playlists.filter(list => list.id !== action.payload)[0] || { playlist_name: 'No Playlists Found', songs: [], id: -1 }
      }
    }
    // display retrieved search results
    case SEARCH_SUCCESS:
      return {
        ...state,
        isFetching: false,
        searchResults: action.payload
      }
    // change currently selected playlist to specified one, and modify playlist array to ensure data is saved
    case CHANGE_SELECTED_PLAYLIST: {
      return {
        ...state,
        selectedPlaylist: state.playlists.filter(list => list.id === action.payload)[0],
        playlists: state.playlists.map(list => list.id === state.selectedPlaylist.id ? state.selectedPlaylist : list)
      }
    }
    // reset error to an empty string to ensure error does not continue to display across pages
    case RESET_ERROR:
      return {
        ...state,
        error: ''
      }
    default:
      return state;
  }
}