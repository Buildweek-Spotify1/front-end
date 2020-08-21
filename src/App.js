import React from 'react';
import './App.css';
import SignUp from "./components/SignUp"
import { Route } from 'react-router-dom';


//Redux Imports
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { SongReducer } from './redux/reducers';
import UserPage from './components/songs/UserPage';

const store = createStore(SongReducer)

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        Spotify Songs
        <Route>
          <SignUp path="/signup"/>
        </Route>
      </div>
      <UserPage />
    </Provider>
  );
}

export default App;
