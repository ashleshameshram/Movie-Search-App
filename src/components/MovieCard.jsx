import { useState } from 'react'
import './MovieCard.css'

export default function MovieCard({info}) {
  const [imgError, setImgError] = useState(false);
  const hasPosterImg = info.Poster && info.Poster !== "N/A" && !imgError;
    return(
        <div className='container'> 

          <div className='Movie-Card-Container'>
            {hasPosterImg ? 
              (<img src={info.Poster} alt={info.Title} onError= {() => setImgError(true)} />) 
              : ( 
                <div className='no-poster'>
                  <span className='noImgAvail'>No Image Available</span>
                </div> 
              )}
          </div>

          <div className='movie-Desc'>
            <h4>{info.Title}</h4>
            <h5>{info.Year}</h5>
          </div>
        </div>
    )
}