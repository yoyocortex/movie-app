import React, { useEffect, useState } from 'react';
import './App.css';
import AddFavorites from './components/AddFavorites';
import RemoveFavorites from './components/RemoveFavorites';
import { Route, Routes } from "react-router-dom";
import Home from './pages/Home';
import Movies from './pages/Movies';
import TvShows from './pages/TvShows';
import Signup from './components/Login/Signup';
import Login from './components/Login/Login';
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './components/PrivateRoute';

function App() {
  const [movies, setMovies] = useState([]);
  const [series, setSeries] = useState([]);
  const [searchValue, setSearchValue] = useState([]);
  const [searchValueSeries, setSearchValueSeries] = useState([]);
  const [favorites, setfavorites] = useState([]);

  // Make this one request, bellow
  const getMovieRequest = async () => {
    const url = `http://www.omdbapi.com/?s=${searchValue}&apikey=e4568363&type=movie`;
    const response = await fetch(url);
    const responseJson = await response.json();
    if (responseJson.Search) {
      setMovies(responseJson.Search);
    }
  }

  const getSeriesRequest = async () => {
    const url = `http://www.omdbapi.com/?s=${searchValueSeries}&apikey=e4568363&type=series`;
    const response = await fetch(url);
    const responseJson = await response.json();
    if (responseJson.Search) {
      setSeries(responseJson.Search);
    }
  }

  useEffect(() => {
    getMovieRequest();
  }, [searchValue]);

  useEffect(() => {
    getSeriesRequest();
  }, [searchValueSeries]);

  const AddFavoriteMovie = (movie) => {
    let bool = true;
    favorites.forEach((fav) => {
      if (movie.imdbID === fav.imdbID) {
        bool = false;
      }
    });
    if (bool) {
      const newFavoritesList = [...favorites, movie];
      setfavorites(newFavoritesList);
    };
  }

  const RemoveFavoritesMovie = (movie) => {
    const newFavoritesList = favorites.filter(
      (favorite) => favorite.imdbID !== movie.imdbID
    );
    setfavorites(newFavoritesList);
  }

  return (
    // <div className='movie-app'>
    //   <div className='heading'>
    //     <MovieListHeading heading='Movies'></MovieListHeading>
    //     <SearchBox searchValue={searchValue} setSearchValue={setSearchValue}></SearchBox>
    //   </div>
    //   <div className='rowski'>
    //     <MovieList favorites={favorites} movies={movies} handleFavoritesClick={AddFavoriteMovie} favoriteComponent={AddFavorites}></MovieList>
    //   </div>
    //   <div className='heading'>
    //     <MovieListHeading heading='Favorites'></MovieListHeading>
    //   </div>
    //   <div className='rowski'>
    //     <MovieList favorites={favorites} movies={favorites} handleFavoritesClick={RemoveFavoritesMovie} favoriteComponent={RemoveFavorites}></MovieList>
    //   </div>
    // </div>
    // <>
    //   <Navbar/>
    //   <div className="container">
    //     <Routes>
    //       <Route path="/" element={<Home favorites={favorites} movies={movies} handleFavoritesClick={RemoveFavoritesMovie} favoriteComponent={RemoveFavorites}/>} />
    //       <Route path="/movies" element={<Movies searchValue={searchValue} setSearchValue={setSearchValue} favorites={favorites} movies={movies} handleFavoritesClick={AddFavoriteMovie} favoriteComponent={AddFavorites}/>} />
    //       <Route path="/TVShows" element={<TvShows searchValue={searchValueSeries} setSearchValue={setSearchValueSeries} favorites={favorites} movies={series} handleFavoritesClick={AddFavoriteMovie} favoriteComponent={AddFavorites}/>} />
    //     </Routes>
    //   </div>
    // </>
    // <Container className='d-flex align-items-center justify-content-center' style={{ minHeight: "100vh" }}>
    //   <div className='w-100' style={{ maxWidth: "400px" }}>
    <AuthProvider>
      <Routes>
        <Route exact path='/' element={<PrivateRoute></PrivateRoute>}>
          <Route exact path='/' element={<Home favorites={favorites} movies={movies} handleFavoritesClick={RemoveFavoritesMovie} favoriteComponent={RemoveFavorites} />} />
        </Route>
        <Route exact path='/movies' element={<PrivateRoute />}>
          <Route exact path='/movies' element={<Movies searchValue={searchValue} setSearchValue={setSearchValue} favorites={favorites} movies={movies} handleFavoritesClick={AddFavoriteMovie} favoriteComponent={AddFavorites} />} />
        </Route>
        <Route exact path='/TVShows' element={<PrivateRoute />}>
          <Route exact path='/TVShows' element={<TvShows searchValue={searchValueSeries} setSearchValue={setSearchValueSeries} favorites={favorites} movies={series} handleFavoritesClick={AddFavoriteMovie} favoriteComponent={AddFavorites} />} />
        </Route>
        <Route path='/signup' element={<Signup />} />
        <Route path='/login' element={<Login />} />
      </Routes>
    </AuthProvider>
    //   </div>
    // </Container>
  );
}

export default App;
