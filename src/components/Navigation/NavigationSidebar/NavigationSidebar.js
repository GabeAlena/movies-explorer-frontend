import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import headerProfileImg from '../../../images/man.svg';

const NavigationSidebar = () => {
    const location = useLocation();

    return (
        <section className="navigation-sidebar">
            <div className="navigation-sidebar__nav">
                <button className="navigation-sidebar__btn-exit"></button>
                <nav className="navigation-sidebar__links">
                    <NavLink to="/" className={`navigation-sidebar__link ${location.pathname === '/' ? 'navigation-sidebar__link_active' : ''}`}>Главная</NavLink>
                    <NavLink to="/movies" className={`navigation-sidebar__link ${location.pathname === '/movies' ? 'navigation-sidebar__link_active' : ''}`}>Фильмы</NavLink>
                    <NavLink to="/saved-movies" className={`navigation-sidebar__link ${location.pathname === '/saved-movies' ? 'navigation-sidebar__link_active' : ''}`}>Сохранённые фильмы</NavLink>
                </nav> 
                <NavLink to="/profile" className="navigation-sidebar__profile">
                    <h2 className="navigation-sidebar__profile_account">Аккаунт</h2>
                    <img className="navigation-sidebar__profile_img" src={headerProfileImg} alt="иконка пользователя"></img>
                </NavLink> 
            </div>
        </section>
    )
}

export default NavigationSidebar;