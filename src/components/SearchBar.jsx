import React, { useState } from 'react'
import './SearchBar.css'

export default function SearchBar({updateInfo, resetSearch}) {
    let [input, setInput] = useState("");

    const ApiUrl = "https://www.omdbapi.com";
    const ApiKey = import.meta.env.VITE_OMDB_API_KEY;

    let getMovieInfo = async () => {
            let response = await fetch(`${ApiUrl}/?apikey=${ApiKey}&s=${input}`);
            let jsonResponse = await response.json();
            // let result = {
            //     Poster : jsonResponse.Poster,
            //     Title : jsonResponse.Title,
            //     Year : jsonResponse.Year,
            //     Response: jsonResponse.Response,
            //     imdbID : jsonResponse.imdbID,
            // };
            // console.log(jsonResponse);
            // return result;

            return jsonResponse;

    }

    let handleInput = (e) => {
        setInput(e.target.value);
    }

    let handleSearch = async(e) => {
            let newInfo = await getMovieInfo();
            updateInfo(newInfo);
    }

    let handleClear = () => {
        setInput("");
        resetSearch();
    }
    return(
        <> 
            <div>
                <h1>CineFind</h1>
                <h3>Find any movie in seconds</h3>
                <span className='searchSpan'>
                    <i className="fa-solid fa-magnifying-glass"></i>
                </span>
                <input type='text' placeholder='Search for a movie...'
                    value={input} onChange={handleInput}/>
                <span className='xcrossSpan'>
                    <i className="fa-solid fa-xmark" onClick={handleClear}></i>
                </span>

                <button onClick={handleSearch}>Search</button>
            </div>
        </>
    )
}