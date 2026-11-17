import { Link, useNavigate } from 'react-router-dom'
import './MovieCard.css'
import { img, year } from '../../tmdb'
import { useList } from '../../context/ListContext'
import { PlayIcon, PlusIcon, CheckIcon, StarIcon } from '../Icons/Icons'

// variant "row" = wide backdrop card; "grid" = tall poster card
const MovieCard = ({ movie, variant = 'row' }) => {
  const { has, toggle } = useList()
  const navigate = useNavigate()
  const title = movie.title || movie.original_title
  const src = variant === 'row' ? img(movie.backdrop_path || movie.poster_path, 'w500') : img(movie.poster_path || movie.backdrop_path, 'w342')
  const inList = has(movie.id)

  return (
    <div className={`movie-card ${variant}`}>
      <Link to={`/movie/${movie.id}`} className='movie-card-link' aria-label={title}>
        {src ? <img src={src} alt={title} loading='lazy' /> : <div className='movie-card-empty'>{title}</div>}
        <div className='movie-card-overlay'>
          <p className='movie-card-title'>{title}</p>
          <p className='movie-card-meta'>
            {movie.vote_average > 0 && (
              <span className='rating'><StarIcon width={13} height={13} /> {movie.vote_average.toFixed(1)}</span>
            )}
            {year(movie.release_date) && <span>{year(movie.release_date)}</span>}
          </p>
        </div>
      </Link>
      <div className='movie-card-actions'>
        <button type='button' title='Play trailer' aria-label={`Play ${title}`} onClick={() => navigate(`/player/${movie.id}`)}>
          <PlayIcon width={14} height={14} />
        </button>
        <button
          type='button'
          title={inList ? 'Remove from My List' : 'Add to My List'}
          aria-label={inList ? `Remove ${title} from My List` : `Add ${title} to My List`}
          aria-pressed={inList}
          onClick={() => toggle(movie)}
        >
          {inList ? <CheckIcon width={14} height={14} /> : <PlusIcon width={14} height={14} />}
        </button>
      </div>
    </div>
  )
}

export default MovieCard
