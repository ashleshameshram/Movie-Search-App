import React from 'react'
import './MovieCard.css'

export default function MovieCard() {
    return(
        <div className='container'> 
          <div className='Movie-Card-Container'>
            <img alt="Movie Poster"/>
          </div>
          <div className='movie-Desc'>
            <h4>Movie Name</h4>
            <h5>Release year</h5>
          </div>
        </div>
    )
}