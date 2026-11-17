import React, { useEffect, useRef } from 'react'
import './Navbar.css'
import logo from '../../assets/logo.png'
import search_icon from '../../assets/search_icon.svg'
import bell_icon from '../../assets/bell_icon.svg'
import profile_img from '../../assets/profile_img.png'
import caret_img from '../../assets/caret_icon.svg'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {
  const navigate = useNavigate()
  const navRef = useRef()

  // Darken the navbar once the page is scrolled
  useEffect(() => {
    const onScroll = () => {
      if (!navRef.current) return
      navRef.current.classList.toggle('nav-dark', window.scrollY >= 80)
    }
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollTo = (selector) => () => {
    const el = document.querySelector(selector)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' })
    else window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div ref={navRef} className='navbar'>
      <div className='navbar-left'>
        <img src={logo} alt='Auxa Studios' onClick={() => navigate('/')} style={{ cursor: 'pointer' }} />
        <ul>
          <li onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>Home</li>
          <li onClick={scrollTo('#blockbuster')}>Blockbuster</li>
          <li onClick={scrollTo('#popular')}>Popular</li>
          <li onClick={scrollTo('#upcoming')}>Upcoming</li>
          <li onClick={scrollTo('#picks')}>Top Picks</li>
        </ul>
      </div>
      <div className='navbar-right'>
        <img src={search_icon} alt='Search' className='icons' />
        <p>Children</p>
        <img src={bell_icon} alt='Notifications' className='icons' />
        <div className='navbar-profile'>
          <img src={profile_img} alt='Profile' className='profile' />
          <img src={caret_img} alt='' />
          <div className='dropdown'>
            <p onClick={() => navigate('/login')}>Sign Out</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Navbar
