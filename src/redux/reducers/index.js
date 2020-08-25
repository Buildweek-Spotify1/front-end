import { FETCH_LOG_IN, FETCH_LOG_IN_SUCCESS, FETCH_LOG_IN_ERROR, START_SIGNUP, SIGNUP_SUCCESS, SIGNUP_FAILURE } from '../actions'


export const init = {
  user: {
    firstName: '',
    lastName: '',
    id: -1
  },
  songs: [
    {
      title: 'A Favor House Atlantic',
      length: '',
      artist: 'Coheed and Cambria',
      album: '',
      link: '',
      albumCover: 'https://images-na.ssl-images-amazon.com/images/I/618ZR4RtdlL._SX425_.jpg',
    },
    {
      title: 'Blood Red Summer',
      length: '',
      artist: 'Coheed and Cambria',
      album: '',
      link: '',
      albumCover: 'https://images-na.ssl-images-amazon.com/images/I/618ZR4RtdlL._SX425_.jpg',
    },
    {
      title: 'In Keeping Secrets of Silent Earth: 3',
      length: '',
      artist: 'Coheed and Cambria',
      album: '',
      link: '',
      albumCover: 'https://images-na.ssl-images-amazon.com/images/I/618ZR4RtdlL._SX425_.jpg',
    },
    {
      title: 'Unheavenly Creatures',
      length: '',
      artist: 'Coheed and Cambria',
      album: '',
      link: '',
      albumCover: 'https://images-na.ssl-images-amazon.com/images/I/71nGsoG0kiL._SL1425_.jpg',
    },
    {
      title: 'Junesong Provision',
      length: '',
      artist: 'Coheed and Cambria',
      album: '',
      link: '',
      albumCover: 'https://images-na.ssl-images-amazon.com/images/I/91hTK3xf2vL._SL1500_.jpg',
    },
    {
      title: 'The Island',
      length: '',
      artist: 'Coheed and Cambria',
      album: '',
      link: '',
      albumCover: 'https://images-na.ssl-images-amazon.com/images/I/81RrOkr5cvL._SL1425_.jpg',
    },
  ],
  token: localStorage.getItem('token'),
  isFetching: false,
  error: '',
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
    default:
      return state;
  }
}