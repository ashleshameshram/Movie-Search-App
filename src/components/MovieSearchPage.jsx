import { useState } from 'react'
import './MovieSearchPage.css'
import SearchBar from './SearchBar'
import MovieCard from './MovieCard'
import MovieGrid from './MovieGrid' 
import DefaultMovies from './DefaultMovies'


export default function MovieSearchPage() {
    const [movieInfo, setMovieInfo] = useState([]);
    const [notFound, setNotFound] = useState(false);
    const [hasSearched, setHasSearched] = useState(false);  //track if user has searched yet

  let updateInfo = (newInfo) => {
    setHasSearched(true);

    if (newInfo.Response === "False") {
      setNotFound(true);
      setMovieInfo([]);
    } else {
      setNotFound(false);
      setMovieInfo(newInfo.Search);
    }
  }
  

  return (
    <div>
      <SearchBar updateInfo={updateInfo} />
        {notFound && 
          <h1 className='errorMsg'>
            Movie not found&nbsp;<i className="fa-regular fa-face-sad-cry"></i>.&nbsp;
            Try a different movie.
          </h1>
        }
      
      {!hasSearched && <DefaultMovies />}
      {hasSearched && movieInfo.length > 0 && (
        <>
          <h2 className='searchMsg'>From your Search</h2>
          <MovieGrid movies={movieInfo} />
        </>
      )}    
    </div>
  )
}

