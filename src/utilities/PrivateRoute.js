import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import { useSelector } from 'react-redux'

const PrivateRoute = ({ component: Component, ...rest }) => {
  const token = useSelector(state => state.token)
  return (
    <Route {...rest}
      render={() => {
        return token ? <Component /> : <Redirect to='/' />
      }} />
  )
}

export default PrivateRoute