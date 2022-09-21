import SearchForm from '../Movies/SearchForm/SearchForm';
import MoviesCardList from '../Movies/MoviesCardList/MoviesCardList';

function SavedMovies() {
    return (
        <main className="saved-movies">
            <section className="search-form">
                <SearchForm />
            </section>
            <section className="movies-list">
                <MoviesCardList />
            </section>
        </main>    
    )
}

export default SavedMovies;
