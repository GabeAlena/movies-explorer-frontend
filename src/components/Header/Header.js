import React from 'react';
import headerLogo from '../../images/header_logo.svg';
import { Link, Routes, Route } from "react-router-dom";
import Navigation from '../Navigation/Navigation';

const Header = () => {
    return (
                <Routes>
                    <Route exact path="/" element={
                        <>
                            <header className="header header_color_grey">
                                <Link to="/" className="header__logo">
                                    <img src={headerLogo} alt="логотип сайта" />
                                </Link>
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
                                    <Link to="/" className="header__logo">
                                        <img src={headerLogo} alt="логотип сайта" />
                                    </Link>
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