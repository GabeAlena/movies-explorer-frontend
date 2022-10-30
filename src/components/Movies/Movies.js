import SearchForm from './SearchForm/SearchForm';
import MoviesCardList from './MoviesCardList/MoviesCardList';
import Preloader from './Preloader/Preloader';
import { moviesApi } from '../../utils/MoviesApi';
import { useEffect, useState } from 'react';
import { mainApi } from '../../utils/MainApi';
import { useLocation } from 'react-router-dom';

function Movies({
    movies,
    savedMovies,
    setSavedMovies,
    onSearch,
    handleCheckboxSwitch,
    isShortMovieChecked,
    isLoggedIn,
    isNoResults,
    isLoading,
    onMovieSave,
    onMovieDelete,
    searchResult, }) {
    
    const [cardsCount, setCardsCount] = useState(null);
    const [cardsAddCount, setCardsAddCount] = useState(null);
    
    const location = useLocation().pathname;

    const visibleMovies = movies.slice(0, cardsCount);
    
    //console.log(cardsCount); //количество карточек, которое должно присутствовать на странице до первого нажатия на "еще"
    //console.log(cardsAddCount); // количество карточек, которое нужно добавить при данном разрешении экрана
    //console.log(movies.length); // количество фильмов после поиска
    //console.log(visibleMovies.length); //количество видимых фильмов

    const moreBtnClassName = `movies__more-btn ${
        visibleMovies.length < movies.length ? "" : "movies__more-btn_hidden"
    }`;

    const handleLoadCards = () => {
        setCardsCount((prevValue) => prevValue + cardsAddCount);
    };

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 1280) {
                setCardsAddCount(4);
                setCardsCount(16);
            } else if (window.innerWidth >= 768) {
                setCardsAddCount(2);
                setCardsCount(8);
            } else {
                setCardsAddCount(1);
                setCardsCount(4);
            }
        };
        handleResize();
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <main className="movies">
            <section className="search-form">
                <SearchForm 
                    onSearch={onSearch}
                    handleCheckboxSwitch={handleCheckboxSwitch}
                    isShortMovieChecked={isShortMovieChecked}
                />
            </section>
            {isLoading ? (
                <Preloader isLoading={isLoading} />
            ) : isNoResults ? (
                <p className="movies__error">Ничего не найдено.</p>
            ) : (
                <>
                <section className="movies-list">
                    <MoviesCardList 
                        movies={visibleMovies}
                        savedMovies={savedMovies}
                        isNoResults={isNoResults}
                        isLoggedIn={isLoggedIn}
                        onMovieSave={onMovieSave}
                        onMovieDelete={onMovieDelete}
                    />
                </section>
                <button
                    type="button"
                    className={moreBtnClassName}
                    onClick={handleLoadCards}
                >Ещё</button>    
                </>
            )}  
        </main>    
    )
}

export default Movies;
