import React, { useEffect } from 'react';
import './App.css';
import { Route, useLocation } from 'react-router-dom'

//Redux Imports
import { Provider, useDispatch } from 'react-redux'

//component imports
import UserPage from './components/songs/UserPage';
import SignUp from './components/signup/SignUp'
import PrivateRoute from './utilities/PrivateRoute'
import Header from './components/header/Header'
import SignIn from './components/signin/SignIn'
import { resetError } from './redux/actions';
import Home from './components/marketing/Home';
import About from './components/marketing/About';

console.log(process.env.CLIENT_ID)


function App() {
  const location = useLocation()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(resetError())
  }, [location])

  return (

    <div>
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
