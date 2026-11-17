import React, { useState, useEffect } from 'react'
import './Player.css'
import back_arrow_icon from '../../assets/back_arrow_icon.png'
import { useParams, useNavigate } from 'react-router-dom'
import { tmdbFetch } from '../../tmdb'

const EMPTY = { name: '', key: '', published_at: '', type: '' }

const Player = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [apiData, setApiData] = useState(EMPTY)

  useEffect(() => {
    tmdbFetch(`/movie/${id}/videos?language=en-US`)
      .then((res) => {
        const videos = res.results || []
        // Prefer an official YouTube trailer, fall back to any YouTube video
        const yt = videos.filter((v) => v.site === 'YouTube')
        const pick = yt.find((v) => v.type === 'Trailer') || yt[0]
        setApiData(pick || { ...EMPTY, name: 'No trailer available' })
      })
      .catch((err) => {
        console.error('Fetch Error:', err)
        setApiData({ ...EMPTY, name: 'Could not load trailer' })
      })
  }, [id])

  return (
    <div className='player'>
      <img
        src={back_arrow_icon}
        alt='Back'
        onClick={() => (window.history.length > 1 ? navigate(-1) : navigate('/'))}
      />
      {apiData.key ? (
        <iframe
          width='90%'
          height='90%'
          src={`https://www.youtube.com/embed/${apiData.key}`}
          title='trailer'
          frameBorder='0'
          allowFullScreen
        ></iframe>
      ) : (
        <p>{apiData.name || 'Loading...'}</p>
      )}
      <div className='player-info'>
        <p>{apiData.published_at ? apiData.published_at.slice(0, 10) : 'N/A'}</p>
        <p>{apiData.name || 'No title'}</p>
        <p>{apiData.type || 'N/A'}</p>
      </div>
    </div>
  )
}

export default Player
