import React from 'react'
import { Redirect } from 'react-router-dom'

const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    <Route {...rest}
      render={() => {
        return localStorage.getItem('spotifySongsToken') ? <Component /> : <Redirect to='/' />
      }} />
  )
}

export default PrivateRoute