import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import navProfileImg from '../../images/man.svg';

const Navigation = () => {
    const location = useLocation();

    return (
        <div className="navigation navigation_movies">
            <nav className="navigation__nav">
                <NavLink to="/movies" className={`navigation__nav-movies ${location.pathname === '/movies' ? 'navigation__nav-movies_active' : ''}`}>Фильмы</NavLink>
                <NavLink to="/saved-movies" className={`navigation__nav-saved-movies ${location.pathname === '/saved-movies' ? 'navigation__nav-saved-movies_active' : ''}`}>Сохранённые фильмы</NavLink>
            </nav>
            <NavLink to="/profile" className="navigation__profile">
                <h2 className="navigation__profile_account">Аккаунт</h2>
                <img className="navigation__profile_img" src={navProfileImg} alt="иконка пользователя"></img>
            </NavLink>
        </div>
    )
}

export default Navigation;