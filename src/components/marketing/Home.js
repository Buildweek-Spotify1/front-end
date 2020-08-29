import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div className='background'>
      <header>
        <h1 className="title">Spotify Suggester</h1>
        <nav className="nav">
          <div className="links">
            <Link to="/about">About Us</Link>
            <div className="verticalbar"></div>
            <Link to="/signup">Create Account</Link>
            <div className="verticalbar"></div>
            <Link to='/signin'>Sign In</Link>
          </div>
        </nav>
      </header>
      <section className="img">
        <div className="main">
          <h2 className="glow">PLAYLISTS</h2>
        </div>
        <div className="button">
          <Link to="/signup">Create Acount</Link>
        </div>
        <section className="middle">
          <h3 className="features">Features</h3>
          <p>1.Save Songs</p>
          <p>2.Create Playlist</p>
          <p>3.Listen To Music That Matches Your Mood</p>
        </section>
      </section>
      <section className="footer">
        <img src={require("../../img/equalizer-1-1400x300.png")} alt='music level visualizer' />
      </section>
      <div className="copyrite">copyrite 2020</div>
      <div>Site Icon made by <a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
    </div>
  )
}

export default Home