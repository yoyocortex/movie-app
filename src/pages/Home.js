import React from 'react';
import MovieList from '../components/MovieList';
import Navbar from './Navbar';


export default function Home(props) {
    return (
        <>
            <Navbar />
            <div className='rowski'>
                <MovieList favorites={props.favorites} movies={props.favorites} handleFavoritesClick={props.handleFavoritesClick} favoriteComponent={props.favoriteComponent}></MovieList>
            </div>
        </>
    )
}