import React from 'react'
import { Link } from 'react-router-dom'

const About = () => {
  return (
    <div className='background'>
      <header>
        <div className="logo">
          <h2>
            Spotify Suggester
                </h2>
        </div>
        <div className="top">
          <Link to="/">Home</Link>
        </div>
        <div className="greeting">
          <h1>
            MEET OUR TEAM
            </h1>
          <h2>
            Lambda School Team Members
            </h2>
        </div>
      </header>
      <div className="team">
        <div className="aaron">
          <p className="name">Aaron Maxwes</p>
          <img className="profile" src={require("../../img/Aaron.jpg")} alt="profile" />
          <p className="role">Frontend</p>
          <p className="social-media">github Maxwes13</p>
        </div>
        <div className="allison">
          <p className="name">Allison Usher</p>
          <img className="profile" src={require("../../img/allison.jpg")} alt="profile" />
          <p className="role">Frontend</p>
          <p className="social-media">github allyjay317</p>
        </div>
        <div className="baisali">
          <p className="name">Baisali Sant</p>
          <img className="profile" src={require("../../img/profile-picture.jpg")} alt="profile" />
          <p className="role">Project Lead</p>
          <p className="social-media">github</p>
        </div>
        <div className="danny">
          <p className="name">Danny Haralson</p>
          <img className="profile" src={require("../../img/danny.jpg")} alt="profile" />
          <p className="role">Frontend</p>
          <p className="social-media">github Dharalson89</p>
        </div>
        <div className="dom">
          <p className="name">Dom Garret</p>
          <img className="profile" src={require("../../img/dominique.jpg")} alt="profile" />
          <p className="role">Backend</p>
          <p className="social-media">github Dmnggrrtt</p>
        </div>
        <div className="henry">
          <p className="name">Henry Melendez</p>
          <img className="profile" src={require("../../img/henry.jpg")} alt="profile" />
          <p className="role">DS</p>
          <p className="social-media">github Henrymelendez</p>
        </div>
        <div className="jason">
          <p className="name">Jason Robinson</p>
          <img className="profile" src={require("../../img/jason.jpg")} alt="profile" />
          <p className="role">DS</p>
          <p className="social-media">github Techthumb1</p>
        </div>
        <div className="jen">
          <p className="name">Jen Banks</p>
          <img className="profile" src={require("../../img/jennifer.jpg")} alt="profile" />
          <p className="role">DS</p>
          <p className="social-media">github jenbanks8585</p>
        </div>
        <div className="rowais">
          <p className="name">Rowais Hanna</p>
          <img className="profile" src={require("../../img/rowais.jpg")} alt="profile" />
          <p className="role">DS</p>
          <p className="social-media">github Rowaishanna</p>
        </div>
        <div className="roy">
          <p className="name">Roy Weiss</p>
          <img className="profile" src={require("../../img/roy.jpg")} alt="profile" />
          <p className="role">Web 1</p>
          <p className="social-media">github Roy-Weiss</p>
        </div>
        <div className="eq">
          <img src={require("../../img/equalizer-1-1400x300.png")} alt='equalizer' />
        </div>
      </div>
    </div >
  )
}

export default About