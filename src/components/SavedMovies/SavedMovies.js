import SearchForm from '../Movies/SearchForm/SearchForm';
import MoviesCardList from '../Movies/MoviesCardList/MoviesCardList';

function SavedMovies({ 
    movies,
    savedMovies,
    savedMovieSearchResult,
    isSavedMoviesFiltered,
    onSearch,
    onSavedSearch,
    handleCheckboxSwitch,
    setRender,
    isLoggenIn,
    isShortMovieChecked,
    isNoResults,
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
            <section className="movies-list">
                <MoviesCardList 
                    movies={movies}
                    savedMovies={savedMovies}
                    savedMovieSearchResult={savedMovieSearchResult}
                    isSavedMoviesFiltered={isSavedMoviesFiltered}
                    //setRender={setRender}
                    isLoggenIn={isLoggenIn}
                    //isNoResults={isNoResults}
                    resetIsSavedMoviesFiltered={resetIsSavedMoviesFiltered}
                    onMovieDelete={onMovieDelete}
                />
            </section>
        </main>    
    )
}

export default SavedMovies;
