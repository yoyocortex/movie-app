import React from 'react';

export default function MovieList(props) {
    const FavoriteComponent = props.favoriteComponent;

    // not FINE!!! no var only const and let!!!!! ----
    var checkIfIncludes = (value) => {
        return props.favorites.some(item => value === item.imdbID);
      };
    return (
        <>
            {props.movies.map((movie) =>
                <div key={movie.imdbID} onClick={() => props.handleFavoritesClick(movie)} className='poster'>
                    <img className='poster-image' src={movie.Poster} alt='movie'></img>
                    <FavoriteComponent isFav={checkIfIncludes(movie.imdbID)} handleFavoritesClick={props.handleFavoritesClick}></FavoriteComponent>
                </div>
            )}
        </>
    )
}
