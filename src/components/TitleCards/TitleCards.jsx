import { useRef } from 'react'
import './TitleCards.css'
import useTmdb from '../../hooks/useTmdb'
import MovieCard from '../MovieCard/MovieCard'
import { ChevronLeft, ChevronRight } from '../Icons/Icons'

// A horizontal row of movies. Give either a TMDB movie `category`
// (now_playing, popular, ...) or a full `path` to fetch from.
const TitleCards = ({ title, category, path, id, movies }) => {
  const listRef = useRef()
  const url = movies ? null : path || `/movie/${category || 'now_playing'}?language=en-US&page=1`
  const { data, loading, error, reload } = useTmdb(url)

  const items = (movies || data?.results || []).filter((m) => m.backdrop_path || m.poster_path)

  const scroll = (dir) => {
    const el = listRef.current
    if (el) el.scrollBy({ left: dir * el.clientWidth * 0.8, behavior: 'smooth' })
  }

  return (
    <section className='title-cards' id={id}>
      <h2>{title || 'Popular on Auxa Studios'}</h2>
      {error ? (
        <div className='row-error'>
          <p>We couldn&apos;t load this row.</p>
          <button type='button' className='btn btn-ghost' onClick={reload}>Try again</button>
        </div>
      ) : (
        <div className='row-wrap'>
          <button type='button' className='row-arrow left' aria-label='Scroll left' onClick={() => scroll(-1)}>
            <ChevronLeft />
          </button>
          <div className='card-list' ref={listRef}>
            {loading
              ? Array.from({ length: 8 }, (_, i) => <div key={i} className='skeleton card-skeleton' />)
              : items.map((m) => <MovieCard key={m.id} movie={m} />)}
          </div>
          <button type='button' className='row-arrow right' aria-label='Scroll right' onClick={() => scroll(1)}>
            <ChevronRight />
          </button>
        </div>
      )}
    </section>
  )
}

export default TitleCards
