import { useState, useEffect } from 'react'
import MovieGrid from './MovieGrid'
import './DefaultMovies.css'
import SkeletonCard from './SkeletonCard.jsx'

export default function DefaultMovies() {
    const [genreMovies, setGenreMovies] = useState({});
    const [loading, setLoading] = useState(true);

    const ApiUrl = "https://www.omdbapi.com";
    const ApiKey = import.meta.env.VITE_OMDB_API_KEY;
    const genreCategories = {
        "Family Comedies" : ["The Croods: A New Age","KPop Demon Hunters","The Boss Baby","Sonic the Hedgehog 3","The Angry Birds Movie",
            "Goat","The Smurfs","Kangaroo Jack", "swapped","Dog Gone Trouble","The Twits","Minions & More Volume 2"],
        "International Movies" : ["The Great Flood","lucy","K.O.","Love Untangled","brick","hunger"],
        "Action Movies" : ["Bullet Train","The Man from Toronto","The Great Flood","Raw","Lift","War Machine"],
        "Horror Movies" : ["The Nun II","The Nun","Frankenstein","The Elixir","Ziam"],
        "Hollywood Movies" : ["Voicemails for Isabelle","Uncharted","Apex","Furious 7","The Lord of the Rings: The Fellowship of the Ring","the batman","Jurassic park"],
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
            setLoading(false);
        }
        fetchAllGenres();
    }, []);         //renders only first time when page loads

    if(loading) {
        return(
            <>
                {Object.keys(genreCategories).map((genre) => (
                    <div key={genre} style={{ marginBottom: "30px" }}>
                        <h2  style={{padding: "0 20px",marginTop: "30px",marginBottom: "10px"}}>{genre}</h2>
                        <div style={{display: "flex", gap:"16px", padding: "0 30px"}}>
                            {Array(6).fill(0).map((_,index) =>(
                                <SkeletonCard key={index}/>
                            ))}
                        </div>
                    </div>
                ))}
            </>
        );
    }

    return(
        <>
            {Object.keys(genreMovies).map((genre) => (
                <div key={genre} style={{ marginBottom: "30px"}}>
                    <h2 style={{ padding: "0 20px", marginTop:"30px", marginBottom:"10px"}}>{genre}</h2>
                    <MovieGrid movies={genreMovies[genre]} />
                </div>
            ))}       
        </>
    )
}