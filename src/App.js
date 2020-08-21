import React from 'react';
import './App.css';


//Redux Imports
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import { SongReducer } from './redux/reducers';
import thunk from 'redux-thunk'

//component imports
import UserPage from './components/songs/UserPage';
import SignUp from "./components/signup/SignUp"

const store = createStore(SongReducer, applyMiddleware(thunk))

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        Spotify Songs
        <SignUp />
      </div>
      <UserPage />
    </Provider>
  );
}

export default App;
