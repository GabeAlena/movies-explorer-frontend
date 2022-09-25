import React from 'react';
import { useLocation } from "react-router-dom";
import filmLink from '../../../images/film.svg';

function MoviesCard() {
    const location = useLocation();

    return (
        <article className="movie-card">
            <img className="movie-card__image" src={filmLink} alt="постер фильма" />
            <div className="movie-card__title-duration-like">
                <div className="movie-card__title-like">
                    <h2 className="movie-card__title">33 слова о дизайне</h2>
                    <button className={` ${location.pathname === '/movies' ? 'movie-card__like-button' : 'movie-card__delete-button'} `} type="button" aria-label="кнопка лайкнуть" />
                    { /* <button className="movie-card__dislike-button" type="button" aria-label="кнопка дизлайкнуть" /> */ }
                    { /* <button className="movie-card__delete-button" type="button" aria-label="кнопка удалить из моих фильмов" /> */ }
                </div>
                <p className="movie-card__duration">1ч42м</p>
            </div>
        </article>
    )
}

export default MoviesCard;