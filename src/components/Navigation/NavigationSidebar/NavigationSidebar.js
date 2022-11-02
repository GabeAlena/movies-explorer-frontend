import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import headerProfileImg from '../../../images/man.svg';

function NavigationSidebar({ handleOpenMenu, sidebar }) {
    const location = useLocation();

    return (
        <section className={`navigation-sidebar ${sidebar ? 'sidebar_active' : ''}`}>
            <div className="navigation-sidebar__nav">
                <button className="navigation-sidebar__btn-exit" onClick={handleOpenMenu}></button>
                <div className="navigation-sidebar__links-profile">
                    <nav className="navigation-sidebar__links">
                        <NavLink to="/" onClick={handleOpenMenu} className={`navigation-sidebar__link ${location.pathname === '/' ? 'navigation-sidebar__link_active' : ''}`}>Главная</NavLink>
                        <NavLink to="/movies" onClick={handleOpenMenu} className={`navigation-sidebar__link ${location.pathname === '/movies' ? 'navigation-sidebar__link_active' : ''}`}>Фильмы</NavLink>
                        <NavLink to="/saved-movies" onClick={handleOpenMenu} className={`navigation-sidebar__link ${location.pathname === '/saved-movies' ? 'navigation-sidebar__link_active' : ''}`}>Сохранённые фильмы</NavLink>
                    </nav> 
                    <NavLink to="/profile" className="navigation-sidebar__profile" onClick={handleOpenMenu}>
                        <h2 className="navigation-sidebar__profile_account">Аккаунт</h2>
                        <img className="navigation-sidebar__profile_img" src={headerProfileImg} alt="иконка пользователя"></img>
                    </NavLink> 
                </div>      
            </div>
        </section>
    )
}

export default NavigationSidebar;