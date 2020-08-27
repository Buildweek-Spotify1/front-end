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

console.log(process.env.CLIENT_ID)


function App() {
  const location = useLocation()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(resetError())
  }, [location])

  return (

    <div>
      <Header />
      <Route path="/signin">
        <SignIn />
      </Route>
      <div className="App">
        <Route exact path="/">
          <SignUp />
        </Route>

        <PrivateRoute path='/user' component={UserPage} />
      </div>
    </div>
  );
}

export default App;
