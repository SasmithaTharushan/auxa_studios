import { useRef } from 'react'
import { Link } from 'react-router-dom'
import '../TitleCards/TitleCards.css'
import useFreeMovies from '../../hooks/useFreeMovies'
import FreeCard from '../FreeCard/FreeCard'
import { ChevronLeft, ChevronRight } from '../Icons/Icons'

// Home-page row of free full movies
const FreeRow = ({ id }) => {
  const listRef = useRef()
  const { movies, loading, error, reload } = useFreeMovies()

  const scroll = (dir) => {
    const el = listRef.current
    if (el) el.scrollBy({ left: dir * el.clientWidth * 0.8, behavior: 'smooth' })
  }

  return (
    <section className='title-cards' id={id}>
      <h2>
        Free Full Movies <Link to='/free' className='row-link'>See all</Link>
      </h2>
      {error ? (
        <div className='row-error'>
          <p>We couldn&apos;t load the free movies.</p>
          <button type='button' className='btn btn-ghost' onClick={reload}>Try again</button>
        </div>
      ) : (
        <div className='row-wrap'>
          <button type='button' className='row-arrow left' aria-label='Scroll left' onClick={() => scroll(-1)}><ChevronLeft /></button>
          <div className='card-list' ref={listRef}>
            {loading
              ? Array.from({ length: 8 }, (_, i) => <div key={i} className='skeleton card-skeleton' />)
              : movies.map((m) => <FreeCard key={m.id} movie={m} />)}
          </div>
          <button type='button' className='row-arrow right' aria-label='Scroll right' onClick={() => scroll(1)}><ChevronRight /></button>
        </div>
      )}
    </section>
  )
}

export default FreeRow
