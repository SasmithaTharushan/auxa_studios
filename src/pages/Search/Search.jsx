import { useSearchParams } from 'react-router-dom'
import NavBar from '../../components/NavBar/Navbar'
import Footer from '../../components/Footer/Footer'
import PagedGrid from '../../components/PagedGrid/PagedGrid'

const Search = () => {
  const [params] = useSearchParams()
  const q = (params.get('q') || '').trim()

  return (
    <div className='page'>
      <NavBar />
      <main className='page-main'>
        {q ? (
          <>
            <h1 className='page-title'>Results for &ldquo;{q}&rdquo;</h1>
            <PagedGrid
              key={q}
              basePath={`/search/movie?query=${encodeURIComponent(q)}&include_adult=false&language=en-US`}
              emptyText={`No movies match “${q}”`}
            />
          </>
        ) : (
          <div className='empty-state'>
            <h2>Search for a movie</h2>
            <p>Type a title in the search box above.</p>
          </div>
        )}
      </main>
      <Footer />
    </div>
  )
}

export default Search
