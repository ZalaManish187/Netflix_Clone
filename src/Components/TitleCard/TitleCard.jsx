import React, { useEffect, useRef, useState } from 'react'
import "./TitleCard.css"
import { Link } from 'react-router-dom';



const TitleCard = ({title , category}) => {
  const [ApiData , setApiData] = useState([]);
  const cardsRef = useRef();
 const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5NmZkNzVkODJjNzI2ZmYwMGY3MjgwM2I5YzFhZDRlZSIsIm5iZiI6MTc2MDQzMTEwNy42OTYsInN1YiI6IjY4ZWUwYzAzMWM0NGNmZDVlY2Q2OTUxNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.5WEIwTLP46C_Tc_fkqgf8DmV-pwHEAQ6yqap_fwSVl0'
  }
};




const handleWheel = (event)=>{
  event.preventDefault();
  cardsRef.current.scrollLeft += event.deltaY;
}

useEffect(()=>{
 fetch(`https://api.themoviedb.org/3/movie/${category?category:"now_playing"}?language=en-US&page=1`, options)
  .then(response => response.json())
  .then(response => setApiData(response.results))
  .catch(err => console.error(err));

  cardsRef.current.addEventListener('wheel',handleWheel);
})

  return (
    <div className='title-cards'>
      <h2>{title?title:"Popular on Netflix"}</h2>
      <div className="card-list" ref={cardsRef}>
        {ApiData.map((card,index)=>{
          return <Link to = {`/player/${card.id}`}  className="card" key={index}>
            <img src = {`https://image.tmdb.org/t/p/w500` + card.backdrop_path} alt="" />
            <p>{card.original_title}</p>
          </Link>
        })}
      </div>
    </div>
  )
}

export default TitleCard
