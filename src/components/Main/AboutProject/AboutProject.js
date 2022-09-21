import React from 'react';

function AboutProject() {
    return (
        <section className="about-project__section" id="aboutproject">
            <h1 className="about-project__title">О проекте</h1>
            <div className="about-project__columns">
                <div className="about-project__column">
                    <h2 className="about-project__column-title">
                        Дипломный проект включал 5 этапов
                    </h2>
                    <p className="about-project__column-paragraph">
                        Составление плана, работу над бэкендом, вёрстку, 
                        добавление функциональности и финальные доработки.
                    </p>
                </div>
                <div className="about-project__column">
                    <h2 className="about-project__column-title">
                        На выполнение диплома ушло 5 недель
                    </h2>
                    <p className="about-project__column-paragraph">
                        У каждого этапа был мягкий и жёсткий дедлайн, 
                        которые нужно было соблюдать, чтобы успешно защититься.
                    </p>
                </div>
            </div>
            <div className="about-project__weeks">
                <h3 className="about-project__week-title-backend">1 неделя</h3>
                <h3 className="about-project__week-title-frontend">4 недели</h3>
                <p className="about-project__week-subtitle">Back-end</p>
                <p className="about-project__week-subtitle">Front-end</p>
            </div>
        </section>
    )
}

export default AboutProject;