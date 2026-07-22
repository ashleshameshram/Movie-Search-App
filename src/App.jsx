import MovieSearchPage from './components/MovieSearchPage'
import { Routes, Route } from 'react-router-dom'
import MovieDetails from './components/MovieDetails.jsx'

function App() {
  return (
    <Routes>
      <Route path='/' element={<MovieSearchPage />} />
      <Route path="/movie/:imdbID" element={<MovieDetails />} />
    </Routes>
  )
}

export default App
