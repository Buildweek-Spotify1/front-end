import React, { useState, useEffect, } from 'react'
import { AppBar, Container, Toolbar, Typography, Button } from '@material-ui/core'
import { useHistory, useLocation } from 'react-router'

const Header = (props) => {
  //hooks
  const history = useHistory()
  const location = useLocation()

  //component state
  const [loggedIn, setLoggedIn] = useState(localStorage.getItem('token') !== null)

  /**
   * changes buttons on header based on if token exists
   */
  useEffect(() => {
    setLoggedIn(localStorage.getItem('token') !== null)
  }, [location])


  return (
    <AppBar position="static" color="primary">
      <Container maxWidth="md">
        <Toolbar>
          <Typography style={{ flexGrow: 1 }} variant="h3" color="inherit">
            Spotify Song Suggestor
            </Typography>
          {loggedIn ?
            <Button onClick={() => {
              localStorage.removeItem('token')
              setLoggedIn(false)
              history.push('/')
            }}>Sign Out</Button>
            :
            <>
              <Button onClick={() => history.push('/signup')}>Sign Up</Button>
              <Button onClick={() => history.push('/signin')}>Log In</Button>
            </>}
        </Toolbar>
      </Container>
    </AppBar>
  )
}

export default Header