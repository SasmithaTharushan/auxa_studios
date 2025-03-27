import React, { useState, useEffect, useRef } from 'react'
import './TitleCards.css'
import cards_data from '../../assets/cards/Cards_data'
import { Link } from 'react-router-dom'

const TitleCards = ({title, category}) => {
  const[apiData, setApiData] = useState([]);
  const cardsRef = useRef();

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyZTZlN2VhNmE1NTQ1ZTMwODMxMGE4ZjdjNzE4NWUwMSIsIm5iZiI6MTc0MzAwNjk0OS4zNjcsInN1YiI6IjY3ZTQyY2U1ZWM5OGJmMGEwZDc2MWQ5MCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.xI6pbDzAR4N6KmX2-t02R1oknQMCqnuhDzpeYpCee7w'
    }
  };
  
  

  const handleWheel = (event) => {
    event.preventDefault();  // Fixed: added parentheses
    cardsRef.current.scrollLeft += event.deltaY;
  }

  useEffect(() => {

    fetch(`https://api.themoviedb.org/3/movie/${category?category:"now_playing"}?language=en-US&page=1`, options)
    .then(res => res.json())
    .then(res => setApiData(res.results))
    .catch(err => console.error(err));

    cardsRef.current.addEventListener('wheel', handleWheel);  // Fixed: corrected spelling
  }, []);

  return (
    <div className='title-cards'>
      <h2>{title?title:"Popular on Auxa Studios"}</h2>
      <div className='card-list' ref={cardsRef}>
        {apiData.map((card, index) => {
          return (
            <Link to={`/player/${card.id}`} className="card" key={index}>
              <img src={`https://image.tmdb.org/t/p/w500`+card.backdrop_path} alt="" />
              <p>{card.original_title}</p>
            </Link>
          )
        })}
      </div>
    </div>
  )
}

export default TitleCards