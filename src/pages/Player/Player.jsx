import { useParams, useNavigate, Link } from 'react-router-dom'
import './Player.css'
import useTmdb from '../../hooks/useTmdb'
import { ChevronLeft } from '../../components/Icons/Icons'

const Player = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { data, loading, error } = useTmdb(`/movie/${id}?language=en-US&append_to_response=videos`)

  // Prefer an official YouTube trailer, fall back to any YouTube video
  const videos = (data?.videos?.results || []).filter((v) => v.site === 'YouTube')
  const video = videos.find((v) => v.type === 'Trailer') || videos[0]

  const back = () => (window.history.length > 1 ? navigate(-1) : navigate('/'))

  return (
    <div className='player'>
      <button type='button' className='player-back' onClick={back}><ChevronLeft /> Back</button>
      <div className='player-stage'>
        {loading && <div className='spinner' />}
        {!loading && video && (
          <iframe
            src={`https://www.youtube.com/embed/${video.key}?autoplay=1&rel=0`}
            title={`${data.title} trailer`}
            allow='autoplay; encrypted-media; picture-in-picture; fullscreen'
            allowFullScreen
          />
        )}
        {!loading && !video && (
          <div className='player-empty'>
            <h2>{error ? 'Could not load this trailer' : 'No trailer available'}</h2>
            <p>{error ? 'Please check your connection and try again.' : 'We could not find a trailer for this movie.'}</p>
          </div>
        )}
      </div>
      {data && (
        <div className='player-info'>
          <div>
            <h1>{data.title}</h1>
            <p>{video ? `${video.name} · ${video.type}` : ''}</p>
          </div>
          <Link to={`/movie/${id}`} className='btn btn-ghost'>Movie details</Link>
        </div>
      )}
    </div>
  )
}

export default Player
