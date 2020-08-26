import React, { useState } from 'react'
import { AppBar, Container, Toolbar, Typography, Button } from '@material-ui/core'
import { useHistory } from 'react-router'

const Header = () => {
  const history = useHistory()
  const [loggedIn, setLoggedIn] = useState(localStorage.getItem('token') !== null)
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
              <Button onClick={() => history.push('/sign-up')}>Sign Up</Button>
              <Button onClick={() => history.push('/')}>Log In</Button>
            </>}
        </Toolbar>
      </Container>
    </AppBar>
  )
}

export default Header