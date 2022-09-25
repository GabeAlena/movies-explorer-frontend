import SearchForm from './SearchForm/SearchForm';
import MoviesCardList from './MoviesCardList/MoviesCardList';

function Movies() {
    return (
        <main className="movies">
            <section className="search-form">
                <SearchForm />
            </section>
            <section className="movies-list">
                <MoviesCardList />
            </section>
            <button className="movies__more-btn">Ещё</button>
        </main>    
    )
}

export default Movies;
