import React, { useState, useEffect } from 'react';
import './Player.css';
import back_arrow_icon from '../../assets/back_arrow_icon.png';
import { useParams, useNavigate } from 'react-router-dom';

const Player = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [apiData, setApiData] = useState({
    name: "",
    key: "",
    published_at: "",
    type: "", // Changed from typeof to type
  });

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyZTZlN2VhNmE1NTQ1ZTMwODMxMGE4ZjdjNzE4NWUwMSIsIm5iZiI6MTc0MzAwNjk0OS4zNjcsInN1YiI6IjY3ZTQyY2U1ZWM5OGJmMGEwZDc2MWQ5MCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.xI6pbDzAR4N6KmX2-t02R1oknQMCqnuhDzpeYpCee7w'
    }
  };

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`, options)
      .then(res => res.json())
      .then(res => {
        // Handle case where no results are returned
        setApiData(res.results && res.results[0] ? res.results[0] : { name: "No trailer", key: "", published_at: "", type: "" });
      })
      .catch(err => console.error('Fetch Error:', err));
  }, [id]); // Added id as dependency

  return (
    <div className='player'>
      <img 
        src={back_arrow_icon} 
        alt="Back" 
        onClick={() => navigate(-1)} // Changed to -1 (one step back)
        style={{ cursor: 'pointer' }} // Optional: make it look clickable
      />
      {apiData.key ? (
        <iframe
          width='90%'
          height='90%'
          src={`https://www.youtube.com/embed/${apiData.key}`} // Fixed URL
          title='trailer'
          frameBorder="0" // Fixed syntax
          allowFullScreen
        ></iframe>
      ) : (
        <p>No trailer available</p> // Fallback if no key
      )}
      <div className="player-info">
        <p>{apiData.published_at ? apiData.published_at.slice(0, 10) : "N/A"}</p>
        <p>{apiData.name || "No title"}</p>
        <p>{apiData.type || "N/A"}</p> {/* Changed to type */}
      </div>
    </div>
  );
};

export default Player;