import React from 'react'
import { useNavigate } from 'react-router-dom'
import { tmdbFetch } from '../../tmdb'
import './Home.css'
import NavBar from '../../components/NavBar/Navbar'
import hero_banner from '../../assets/hero_banner.jpg'
import hero_title from '../../assets/hero_title.png'
import play_icon from '../../assets/play_icon.png'
import info_icon from '../../assets/info_icon.png'
import TitleCards from '../../components/TitleCards/TitleCards'
import Footer from '../../components/Footer/Footer'

const Home = () => {
  const navigate = useNavigate()
  // Play opens the trailer of today's most popular movie
  const playTop = () =>
    tmdbFetch('/movie/popular?language=en-US&page=1')
      .then((res) => res.results?.[0] && navigate(`/player/${res.results[0].id}`))
      .catch((err) => console.error(err))

  return (
    <div className='home'>
      <NavBar />
      <div className="hero">
        <img src={hero_banner} alt="" className='banner-img' />
        <div className="hero-caption">
          <img src={hero_title} alt="" className='caption-img' />
          <p>Discovering his ties to a secret ancient order, a young man living in modern Istanbul embarks on a quest to save the city from an immortal enemy</p>
          <div className="hero-btns">
            <button className='btn' onClick={playTop}><img src={play_icon} alt="" />Play</button>
            <button className='btn dark-btn' onClick={() => document.querySelector('#popular')?.scrollIntoView({ behavior: 'smooth', block: 'center' })}><img src={info_icon} alt="" />More Info</button>
          </div>
        <TitleCards/>
        </div>
      </div>
      <div className="more-cards">
      <TitleCards title={"Blockbuster Movies"} category={"top_rated"} id="blockbuster"/>
      <TitleCards title={"Only on Auxa Studios"} category={"popular"} id="popular"/>
      <TitleCards title={"Upcoming"} category={"upcoming"} id="upcoming"/>
      <TitleCards title={"Top Picks for You"} category={"now_playing"} id="picks"/>
      </div>
      <Footer/>
    </div>
  )
}

export default Home