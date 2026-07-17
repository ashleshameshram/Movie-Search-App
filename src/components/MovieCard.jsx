import React from 'react'
import './MovieCard.css'

export default function MovieCard({info}) {
    return(
        <div className='container'> 
          <div className='Movie-Card-Container'>
            <img src={info.Poster} alt={info.Title} />
          </div>
          <div className='movie-Desc'>
            <h4>{info.Title}</h4>
            <h5>{info.Year}</h5>
          </div>
        </div>
    )
}