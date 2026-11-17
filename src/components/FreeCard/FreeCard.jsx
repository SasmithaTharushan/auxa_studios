import { Link } from 'react-router-dom'
import '../MovieCard/MovieCard.css'
import { archiveThumb } from '../../data/freeMovies'

// Card for a free full-length movie. Reuses the MovieCard styles.
const FreeCard = ({ movie, variant = 'row' }) => (
  <div className={`movie-card ${variant}`}>
    <Link to={`/free/${encodeURIComponent(movie.id)}`} className='movie-card-link' aria-label={`Watch ${movie.title} free`}>
      <img src={archiveThumb(movie.id)} alt={movie.title} loading='lazy' />
      <div className='movie-card-overlay'>
        <p className='movie-card-title'>{movie.title}</p>
        <p className='movie-card-meta'>
          <span className='free-badge'>FREE</span>
          {movie.year && <span>{movie.year}</span>}
        </p>
      </div>
    </Link>
  </div>
)

export default FreeCard
