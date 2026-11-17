import { useState } from 'react'
import './WatchProviders.css'
import useTmdb from '../../hooks/useTmdb'
import { img } from '../../tmdb'

const GROUPS = [
  ['flatrate', 'Stream'],
  ['free', 'Free'],
  ['ads', 'Free with ads'],
  ['rent', 'Rent'],
  ['buy', 'Buy'],
]

const userRegion = () => (navigator.language?.split('-')[1] || 'US').toUpperCase()

// "Where to watch" for a movie, powered by TMDB / JustWatch data.
const WatchProviders = ({ movieId }) => {
  const { data, loading } = useTmdb(`/movie/${movieId}/watch/providers`)
  const [picked, setPicked] = useState(null)

  const results = data?.results || {}
  const countries = Object.keys(results)
  if (loading) return null

  const region = picked || (results[userRegion()] ? userRegion() : results.US ? 'US' : countries[0])
  const info = region ? results[region] : null
  const groups = info ? GROUPS.filter(([key]) => info[key]?.length) : []
  const names = new Intl.DisplayNames(['en'], { type: 'region' })
  const label = (c) => {
    try {
      return names.of(c)
    } catch {
      return c
    }
  }

  return (
    <section className='watch'>
      <div className='watch-head'>
        <h2>Where to watch</h2>
        {countries.length > 1 && (
          <select value={region} onChange={(e) => setPicked(e.target.value)} aria-label='Country'>
            {countries.sort((a, b) => label(a).localeCompare(label(b))).map((c) => (
              <option key={c} value={c}>{label(c)}</option>
            ))}
          </select>
        )}
      </div>
      {groups.length === 0 ? (
        <p className='watch-none'>Not currently available to stream, rent or buy in your region.</p>
      ) : (
        <div className='watch-groups'>
          {groups.map(([key, name]) => (
            <div key={key} className='watch-group'>
              <h3>{name}</h3>
              <div className='watch-logos'>
                {info[key].map((p) => (
                  <a key={p.provider_id} href={info.link} target='_blank' rel='noopener noreferrer' title={`${p.provider_name} — opens JustWatch`}>
                    <img src={img(p.logo_path, 'w92')} alt={p.provider_name} loading='lazy' />
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
      <p className='watch-credit'>Availability data provided by JustWatch.</p>
    </section>
  )
}

export default WatchProviders
