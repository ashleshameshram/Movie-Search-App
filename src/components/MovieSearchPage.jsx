import { useState } from 'react'
import './MovieSearchPage.css'
import SearchBar from './SearchBar'
import MovieCard from './MovieCard'
import MovieGrid from './MovieGrid' 
import DefaultMovies from './DefaultMovies'
import SkeletonCard from './SkeletonCard'


export default function MovieSearchPage() {
    const [movieInfo, setMovieInfo] = useState([]);
    const [notFound, setNotFound] = useState(false);
    const [hasSearched, setHasSearched] = useState(false);  //track if user has searched yet
    const [loading, setLoading] = useState(false);

  let updateInfo = (newInfo) => {
    setLoading(false);
    setHasSearched(true);

    if (newInfo.Response === "False") {
      setNotFound(true);
      setMovieInfo([]);
    } else {
      setNotFound(false);
      setMovieInfo(newInfo.Search);
    }
  }
  
  let startLoading = () => {
    setLoading(true);
    setNotFound(false);
  }

  return (
    <div>
      <SearchBar updateInfo={updateInfo} startLoading={startLoading} />
        {notFound && 
          <h1 className='errorMsg'>
            Movie not found&nbsp;<i className="fa-regular fa-face-sad-cry"></i>.&nbsp;
            Try a different movie.
          </h1>
        }

        {loading && (
            <div style={{display : "flex",gap: "16px", padding: "20px"}}>
              {Array(6).fill(0).map((_,index) => (
                <SkeletonCard key={index}/>
              ))}

            </div>
        )}
      
      {!loading && !hasSearched && <DefaultMovies />}
      {!loading && hasSearched && movieInfo.length > 0 && (
        <>
          <h2 className='searchMsg'>From your Search</h2>
          <MovieGrid movies={movieInfo} />
        </>
      )}    
    </div>
  )
}

