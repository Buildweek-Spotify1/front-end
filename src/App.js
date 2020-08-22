import React from 'react';
import './App.css';

import { Route } from 'react-router-dom'

//Redux Imports
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import { SongReducer } from './redux/reducers';
import thunk from 'redux-thunk'

//component imports
import UserPage from './components/songs/UserPage';
import SignUp from "./components/signup/SignUp"
import PrivateRoute from './utilities/PrivateRoute'

const store = createStore(SongReducer, applyMiddleware(thunk))

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        Spotify Songs
        <Route exact path='/'>
          <SignUp path="/signup" />
        </Route>
        <PrivateRoute path='/user' component={UserPage} />
      </div>

    </Provider>
  );
}

export default App;
