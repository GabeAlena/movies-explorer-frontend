import React, { useEffect, useState } from 'react';
import MoviesCard from '../MoviesCard/MoviesCard';
import { useLocation } from "react-router-dom";

const MoviesCardList = ({ 
    movies,
    savedMovies,
    onMovieSave,
    onMovieDelete,
    }) => {

    const location = useLocation();

    return (
        <section className="movies-card-list">
            <div className="movies-card-list__movie">
                {movies.map((movie) => (
                    <MoviesCard
                        key={movie.id || movie.movieId || movie._id} 
                        savedMovies={savedMovies} 
                        movie={movie}
                        movies={movies}
                        onMovieSave={onMovieSave}
                        onMovieDelete={onMovieDelete}
                    />
                ))}
            </div>
        </section>
    )
}

export default MoviesCardList;
