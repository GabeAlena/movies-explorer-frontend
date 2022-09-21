import React from 'react';

function Portfolio() {
    return (
        <section className="portfolio__section">
            <h1 className="portfolio__title">Портфолио</h1>
            <div className="portfolio__links">
                <a href="https://github.com/GabeAlena/react-mesto-api-full" className="portfolio__link">
                    <p className="portfolio__link-name">Статичный сайт</p>
                    <p className="portfolio__link-icon">↗</p>
                </a>
                <a href="https://github.com/GabeAlena/russian-travel" className="portfolio__link">
                    <p className="portfolio__link-name">Адаптивный сайт</p>
                    <p className="portfolio__link-icon">↗</p>
                </a>
                <a href="https://github.com/GabeAlena/second-project" className="portfolio__link">
                    <p className="portfolio__link-name">Одностраничное приложение</p>
                    <p className="portfolio__link-icon">↗</p>
                </a>
            </div>
        </section>
    )
}

export default Portfolio;