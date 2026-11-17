import { useEffect, useState } from 'react'
import './PagedGrid.css'
import { tmdbFetch } from '../../tmdb'
import MovieCard from '../MovieCard/MovieCard'

// Poster grid with "Load more". `basePath` must already contain a "?" query string.
// Render with key={basePath} so state resets when the query changes.
const PagedGrid = ({ basePath, emptyText = 'No movies found.' }) => {
  const [movies, setMovies] = useState([])
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [status, setStatus] = useState('loading')
  const [attempt, setAttempt] = useState(0)

  useEffect(() => {
    const controller = new AbortController()
    setStatus('loading')
    tmdbFetch(`${basePath}&page=${page}`, controller.signal)
      .then((res) => {
        setMovies((prev) => {
          const seen = new Set(prev.map((m) => m.id))
          return [...prev, ...(res.results || []).filter((m) => !seen.has(m.id))]
        })
        setTotalPages(Math.min(res.total_pages || 1, 500))
        setStatus('done')
      })
      .catch((err) => err.name !== 'AbortError' && setStatus('error'))
    return () => controller.abort()
  }, [basePath, page, attempt])

  const visible = movies.filter((m) => m.poster_path || m.backdrop_path)

  return (
    <>
      {status === 'done' && visible.length === 0 && <div className='empty-state'><h2>{emptyText}</h2></div>}
      <div className='paged-grid'>
        {visible.map((m) => <MovieCard key={m.id} movie={m} variant='grid' />)}
        {status === 'loading' && Array.from({ length: 12 }, (_, i) => <div key={`s${i}`} className='skeleton grid-skeleton' />)}
      </div>
      {status === 'error' && (
        <div className='empty-state'>
          <h2>Something went wrong</h2>
          <p>We couldn&apos;t load movies. Check your connection and try again.</p>
          <button type='button' className='btn btn-accent' onClick={() => setAttempt((a) => a + 1)}>
            Retry
          </button>
        </div>
      )}
      {status === 'done' && page < totalPages && (
        <div className='load-more'>
          <button type='button' className='btn btn-ghost' onClick={() => setPage((p) => p + 1)}>Load more</button>
        </div>
      )}
    </>
  )
}

export default PagedGrid
