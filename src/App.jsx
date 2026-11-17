import { useEffect } from 'react'
import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import Home from './pages/Home/Home'
import Login from './pages/Login/Login'
import Player from './pages/Player/Player'
import Details from './pages/Details/Details'
import Search from './pages/Search/Search'
import Browse from './pages/Browse/Browse'
import MyList from './pages/MyList/MyList'
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute'

const ScrollToTop = () => {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

const App = () => {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route element={<ProtectedRoute />}>
          <Route path='/' element={<Home />} />
          <Route path='/browse' element={<Browse />} />
          <Route path='/search' element={<Search />} />
          <Route path='/my-list' element={<MyList />} />
          <Route path='/movie/:id' element={<Details />} />
          <Route path='/player/:id' element={<Player />} />
        </Route>
        <Route path='*' element={<Navigate to='/' replace />} />
      </Routes>
    </>
  )
}

export default App
