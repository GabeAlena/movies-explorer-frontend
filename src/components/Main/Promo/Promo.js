import React from 'react';
import promoImage from '../../../images/promo_image.svg';

function Promo() {
    return (
        <section className="promo__section">
            <div className="promo__titles">
                <h1 className="promo__title">Учебный проект студента факультета Веб-разработки.</h1>
                <p className="promo__subtitle">Листайте ниже, чтобы узнать больше про этот проект и его создателя.</p>
            </div>
            <img className="promo__image" src={promoImage} alt='изображение планеты'></img>
        </section>
    )
}

export default Promo;