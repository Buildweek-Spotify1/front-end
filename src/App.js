import React, { useEffect } from 'react';
import './App.css';
import { Route, useLocation } from 'react-router-dom'

//Redux Imports
import { useDispatch, useSelector } from 'react-redux'
import { resetError } from './redux/actions';

//component imports
import UserPage from './components/songs/UserPage';
import SignUp from './components/signup/SignUp'
import PrivateRoute from './utilities/PrivateRoute'
import Header from './components/header/Header'
import SignIn from './components/signin/SignIn'
import Home from './components/marketing/Home';
import About from './components/marketing/About';
import { default as Loading } from 'react-spinners/ScaleLoader'

//styling
import { css } from '@emotion/core'
//styling override for loading component
const override = css`
  position: absolute;
  left: 50%;
  top: 50%;
  z-index: 100;
`;

function App() {
  //hooks
  const location = useLocation()
  const dispatch = useDispatch()
  const isFetching = useSelector(state => state.isFetching)

  /**
   * resets the error any time the location changes
   */
  useEffect(() => {
    dispatch(resetError())
  }, [location, dispatch])

  return (

    <div>
      <Loading css={override} loading={isFetching} />
      <Route render={({ location }) =>
        location.pathname !== '/' && location.pathname !== '/about' ? (
          <Header />) : null
      } />
      <Route path="/signin">
        <SignIn />
      </Route>
      <Route exact path='/'>
        <Home />
      </Route>
      <Route path='/about'>
        <About />
      </Route>
      <div className="App">
        <Route exact path="/signup">
          <SignUp />
        </Route>

        <PrivateRoute path='/user' component={UserPage} />
      </div>
    </div>
  );
}

export default App;
