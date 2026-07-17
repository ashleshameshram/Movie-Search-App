import React, { useState } from 'react'
import './SearchBar.css'

export default function SearchBar() {
    let [input, setInput] = useState("");

    let handleInput = (e) => {
        setInput(e.target.value);
    }

    let handleSearch = () => {

    }

    return(
        <> 
            <div>
                <h1>CineFind</h1>
                <h3>Find any movie in seconds</h3>
                <span>
                    <i class="fa-solid fa-magnifying-glass"></i>
                </span>
                <input type='text' placeholder='Search for a movie...'
                    value={input} onChange={handleInput}/>

                <button onClick={handleSearch}>Search</button>
            </div>
        </>
    )
}