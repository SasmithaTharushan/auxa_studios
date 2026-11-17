import { Link, useNavigate } from 'react-router-dom'
import './Footer.css'
import { useAuth } from '../../context/AuthContext'

const Footer = () => {
  const { signOut } = useAuth()
  const navigate = useNavigate()

  return (
    <footer className='footer'>
      <div className='footer-links'>
        <Link to='/'>Home</Link>
        <Link to='/browse'>Browse</Link>
        <Link to='/search'>Search</Link>
        <Link to='/my-list'>My List</Link>
        <button type='button' onClick={() => { signOut(); navigate('/login') }}>Sign Out</button>
      </div>
      <p className='footer-credit'>
        Movie data and images provided by{' '}
        <a href='https://www.themoviedb.org' target='_blank' rel='noopener noreferrer'>TMDB</a>. This product uses the
        TMDB API but is not endorsed or certified by TMDB.
      </p>
      <p className='copyright-text'>© 2018-2026 Auxa, Inc.</p>
    </footer>
  )
}

export default Footer
