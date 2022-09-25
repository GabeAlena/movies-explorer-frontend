import React from 'react';

function Portfolio() {
    return (
        <section className="portfolio__section">
            <h1 className="portfolio__title">Портфолио</h1>
            <ul className="portfolio__links">
                <li className="portfolio__link-container">
                    <a href="https://github.com/GabeAlena/react-mesto-api-full" target="blank" className="portfolio__link">
                        <p className="portfolio__link-name">Статичный сайт</p>
                        <p className="portfolio__link-icon">↗</p>
                    </a>
                </li>
                <li className="portfolio__link-container">
                    <a href="https://github.com/GabeAlena/russian-travel" target="blank" className="portfolio__link">
                        <p className="portfolio__link-name">Адаптивный сайт</p>
                        <p className="portfolio__link-icon">↗</p>
                    </a>
                </li>
                <li className="portfolio__link-container">
                    <a href="https://github.com/GabeAlena/second-project" target="blank" className="portfolio__link">
                        <p className="portfolio__link-name">Одностраничное приложение</p>
                        <p className="portfolio__link-icon">↗</p>
                    </a>
                </li>
            </ul>
        </section>
    )
}

export default Portfolio;