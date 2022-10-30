import React from 'react';
import MoviesCard from '../MoviesCard/MoviesCard';

const MoviesCardList = ({ 
    movies,
    savedMovies,
    onMovieSave,
    onMovieDelete,
    }) => {

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
