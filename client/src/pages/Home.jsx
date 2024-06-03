import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Home.css';
import { useAuth } from '../../store/auth';

function Home() {
  const [movie, setMovie] = useState('');
  const [movieapi, setMovieapi] = useState([]);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [userData, setUserData] = useState('');
  const { user, isLoading, isLoggedIn } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      setUserData(user.userData.username);
    }
  }, [user]);

  useEffect(() => {
    if (!isLoading && !isLoggedIn) {
      navigate('/login');
    }
  }, [isLoading, isLoggedIn, navigate]);

  const handleInput = (e) => {
    setMovie(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setPage(1); // Reset to the first page on new search
    fetchapi(1);
  };

  const fetchapi = async (pageNum) => {
    const API = `http://www.omdbapi.com/?s=${movie}&page=${pageNum}&apikey=36dcb2e4`;
    try {
      const res = await fetch(API);
      const data = await res.json();
      if (data.Response === "True") {
        setMovieapi(data.Search);
        setError(null);
      } else {
        setError(data.Error);
        setMovieapi([]);
      }
    } catch (err) {
      setError("Something went wrong!");
      setMovieapi([]);
    }
  };

  const handleNextPage = () => {
    if (page < 100) {
      const nextPage = page + 1;
      setPage(nextPage);
      fetchapi(nextPage);
    }
  };

  if (isLoading) {
    return <p>Loading...</p>; // Loading state
  }

  if (!isLoggedIn) {
    return <p>Redirecting to login...</p>; // Redirect message
  }

  return (
    <>
      <section>
        <main>
          {user && <h1>Welcome {userData}😀</h1>}
          <div className='container-movie'>
            <label htmlFor="movie" className='movie-input'>
              <h1>Movie</h1>
            </label>
          </div>
          <div className='container-movie'>
            <input
              type="text"
              name='movie'
              id='movie'
              placeholder='Search a Movie'
              value={movie}
              onChange={handleInput}
            />
            <button type='submit' onClick={handleSubmit}>Submit</button>
          </div>
          <div className='grid-5-cols' id='display'>
            {error && <p>{error}</p>}
            {movieapi.length > 0 && movieapi.map((movie) => (
              <div key={movie.imdbID} className='movie-item'>
                <img src={movie.Poster} alt={movie.Title} width={150} height={200} />
                <h3>{movie.Title}</h3>
                <p>{movie.Year}</p>
              </div>
            ))}
          </div>
          {page ? (
            <div className='container-movie'>
              <p>{page}</p>
              <button onClick={handleNextPage}>Next Page</button>
            </div>
          ) : null}
        </main>
      </section>
    </>
  );
}

export default Home;
