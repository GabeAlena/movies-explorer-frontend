import React from 'react';
import loupe from '../../../images/loupe.svg';

function SearchForm() {
    return (
        <section className="search-form__section">
            <div className="search-form__container">
                <form className="search-form__form">
                    <img src={loupe} alt="лупа" className="search-form__icon"></img>
                    <input 
                        required 
                        className="search-form__input"
                        type="text"
                        placeholder="Фильм"
                        id="search-form-input"
                        name="search-form-input"
                    />
                    <button 
                        type="submit"
                        className="search-form__button"
                    />
                </form>
            </div>
            <div className="search-form__filter">
                <input type="checkbox" className="search-form__filter-checkbox"></input>
                <p className="search-form__filter-text">Короткометражки</p>
            </div>
        </section>    
    )
}

export default SearchForm;