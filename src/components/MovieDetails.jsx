import React, { useEffect, useState } from 'react'
import { useParams, useNavigate, data } from 'react-router-dom'
import './MovieDetails.css'
import MovieGrid from './MovieGrid.jsx'

export default function MovieDetails() {
    const { imdbID } = useParams();
    const navigate = useNavigate();
    const [movie, setMovie] = useState(null);
    const [similarMovies, setSimilarMovies] = useState([]);

    const ApiUrl = "https://www.omdbapi.com";
    const ApiKey = import.meta.env.VITE_OMDB_API_KEY;

    useEffect(() => {
        async function fetchDetails() {
            let response = await fetch(`${ApiUrl}/?apikey=${ApiKey}&i=${imdbID}&plot=full`);
            let data = await response.json();
            setMovie(data);
        }   
        fetchDetails();
    },[imdbID]);

    useEffect(() => {
        async function fetchSimilar() {  
            if(!movie || !movie.Genre) return;
            let genres = movie.Genre.split(",").map((g) => g.trim());
            let firstGenre = genres[0];
            let secondGenre = genres[1] || genres[0];

            let response1 = await fetch(`${ApiUrl}/?apikey=${ApiKey}&s=${firstGenre}`);
            let data1 = await response1.json();
            
            let response2 = await fetch(`${ApiUrl}/?apikey=${ApiKey}&s=${secondGenre}`);
            let data2 = await response2.json();

            let combined = [];
            if (data1.Response === "True") combined = [...combined, ...data1.Search];
            if (data2.Response === "True") combined = [...combined, ...data2.Search];

            let uniqueMovies = combined.filter(
                (movie,index,self) => 
                    movie.imdbID !== imdbID &&
                    index === self.findIndex((m) => m.imdbID === movie.imdbID)
            );
            setSimilarMovies(uniqueMovies.slice(0,10));
        }
        fetchSimilar();
    }, [movie]);

    if (!movie) {
        return (
            <div className='details-page'>
                <div className='skeleton-details-content'>
                    <div className='skeleton-poster-large shimmer'></div>
                    <div className='skeleton-details-info'>
                        <div className='skeleton-line shimmer' style={{ width: "60%", height: "34px" }}></div>
                        <div className='skeleton-line shimmer' style={{ width: "40%" }}></div>
                        <div className='skeleton-line shimmer' style={{ width: "50%" }}></div>
                        <div className='skeleton-line shimmer' style={{ width: "70%" }}></div>
                        <div className='skeleton-line shimmer' style={{ width: "45%" }}></div>
                        <div className='skeleton-line shimmer' style={{ width: "90%", height: "80px" }}></div>
                    </div>
                </div>
            </div>
        );
    }

    return(
        <div className='details-page'>
            <button className='back-btn' onClick={() => navigate(-1)}>
            Back</button>

            <div className="details-content">
                <img src={movie.Poster !== 'N/A' ? movie.Poster : "https://via.placeholder.com/300x450?text=No+Image"}
                    alt={movie.Title}
                    className='details-poster'
                />
                <div className="details-info">
                    <h1>{movie.Title} <span>({movie.Year})</span> <span>Rated: ({movie.Rated})</span></h1>
                    <div className="movie-detail">
                        <p><strong>Genre: </strong>{movie.Genre}</p>
                        <p><strong>Released: </strong>{movie.Released}</p>
                        <p><strong>Awards: </strong>{movie.Awards}</p>
                        <p><strong>Director: </strong>{movie.Director}</p>
                        <p><strong>Writer: </strong>{movie.Writer}</p>
                        <p><strong>Actors: </strong>{movie.Actors}</p>
                        <p><strong>Language: </strong>{movie.Language}</p>
                        <p><strong>Type: </strong>{movie.Type}</p>
                        <p><strong>Country: </strong>{movie.Country}</p>
                        <p><strong>imdbRating: </strong><i className="fa-solid fa-star"style={{color: "rgb(255, 212, 59)"}}></i>
                        &nbsp; {movie.imdbRating}</p>
                        <p><strong>Runtime: </strong>{movie.Runtime}</p>
                        <p className='plot'>{movie.Plot}</p>
                    </div>
                </div>
            </div>
            <div style={{marginTop:"70px"}}>
                {similarMovies.length > 0 && (
                    <div>
                        <h2 style={{paddingLeft:"30px"}}>You Might Also Like</h2>
                        <MovieGrid movies={similarMovies} />
                    </div>
                )}
            </div>
        </div>
    )
}