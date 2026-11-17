import NavBar from '../../components/NavBar/Navbar'
import Footer from '../../components/Footer/Footer'
import FreeCard from '../../components/FreeCard/FreeCard'
import useFreeMovies from '../../hooks/useFreeMovies'
import '../../components/PagedGrid/PagedGrid.css'

const Free = () => {
  const { movies, loading, error, reload } = useFreeMovies()

  return (
    <div className='page'>
      <NavBar />
      <main className='page-main'>
        <h1 className='page-title'>Free Full Movies</h1>
        <p className='page-sub'>Classic films you can watch from start to finish, free. Streamed from the Internet Archive.</p>
        {error ? (
          <div className='empty-state'>
            <h2>Could not load movies</h2>
            <p>Check your connection and try again.</p>
            <button type='button' className='btn btn-accent' onClick={reload}>Try again</button>
          </div>
        ) : (
          <div className='paged-grid free-grid'>
            {loading
              ? Array.from({ length: 12 }, (_, i) => <div key={i} className='skeleton grid-skeleton' />)
              : movies.map((m) => <FreeCard key={m.id} movie={m} variant='grid' />)}
          </div>
        )}
      </main>
      <Footer />
    </div>
  )
}

export default Free
