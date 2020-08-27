const { makeStyles } = require("@material-ui/core");

const useStyles = makeStyles(theme => ({
  root: {
    '& > *': {
      margin: theme.spacing(0),
    },
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: 200,
    }
  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    textAlign: 'center',
  },
  songTitle: {
    fontSize: '1.5rem',
    width: '400px',
    overflow: 'hidden',
    whiteSpace: 'nowrap'
  },
  songArtist: {
    fontSize: '.75rem'
  },
  popover: {
    pointerEvents: 'none',
  },
  gridList: {
    width: '100%',
    height: '80vh',
    [theme.breakpoints.down('md')]: {
      height: '100%'
    }
  },
  playlist: {
    [theme.breakpoints.down('md')]: {
      display: 'none'
    }
  },
  mobilePlaylist: {
    [theme.breakpoints.up('lg')]: {
      display: 'none'
    }
  },
  modal: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  songMedia: {
    height: '100%',
    paddingTop: '100%'
  },
  editText: {
    width: '275px'
  },
  editTextFontSize: {
    fontSize: '2.5rem',
    textAlign: 'center'
  },
}))

export default useStyles