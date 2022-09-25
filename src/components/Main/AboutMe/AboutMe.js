import React from 'react';
import aboutMe from '../../../images/aboutMe.jpg';

function AboutMe() {
    return (
        <section className="about-me__section">
            <h1 className="about-me__title">Студент</h1>
            <div className="about-me__info">
                <div className="about-me__description">
                    <h2 className="about-me__name">Алена</h2>
                    <h3 className="about-me__about">Фронтенд-разработчик, 26 лет</h3>
                    <p className="about-me__depiction">
                        Я родилась в Украине, в городе Керчь, окончила аэрокосмический факультет ПНИПУ 
                        по направлению "экспериментальная механика и конструкционное материаловедение". 
                        Увлекаюсь иностранными языками, являюсь педантичным человеком. Практически год 
                        назад я решила пройти вводный курс в веб-разработку и мне понравилось. Теперь люди, 
                        употребляющие слова "пушить, вёрстка, гит" не кажутся мне сумасшедшими!
                    </p>
                    <a href="https://github.com/GabeAlena" target="blank" className="about-me__account">Github</a>
                </div>
                <img className="about-me__photo" src={aboutMe} alt="фото разработчика"></img>
            </div>
        </section>
    )
}

export default AboutMe;