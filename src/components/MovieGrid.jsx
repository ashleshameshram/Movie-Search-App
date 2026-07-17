import React from 'react'
import MovieCard from './MovieCard'

export default function MovieGrid({movies}) {
    return(
        <div style={{ display: "flex", flexWrap: "wrap", gap: "16px", padding: "20px" }}>
            {movies.map((movie) => (
                <MovieCard key={movie.imdbID} info={movie} />
            ))}
        </div>
    )
}