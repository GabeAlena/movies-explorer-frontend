import React, { useEffect, useContext, useState } from 'react';
import { useLocation } from "react-router-dom";

function MoviesCard({ movie, onMovieSave, onMovieDelete, savedMovies }) {
    const location = useLocation();
    const isSaved = savedMovies.some(i => i.movieId === movie.id);
    //console.log(movie);
    //console.log(movie.id);
    //console.log(movie.movieId);

    function handleSave() {
        if (isSaved) {
            return onMovieDelete(movie);
        }
        return onMovieSave(movie);
    };

    function handleDeleteMovie() {
        onMovieDelete(movie);
    };

    const formatMovieDuration = () => {
        const duration = movie.duration;
        const hours = Math.floor(duration / 60);
        const mins = duration - hours * 60;
        return `${hours > 0 ? hours + 'ч ' : ''}${mins > 0 ? mins + 'м' : ''}`;
    }

    return (
        <article className="movie-card">
            <a className="movie-card__image-link" href={movie.trailerLink} target="blank">
                <img 
                    className="movie-card__image" 
                    src={location.pathname === '/movies' ? `https://api.nomoreparties.co${movie.image.url}` : movie.image}
                    alt={movie.nameRU}
                />
            </a>
            <div className="movie-card__title-duration-like">
                <div className="movie-card__title-like">
                    <h2 
                        className="movie-card__title"
                        alt={movie.nameRU}
                    >{movie.nameRU}</h2>
                    {location.pathname === '/movies' && (
                        <button 
                            className={isSaved ? 'movie-card__like-button' : 'movie-card__dislike-button'}
                            type="button" 
                            aria-label="кнопка дизлайкнуть"
                            onClick={handleSave}
                        />
                    )}
                    {location.pathname === '/saved-movies' && (
                        <button 
                            className="movie-card__delete-button"
                            type="button" 
                            aria-label="кнопка дизлайкнуть"
                            onClick={handleDeleteMovie}
                        />
                    )}
                </div>
                <p className="movie-card__duration">{formatMovieDuration()}</p>
            </div>
        </article>
    )
}

export default MoviesCard;