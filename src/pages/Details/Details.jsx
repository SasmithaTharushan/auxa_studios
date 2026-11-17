import { useParams, useNavigate, Link } from 'react-router-dom'
import './Details.css'
import NavBar from '../../components/NavBar/Navbar'
import Footer from '../../components/Footer/Footer'
import TitleCards from '../../components/TitleCards/TitleCards'
import useTmdb from '../../hooks/useTmdb'
import { img, year, runtimeText } from '../../tmdb'
import { useList } from '../../context/ListContext'
import { PlayIcon, PlusIcon, CheckIcon, StarIcon } from '../../components/Icons/Icons'

const Details = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { has, toggle } = useList()
  const { data: m, loading, error, reload } = useTmdb(`/movie/${id}?language=en-US&append_to_response=credits,similar`)

  if (loading) {
    return (
      <div className='page'>
        <NavBar />
        <div className='spinner' style={{ marginTop: 200 }} />
      </div>
    )
  }

  if (error || !m) {
    return (
      <div className='page'>
        <NavBar />
        <main className='page-main empty-state'>
          <h2>We couldn&apos;t load this movie</h2>
          <p>It may not exist, or the connection failed.</p>
          <button type='button' className='btn btn-accent' onClick={reload}>Try again</button>{' '}
          <Link to='/' className='btn btn-ghost'>Go home</Link>
        </main>
      </div>
    )
  }

  const inList = has(m.id)
  const cast = (m.credits?.cast || []).slice(0, 12)
  const director = (m.credits?.crew || []).find((c) => c.job === 'Director')
  const similar = (m.similar?.results || []).filter((s) => s.backdrop_path || s.poster_path)

  return (
    <div className='page details'>
      <NavBar />
      <div className='details-hero'>
        {m.backdrop_path && <img src={img(m.backdrop_path, 'original')} alt='' className='details-backdrop' />}
        <div className='details-shade' />
        <div className='details-content'>
          {m.poster_path && <img className='details-poster' src={img(m.poster_path, 'w500')} alt={`${m.title} poster`} />}
          <div className='details-text'>
            <h1>{m.title}</h1>
            {m.tagline && <p className='details-tagline'>{m.tagline}</p>}
            <p className='details-meta'>
              {m.vote_average > 0 && <span className='rating'><StarIcon width={15} height={15} /> {m.vote_average.toFixed(1)}</span>}
              {year(m.release_date) && <span>{year(m.release_date)}</span>}
              {runtimeText(m.runtime) && <span>{runtimeText(m.runtime)}</span>}
            </p>
            <div className='genres'>
              {(m.genres || []).map((g) => (
                <Link key={g.id} to={`/browse?genre=${g.id}`} className='genre-chip'>{g.name}</Link>
              ))}
            </div>
            <p className='details-overview'>{m.overview || 'No description available.'}</p>
            {director && <p className='details-crew'><span>Director</span> {director.name}</p>}
            <div className='details-btns'>
              <button type='button' className='btn' onClick={() => navigate(`/player/${m.id}`)}><PlayIcon /> Play Trailer</button>
              <button type='button' className='btn btn-ghost' onClick={() => toggle(m)}>
                {inList ? <CheckIcon /> : <PlusIcon />} {inList ? 'In My List' : 'My List'}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className='details-body'>
        {cast.length > 0 && (
          <section>
            <h2>Cast</h2>
            <div className='cast-list'>
              {cast.map((c) => (
                <div className='cast-card' key={c.id}>
                  {c.profile_path ? <img src={img(c.profile_path, 'w185')} alt={c.name} loading='lazy' /> : <div className='cast-empty'>{c.name.charAt(0)}</div>}
                  <strong>{c.name}</strong>
                  <span>{c.character}</span>
                </div>
              ))}
            </div>
          </section>
        )}
        {similar.length > 0 && (
          <div className='details-similar'>
            <TitleCards title='More Like This' movies={similar} />
          </div>
        )}
      </div>
      <Footer />
    </div>
  )
}

export default Details
