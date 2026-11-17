import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Hero.css'
import useTmdb from '../../hooks/useTmdb'
import { img, year } from '../../tmdb'
import { useList } from '../../context/ListContext'
import { PlayIcon, InfoIcon, PlusIcon, CheckIcon, StarIcon } from '../Icons/Icons'
import fallbackBanner from '../../assets/hero_banner.jpg'

// Rotating spotlight of today's trending movies
const Hero = () => {
  const navigate = useNavigate()
  const { has, toggle } = useList()
  const { data, loading } = useTmdb('/trending/movie/day?language=en-US')
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)

  const items = (data?.results || []).filter((m) => m.backdrop_path).slice(0, 6)

  useEffect(() => {
    if (items.length < 2 || paused) return
    const t = setInterval(() => setIndex((i) => (i + 1) % items.length), 8000)
    return () => clearInterval(t)
  }, [items.length, paused])

  if (!loading && items.length === 0) {
    // Offline / no API token: show a static banner instead of a blank hero
    return (
      <section className='hero'>
        <img src={fallbackBanner} alt='' className='hero-img active' />
        <div className='hero-shade' />
        <div className='hero-caption'>
          <h1>Welcome to Auxa Studios</h1>
          <p>Stream trailers, build your list and discover your next favourite movie.</p>
        </div>
      </section>
    )
  }

  const current = items[index]

  return (
    <section className='hero' onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      {loading && <div className='skeleton hero-skeleton' />}
      {items.map((m, i) => (
        <img key={m.id} src={img(m.backdrop_path, 'original')} alt='' className={`hero-img ${i === index ? 'active' : ''}`} />
      ))}
      <div className='hero-shade' />
      {current && (
        <div className='hero-caption' key={current.id}>
          <p className='hero-eyebrow'>#{index + 1} Trending today</p>
          <h1>{current.title}</h1>
          <p className='hero-meta'>
            <span className='rating'><StarIcon width={15} height={15} /> {current.vote_average.toFixed(1)}</span>
            <span>{year(current.release_date)}</span>
          </p>
          <p className='hero-overview'>{current.overview}</p>
          <div className='hero-btns'>
            <button type='button' className='btn' onClick={() => navigate(`/player/${current.id}`)}>
              <PlayIcon /> Play Trailer
            </button>
            <button type='button' className='btn btn-ghost' onClick={() => navigate(`/movie/${current.id}`)}>
              <InfoIcon /> More Info
            </button>
            <button type='button' className='btn btn-ghost btn-icon' aria-label={has(current.id) ? 'Remove from My List' : 'Add to My List'} onClick={() => toggle(current)}>
              {has(current.id) ? <CheckIcon /> : <PlusIcon />}
            </button>
          </div>
        </div>
      )}
      {items.length > 1 && (
        <div className='hero-dots'>
          {items.map((m, i) => (
            <button key={m.id} type='button' aria-label={`Show ${m.title}`} className={i === index ? 'active' : ''} onClick={() => setIndex(i)} />
          ))}
        </div>
      )}
    </section>
  )
}

export default Hero
