import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import loupe from '../../../images/loupe.svg';

function SearchForm({ onSearch, onSavedSearch }) {
    const location = useLocation();
    const [searchWord, setSearchWord] = useState('');

    const checkboxStateLS = localStorage.getItem('checkboxState');
    const checkboxStateInSavedLS = localStorage.getItem('checkboxStateInSaved');
    const searchWordLS = localStorage.getItem('searchWord');
    const searchWordInSavedLS = localStorage.getItem('searchWordInSaved');

    const checkboxState = location.pathname === '/movies' ? JSON.parse(checkboxStateLS) : JSON.parse(checkboxStateInSavedLS);

    function handleSearch(e) {
        e.preventDefault();

        if (location.pathname === '/movies') {
            localStorage.setItem('searchWord', searchWord);
            onSearch(searchWord, checkboxState);
        } else if (location.pathname === '/saved-movies') {
            localStorage.setItem('searchWordInSaved', searchWord);
            onSavedSearch(searchWord, checkboxState);
        }
    }

    function handleChangeInput(e) {
        setSearchWord(e.target.value);
    }

    useEffect(() => {
        location.pathname === '/movies' ? setSearchWord(searchWordLS) : setSearchWord('');
        if (location.pathname === '/movies') {
            if (JSON.parse(localStorage.getItem('checkboxState')) === true) {
                document.getElementById("first").checked = true;
            } else {
                document.getElementById("first").checked = false;
            }
        }
        if (location.pathname === '/saved-movies') {
            if (JSON.parse(localStorage.getItem('checkboxStateInSaved')) === true) {
                document.getElementById("first").checked = true;
            } else {
                document.getElementById("first").checked = false;
            }
            //document.getElementById("first").checked = false;
            //localStorage.setItem('checkboxStateInSaved', false); 
        }

        return () => {
            localStorage.setItem('searchWordInSaved', '');
        }    
    }, []); 

    function onSwitch() {
        const searchWord = location.pathname === '/movies' ? searchWordLS : searchWordInSavedLS;
        //const checked = true ? false : true;
        location.pathname === '/movies' ? onSearch(searchWord, !checkboxState) : onSavedSearch(searchWord, !checkboxState);
        //location.pathname === '/movies' && localStorage.setItem('checkboxState', checked);
        //location.pathname === '/saved-movies' && localStorage.setItem('checkboxState', checked); 
        //document.getElementById("first").checked = checked;
        //console.log(localStorage.getItem('checkboxState'))
    }  

    return (
        
        <section className="search-form__section">
            <div className="search-form__container">
                <form className="search-form__form" onSubmit={handleSearch}>
                    <img src={loupe} alt="лупа" className="search-form__icon"></img>
                    <input 
                        required 
                        className="search-form__input"
                        type="text"
                        placeholder="Фильм"
                        id="search-form-input"
                        name="search-form-input"
                        value={searchWord || ''}
                        onChange={handleChangeInput}
                    />
                    <button 
                        type="submit"
                        className="search-form__button"
                    />
                </form>
            </div>
            <div className="search-form__filter">
                <input 
                    type="checkbox" 
                    id="first"
                    className="search-form__filter-checkbox"
                    onClick={onSwitch}
                ></input>
                <p className="search-form__filter-text">Короткометражки</p>
            </div>
        </section>    
    )
}

export default SearchForm;