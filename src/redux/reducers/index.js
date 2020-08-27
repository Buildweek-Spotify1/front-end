import { FETCH_LOG_IN, FETCH_LOG_IN_SUCCESS, FETCH_LOG_IN_ERROR, START_SIGNUP, SIGNUP_SUCCESS, SIGNUP_FAILURE, ADD_SONG_TO_PLAYLIST, REMOVE_SONG_FROM_PLAYLIST, GET_PLAYLISTS, GET_PLAYLISTS_SUCCESS, GET_PLAYLISTS_FAILURE, SAVE_PLAYLIST, SAVE_PLAYLIST_SUCCESS, SAVE_PLAYLIST_FAILURE, UPDATE_PLAYLIST_NAME, UPDATE_PLAYLIST_NAME_SUCCESS, DELETE_PLAYLIST, DELETE_PLAYLIST_SUCCESS, DELETE_PLAYLIST_FAILURE, UPDATE_PLAYLIST_NAME_FAILURE, START_SEARCH, SEARCH_SUCCESS } from '../actions'


export const init = {
  user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : {},
  searchResults: [],
  songs: [
    {
      title: 'A Favor House Atlantic',
      length: '',
      artist: 'Coheed and Cambria',
      album: 'In Keeping Secrets of Silent Earth: 3',
      link: '',
      id: 1,
      albumCover: 'https://images-na.ssl-images-amazon.com/images/I/618ZR4RtdlL._SX425_.jpg',
    },
    {
      title: 'Blood Red Summer',
      length: '',
      artist: 'Coheed and Cambria',
      album: '',
      link: '',
      id: 2,
      albumCover: 'https://images-na.ssl-images-amazon.com/images/I/618ZR4RtdlL._SX425_.jpg',
    },
    {
      title: 'In Keeping Secrets of Silent Earth: 3',
      length: '',
      artist: 'Coheed and Cambria',
      album: 'In Keeping Secrets of Silent Earth: 3',
      link: '',
      id: 3,
      albumCover: 'https://images-na.ssl-images-amazon.com/images/I/618ZR4RtdlL._SX425_.jpg',
    },
    {
      title: 'Unheavenly Creatures',
      length: '',
      artist: 'Coheed and Cambria',
      album: 'Vaxis I: The Unheavenly Creatures',
      link: '',
      id: 4,
      albumCover: 'https://images-na.ssl-images-amazon.com/images/I/71nGsoG0kiL._SL1425_.jpg',
    },
    {
      title: 'Junesong Provision',
      length: '',
      artist: 'Coheed and Cambria',
      album: 'Second Stage Turbine Blade',
      link: '',
      id: 5,
      albumCover: 'https://images-na.ssl-images-amazon.com/images/I/91hTK3xf2vL._SL1500_.jpg',
    },
    {
      title: 'The Island',
      length: '',
      artist: 'Coheed and Cambria',
      album: 'The Color Before the Sun',
      link: '',
      id: 6,
      albumCover: 'https://images-na.ssl-images-amazon.com/images/I/81RrOkr5cvL._SL1425_.jpg',
    },
  ],
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
        songs: [...state.songs, action.payload]
      }
    case REMOVE_SONG_FROM_PLAYLIST:
      return {
        ...state,
        songs: state.songs.filter(song => song.id !== action.payload)
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
        playlists: [...state.playlists, action.payload]
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
    case UPDATE_PLAYLIST_NAME_SUCCESS:
      return {
        ...state,
        isFetching: false,
        playlists: state.playlists.map(list => list.id === action.payload.id ? action.payload : list)
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
    case DELETE_PLAYLIST_SUCCESS:
      return {
        ...state,
        isFetching: false,
        playlists: state.playlists.filter(list => list.id !== action.payload)
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
    default:
      return state;
  }
}