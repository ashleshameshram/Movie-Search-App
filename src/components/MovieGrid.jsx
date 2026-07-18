import React from 'react'
import MovieCard from './MovieCard'
import './MovieGrid.css'

export default function MovieGrid({movies}) {
    return(
        <div className='movie-grid-container'>
            {movies.map((movie) => (
                <MovieCard key={movie.imdbID} info={movie} />
            ))}
        </div>
    )
}   