import { useParams, useNavigate, Navigate } from 'react-router-dom'
import '../Player/Player.css'
import useFreeMovies from '../../hooks/useFreeMovies'
import { FREE_IDS, archiveEmbed } from '../../data/freeMovies'
import { ChevronLeft } from '../../components/Icons/Icons'

const FreePlayer = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { movies, loading } = useFreeMovies()

  if (!FREE_IDS.includes(id)) return <Navigate to='/free' replace />

  const movie = movies.find((m) => m.id === id)
  const back = () => (window.history.length > 1 ? navigate(-1) : navigate('/free'))

  return (
    <div className='player'>
      <button type='button' className='player-back' onClick={back}><ChevronLeft /> Back</button>
      <div className='player-stage'>
        <iframe
          src={archiveEmbed(id)}
          title={movie?.title || 'Free movie'}
          allow='fullscreen; autoplay'
          allowFullScreen
        />
      </div>
      <div className='player-info free-info'>
        <div>
          <h1>{movie ? `${movie.title}${movie.year ? ` (${movie.year})` : ''}` : loading ? 'Loading…' : id}</h1>
          {movie?.description && <p className='free-desc'>{movie.description.slice(0, 500)}{movie.description.length > 500 ? '…' : ''}</p>}
          <p className='free-source'>Streamed from the Internet Archive</p>
        </div>
      </div>
    </div>
  )
}

export default FreePlayer
