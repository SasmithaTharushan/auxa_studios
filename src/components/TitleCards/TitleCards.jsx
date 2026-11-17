import React, { useState, useEffect, useRef } from 'react'
import './TitleCards.css'
import { Link } from 'react-router-dom'
import { tmdbFetch } from '../../tmdb'

const TitleCards = ({ title, category, id }) => {
  const [apiData, setApiData] = useState([])
  const cardsRef = useRef()

  useEffect(() => {
    const el = cardsRef.current
    const handleWheel = (event) => {
      event.preventDefault()
      el.scrollLeft += event.deltaY
    }
    el.addEventListener('wheel', handleWheel, { passive: false })
    return () => el.removeEventListener('wheel', handleWheel)
  }, [])

  useEffect(() => {
    tmdbFetch(`/movie/${category ? category : 'now_playing'}?language=en-US&page=1`)
      .then((res) => setApiData(res.results || []))
      .catch((err) => console.error(err))
  }, [category])

  return (
    <div className='title-cards' id={id}>
      <h2>{title ? title : 'Popular on Auxa Studios'}</h2>
      <div className='card-list' ref={cardsRef}>
        {apiData
          .filter((card) => card.backdrop_path)
          .map((card) => (
            <Link to={`/player/${card.id}`} className='card' key={card.id}>
              <img src={`https://image.tmdb.org/t/p/w500${card.backdrop_path}`} alt={card.original_title} />
              <p>{card.original_title}</p>
            </Link>
          ))}
      </div>
    </div>
  )
}

export default TitleCards
