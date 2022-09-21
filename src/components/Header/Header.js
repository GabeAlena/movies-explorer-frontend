import React from 'react';
import headerLogo from '../../images/header_logo.svg';
import headerProfileImg from '../../images/man.svg';
import { Link, NavLink, Routes, Route } from "react-router-dom";
import Navigation from '../Navigation/Navigation';
import NavigationSidebar from '../Navigation/NavigationSidebar/NavigationSidebar';

const Header = () => {
    return (
                <Routes>
                    <Route exact path="/" element={
                        <>
                            <header className="header header_color_grey">
                                <img className="header__logo" src={headerLogo} alt="логотип сайта" />
                                <div className="header__nav">
                                    <Link to="/signup" className="header__register">Регистрация</Link>                                                           
                                    <Link to="/signin" className="header__login">Войти</Link>    
                                </div>   
                            </header>                                                    
                        </>
                    }/>
                    {["movies", "saved-movies", "profile"].map((path, index) => 
                        <Route path={path} key={index} element={
                            <>
                                <header className="header header_color_white">
                                    <img className="header__logo" src={headerLogo} alt="логотип сайта" />
                                    <Navigation />
                                    <button type="button" className="header__nav-button">
                                        <span></span>
                                    </button>
                                </header>    
                            </>
                        }/>                    
                    )}
                </Routes>                          
    )
}

export default Header;