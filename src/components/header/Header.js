import React from 'react'
import { AppBar, Container, Toolbar, Typography } from '@material-ui/core'

const Header = () => {
  return (
      <AppBar position="static" color="primary">
        <Container maxWidth="md">
          <Toolbar>
            <Typography variant="h3" color="inherit">
              Spotify Song Suggestor
            </Typography>
          </Toolbar>
        </Container>
      </AppBar>
    )
}

export default Header