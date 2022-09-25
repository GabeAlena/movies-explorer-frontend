import React from 'react';

function Techs() {
    return (
        <section className="techs__section">
            <h1 className="techs__title">Технологии</h1>
            <div className="techs__column">
                <h2 className="techs__column-title">
                    7 технологий
                </h2>
                <p className="techs__column-paragraph">
                    На курсе веб-разработки мы освоили технологии, 
                    которые применили в дипломной работе.
                </p>
                <div className="techs__row">
                    <p className="techs__row-technology">HTML</p>
                    <p className="techs__row-technology">CSS</p>
                    <p className="techs__row-technology">JS</p>
                    <p className="techs__row-technology">React</p>
                    <p className="techs__row-technology">Git</p>
                    <p className="techs__row-technology">Express.js</p>
                    <p className="techs__row-technology">mongoDB</p>
                </div>
            </div>
        </section>
    )
}

export default Techs;