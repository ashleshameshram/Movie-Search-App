import { useState } from 'react'
import './MovieSearchPage.css'
import SearchBar from './SearchBar'
import MovieCard from './MovieCard'
import MovieGrid from './MovieGrid' 
import DefaultMovies from './DefaultMovies'
import SkeletonCard from './SkeletonCard'
import Navbar from './Navbar'


export default function MovieSearchPage() {
    const [movieInfo, setMovieInfo] = useState([]);
    const [notFound, setNotFound] = useState(false);
    const [hasSearched, setHasSearched] = useState(false);  //track if user has searched yet
    const [loading, setLoading] = useState(false);
    const [resetSearch, setResetSearch] = useState(false);

  let updateInfo = (newInfo) => {
    setLoading(false);    //to stop loading
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

  const goHome = () => {
    setMovieInfo([]);
    setNotFound(false);
    setHasSearched(false);
    setLoading(false);
    setResetSearch((prev) => !prev);
  };

  return (
    <div>
      <Navbar goHome={goHome} />
      <SearchBar updateInfo={updateInfo} startLoading={startLoading} resetSearch={resetSearch} />
        {notFound && 
          <h1 className='errorMsg'>
            Movie not found &nbsp;<i className="fa-regular fa-face-sad-cry"></i>.&nbsp;
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
      
      {!loading && !hasSearched && <DefaultMovies />}   {/* no loading no search then show default movie */}
      
      {/* no loading but searching then show result movie */}
      {!loading && hasSearched && movieInfo.length > 0 && (  
        <>
          <h2 className='searchMsg' style={{marginTop:"20px"}}>From your Search</h2>
          <MovieGrid movies={movieInfo} />
        </>
      )}    
    </div>
  )
}

