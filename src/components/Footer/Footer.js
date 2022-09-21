import React from 'react';
import { Routes, Route } from "react-router-dom";

function Footer() {
    return (
        <Routes>
            {["movies", "saved-movies", "/"].map((path, index) => 
                <Route path={path} key={index} element={
                    <footer className="footer">
                        <p className="footer__title">Учебный проект Яндекс.Практикум х BeatFilm.</p>
                        <div className="footer__content">
                            <p className="footer__copyright">&#169; 2022</p>
                            <div className="footer__links">
                                <a href="https://practicum.yandex.ru/" className="footer__link">Яндекс.Практикум</a>
                                <a href="https://github.com/" className="footer__link">Github</a>
                            </div>
                        </div>
                    </footer>
                } />
            )}
        </Routes>
    )
}

export default Footer;