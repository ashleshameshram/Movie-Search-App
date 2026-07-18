import { useState } from 'react'
import SearchBar from './SearchBar'
import MovieCard from './MovieCard'
import './MovieSearchPage.css'
import MovieGrid from './MovieGrid' 

export default function MovieSearchPage() {
    const [movieInfo, setMovieInfo] = useState([{
      Title: "Titanic",
      Year: "1997",
      Poster: "https://m.media-amazon.com/images/M/MV5BYzYyN2FiZmUtYWYzMy00MzViLWJkZTMtOGY1ZjgzNWMwN2YxXkEyXkFqcGc@._V1_QL75_UX380_CR0,2,380,562_.jpg",
      imdbID: "tt0120338"
    }]);
    const [notFound, setNotFound] = useState(false);

  let updateInfo = (newInfo) => {
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
      <SearchBar updateInfo={updateInfo}/>
        {notFound && 
          <h1 className='errorMsg'>
            Movie not found. Try a different title.&nbsp;
            <i className="fa-regular fa-face-sad-cry"></i>
          </h1>
        }
      {movieInfo.length > 0 && <MovieGrid movies={movieInfo} />}

      {/* <MovieGrid /> */}
    </div>
  )
}

