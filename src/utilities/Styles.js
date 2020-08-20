const { makeStyles } = require("@material-ui/core");

const useStyles = makeStyles(theme => ({
  songTitle: {
    fontSize: '1rem',
    width: '200px',
    overflow: 'hidden',
    whiteSpace: 'nowrap'
  },
  songArtist: {
    fontSize: '.5rem'
  },
  popover: {
    pointerEvents: 'none',
  },
  paper: {
    padding: theme.spacing(1),
  },
}))

export default useStyles