import { useState, useEffect } from 'react'
import MovieGrid from './MovieGrid'
import './DefaultMovies.css'

export default function DefaultMovies() {
    const [genreMovies, setGenreMovies] = useState({});

    const ApiUrl = "https://www.omdbapi.com";
    const ApiKey = import.meta.env.VITE_OMDB_API_KEY;
    const genreCategories = {
        "Indian Movies" : ["Raja Shivaji","peddi","Made in Korea","Mardaani 3","Maa behen",
            "Raat Akeli Hai - The Bansal Murders","Maa","Raazi"],
        "Comedy" : ["Sunny Sanskari ki Tulsi Kumari","swapped","Inspector Zende","Do Deewane Seher Mein","crew","Son of Sardaar 2"],
        "Action Movies" : ["Dhurandar","Mahavatar Narsimha","The Great Flood","Raw","Border 2","War Machine"],
        "Horror Movies" : ["The Nun II","The Nun","Shaitaan","Frankenstein","The Elixir","Ziam"]
    }

    useEffect(() => {
        async function fetchAllGenres() {
            let result = {};
            for(let genre in genreCategories){
                let movies = [];
                for(let term of genreCategories[genre]){
                    let response = await fetch(`${ApiUrl}/?apikey=${ApiKey}&t=${term}`);
                    let data = await response.json();
                    if(data.Response === "True"){
                        movies.push(data);
                    }
                }
                result[genre] = movies;
            }
            setGenreMovies(result);
        }
        fetchAllGenres();
    }, []);         //renders only first time when page loads

    return(
        <>
            {Object.keys(genreMovies).map((genre) => (
                <div key={genre}>
                    <h2>{genre}</h2>
                    <MovieGrid movies={genreMovies[genre]} />
                </div>
            ))}       
        </>
    )
}