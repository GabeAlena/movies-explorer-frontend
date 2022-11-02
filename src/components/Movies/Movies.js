import SearchForm from './SearchForm/SearchForm';
import MoviesCardList from './MoviesCardList/MoviesCardList';
import Preloader from './Preloader/Preloader';
import { useEffect, useState } from 'react';

import { 
    WIDTH_DESKTOP,
    WIDTH_TABLET,
    CARDS_COUNT_TOTAL_DESKTOP,
    CARDS_COUNT_TOTAL_TABLET,
    CARDS_COUNT_TOTAL_MOBILE,
    CARDS_COUNT_IN_WIDTH_DESKTOP,
    CARDS_COUNT_IN_WIDTH_TABLET,
    CARDS_COUNT_IN_WIDTH_MOBILE
    } from '../../utils/constants';

function Movies({
    movies,
    savedMovies,
    onSearch,
    handleCheckboxSwitch,
    isShortMovieChecked,
    isLoggedIn,
    isNoResults,
    isLoading,
    onMovieSave,
    onMovieDelete,
    }) {
    
    const [cardsCount, setCardsCount] = useState(null);
    const [cardsAddCount, setCardsAddCount] = useState(null);
    
    const visibleMovies = movies.slice(0, cardsCount);
    
    //console.log(cardsCount); //количество карточек, которое должно присутствовать на странице до первого нажатия на "еще"
    //console.log(cardsAddCount); // количество карточек, которое нужно добавить при данном разрешении экрана
    //console.log(movies.length); // количество фильмов после поиска
    //console.log(visibleMovies.length); //количество видимых фильмов

    const moreBtnClassName = `movies__more-btn ${
        visibleMovies.length < movies.length ? "" : "movies__more-btn_hidden"
    }`;

    const handleLoadMoreCards = () => {
        setCardsCount((prevValue) => prevValue + cardsAddCount);
    };

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= WIDTH_DESKTOP) {
                setCardsAddCount(CARDS_COUNT_IN_WIDTH_DESKTOP);
                setCardsCount(CARDS_COUNT_TOTAL_DESKTOP);
            } else if (window.innerWidth >= WIDTH_TABLET) {
                setCardsAddCount(CARDS_COUNT_IN_WIDTH_TABLET);
                setCardsCount(CARDS_COUNT_TOTAL_TABLET);
            } else {
                setCardsAddCount(CARDS_COUNT_IN_WIDTH_MOBILE);
                setCardsCount(CARDS_COUNT_TOTAL_MOBILE);
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
                    onClick={handleLoadMoreCards}
                >Ещё</button>    
                </>
            )}  
        </main>    
    )
}

export default Movies;
