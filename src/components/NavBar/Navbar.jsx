import { useEffect, useRef, useState } from 'react'
import { NavLink, Link, useNavigate, useLocation } from 'react-router-dom'
import './Navbar.css'
import logo from '../../assets/logo.png'
import { useAuth } from '../../context/AuthContext'
import { useList } from '../../context/ListContext'
import { SearchIcon, MenuIcon, CloseIcon } from '../Icons/Icons'

const Navbar = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { user, signOut } = useAuth()
  const { items } = useList()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(location.pathname === '/search')
  const [query, setQuery] = useState(() => new URLSearchParams(location.search).get('q') || '')
  const searchRef = useRef()
  const profileRef = useRef()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY >= 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close the profile menu on outside click / Escape
  useEffect(() => {
    const onClick = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) setProfileOpen(false)
    }
    const onKey = (e) => {
      if (e.key === 'Escape') {
        setProfileOpen(false)
        setMenuOpen(false)
      }
    }
    document.addEventListener('mousedown', onClick)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onClick)
      document.removeEventListener('keydown', onKey)
    }
  }, [])

  // Live search: update the /search page as the user types
  const onSearch = (value) => {
    setQuery(value)
    const q = value.trim()
    if (q) navigate(`/search?q=${encodeURIComponent(q)}`, { replace: location.pathname === '/search' })
    else if (location.pathname === '/search') navigate('/')
  }

  const toggleSearch = () => {
    setSearchOpen((o) => !o)
    setTimeout(() => searchRef.current?.focus(), 50)
  }

  const handleSignOut = () => {
    signOut()
    navigate('/login')
  }

  const initial = (user?.name || '?').charAt(0).toUpperCase()
  const links = [
    ['/', 'Home'],
    ['/browse', 'Browse'],
    ['/my-list', 'My List'],
  ]

  return (
    <header className={`navbar ${scrolled || menuOpen ? 'nav-dark' : ''}`}>
      <div className='navbar-left'>
        <button type='button' className='nav-burger' aria-label='Menu' aria-expanded={menuOpen} onClick={() => setMenuOpen((o) => !o)}>
          {menuOpen ? <CloseIcon /> : <MenuIcon />}
        </button>
        <Link to='/' className='nav-logo'><img src={logo} alt='Auxa Studios' /></Link>
        <nav className={`nav-links ${menuOpen ? 'open' : ''}`}>
          {links.map(([to, label]) => (
            <NavLink key={to} to={to} end={to === '/'} onClick={() => setMenuOpen(false)}>
              {label}
              {to === '/my-list' && items.length > 0 && <span className='nav-badge'>{items.length}</span>}
            </NavLink>
          ))}
        </nav>
      </div>
      <div className='navbar-right'>
        <div className={`nav-search ${searchOpen ? 'open' : ''}`}>
          <button type='button' aria-label='Search' onClick={toggleSearch}><SearchIcon /></button>
          <input
            ref={searchRef}
            type='search'
            value={query}
            placeholder='Search movies…'
            aria-label='Search movies'
            onChange={(e) => onSearch(e.target.value)}
          />
        </div>
        <div className='navbar-profile' ref={profileRef}>
          <button type='button' className='avatar' aria-haspopup='menu' aria-expanded={profileOpen} onClick={() => setProfileOpen((o) => !o)}>
            {initial}
          </button>
          {profileOpen && (
            <div className='dropdown' role='menu'>
              <div className='dropdown-user'>
                <strong>{user?.name}</strong>
                <span>{user?.email === 'guest@auxa.local' ? 'Guest session' : user?.email}</span>
              </div>
              <Link to='/my-list' role='menuitem' onClick={() => setProfileOpen(false)}>My List</Link>
              <button type='button' role='menuitem' onClick={handleSignOut}>Sign Out</button>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}

export default Navbar
