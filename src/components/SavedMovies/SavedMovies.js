import SearchForm from '../Movies/SearchForm/SearchForm';
import MoviesCardList from '../Movies/MoviesCardList/MoviesCardList';
import Preloader from '../Movies/Preloader/Preloader';

function SavedMovies({ 
    movies,
    savedMovies,
    savedMovieSearchResult,
    isSavedMoviesFiltered,
    onSearch,
    isLoading,
    onSavedSearch,
    handleCheckboxSwitch,
    isLoggenIn,
    isShortMovieChecked,
    resetIsSavedMoviesFiltered,
    onMovieDelete,
    }) {

    return (
        <main className="saved-movies">
            <section className="search-form">
                <SearchForm 
                onSearch={onSearch}
                onSavedSearch={onSavedSearch}
                handleCheckboxSwitch={handleCheckboxSwitch}
                isShortMovieChecked={isShortMovieChecked} />
            </section>
            {isLoading ? (
                <Preloader isLoading={isLoading} />
            ) : (
            <section className="movies-list">
                <MoviesCardList 
                    movies={movies}
                    savedMovies={savedMovies}
                    savedMovieSearchResult={savedMovieSearchResult}
                    isSavedMoviesFiltered={isSavedMoviesFiltered}
                    isLoggenIn={isLoggenIn}
                    resetIsSavedMoviesFiltered={resetIsSavedMoviesFiltered}
                    onMovieDelete={onMovieDelete}
                />
            </section>
            )}
        </main>    
    )
}

export default SavedMovies;
