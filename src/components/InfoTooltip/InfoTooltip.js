import React from 'react';

function InfoTooltip(props) {
    return (
        <div className={`infotooltip infotooltip_sign ${props.isOpen ? 'infotooltip_active' : ''}`}>
        <div className="infotooltip__container infotooltip__container_sign">
            <button className="infotooltip__close-btn" type="button" aria-label="закрыть модальное окно" onClick={props.onClose}></button>
            <img className="infotooltip__sign_img" src={props.image} alt={props.message} />
            <h2 className="infotooltip__title popup__title_sign">{props.message}</h2>
        </div>
    </div>
    )
}

export default InfoTooltip;