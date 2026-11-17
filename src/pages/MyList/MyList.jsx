import { Link } from 'react-router-dom'
import NavBar from '../../components/NavBar/Navbar'
import Footer from '../../components/Footer/Footer'
import MovieCard from '../../components/MovieCard/MovieCard'
import '../../components/PagedGrid/PagedGrid.css'
import { useList } from '../../context/ListContext'

const MyList = () => {
  const { items } = useList()

  return (
    <div className='page'>
      <NavBar />
      <main className='page-main'>
        <h1 className='page-title'>My List</h1>
        {items.length === 0 ? (
          <div className='empty-state'>
            <h2>Your list is empty</h2>
            <p>Tap the + on any movie to save it here.</p>
            <Link to='/browse' className='btn btn-accent'>Browse movies</Link>
          </div>
        ) : (
          <div className='paged-grid'>
            {items.map((m) => <MovieCard key={m.id} movie={m} variant='grid' />)}
          </div>
        )}
      </main>
      <Footer />
    </div>
  )
}

export default MyList
