import React from 'react';
import SearchBox from '../components/SearchBox';
import MovieList from '../components/MovieList';
import Navbar from './Navbar';

export default function Movies(props) {
    return (
        <>
            <Navbar />
            <br></br>
            <div className='heading'>
                <SearchBox searchValue={props.searchValue} setSearchValue={props.setSearchValue}></SearchBox>
            </div>
            <div className='rowski'>
                <MovieList favorites={props.favorites} movies={props.movies} handleFavoritesClick={props.handleFavoritesClick} favoriteComponent={props.favoriteComponent}></MovieList>
            </div>
        </>
    )
}
