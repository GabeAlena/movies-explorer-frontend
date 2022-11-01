import React from 'react';
import { useEffect, useState } from 'react';
import { Routes, Route, useNavigate, useLocation, Navigate } from "react-router-dom";
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Login from '../Login/Login';
import Register from '../Register/Register';
import NotFound from '../NotFound/NotFound';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import NavigationSidebar from '../Navigation/NavigationSidebar/NavigationSidebar';
import * as auth from '../../utils/auth.js';
import InfoTooltip from '../InfoTooltip/InfoTooltip';
import { mainApi } from '../../utils/MainApi.js';
import { moviesApi } from '../../utils/MoviesApi.js';
import successImage from '../../images/success.svg';
import failImage from '../../images/fail.svg';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import { API_URL, SHORT_MOVIE } from '../../utils/constants';

function App() {
    const [currentUser, setCurrentUser] = useState({});
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const [infoTooltip, setInfoTooltip] = useState(false);
    const [infoTooltipImage, setInfoTooltipImage] = useState('');
    const [infoTooltilMessage, setInfoTooltipMessage] = useState('');

    const [sidebar, setSidebar] = useState(false);

    const [movies, setMovies] = useState([]);
    const [movieSearchResult, setMovieSearchResult] = useState([]);
    const [isShortMovieChecked, setIsShortMovieChecked] = useState(false);

    const [savedMovies, setSavedMovies] = useState([]);
    const [savedMovieSearchResult, setSavedMovieSearchResult] = useState([]);
    const [isSavedMoviesFiltered, setIsSavedMoviesFiltered] = useState(false);

    const [isLoading, setIsLoading] = useState(false);
    const [isNoResults, setIsNoResults] = useState(false);
    
    const handleOpenMenu = () => {
        setSidebar(!sidebar);
    }

    const checkToken = () => {
        const token = localStorage.getItem('token');
        if (token) {
            auth.checkToken(token)
                .then((res) => {
                    if (res) {
                        setCurrentUser(res);
                        setIsLoggedIn(true);
                        setMovieSearchResult(getSearchResults);
                        //setSavedMovies(JSON.parse(localStorage.getItem('savedMovies')));
                        setIsShortMovieChecked(JSON.parse(localStorage.getItem('checkboxState')));
                    }
                })
                .catch((err) => {
                    console.log(err);
                    handleSignOut();
                })    
        }
    };

    useEffect(() => {
        if (JSON.parse(localStorage.getItem('checkboxState')) === true && location.pathname === '/movies') {
            try {
                document.getElementById("first").checked = true;
            } catch (err) {
                // Nothing
            }
        } else if (location.pathname === '/saved-movies') {
            try {
                document.getElementById("first").checked = false; // 
                localStorage.setItem('checkboxStateInSaved', false);
            } catch (err) {
                // Nothing
            } 
        }
        checkToken();
    }, []);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (isLoggedIn || token) {
            setIsLoggedIn(true);
        }
    }, [isLoggedIn]);

    // дает переходить по url аторизованному пользователю
    // и позволяет выкидывать пользователя при невалидном токине
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            if (location.pathname === "/profile" ||
                location.pathname === "/movies" ||
                location.pathname === "/saved-movies") {
                    handleSignOut();
            }
        } 
    }, [isLoggedIn]);

    useEffect(() => {
        getUserInfo();
    }, [isLoggedIn]);

    function getUserInfo() {
        if (isLoggedIn) {
            mainApi.getUserInfo()
            .then((res) => {
                if (res) {
                    setCurrentUser(res);
                    setIsLoggedIn(true);
                }
            })
            .catch((err) => console.log(err));
        }

    };

    //эффект который достает из хранилища сохраненные фильмы, если их там нет,
    //то добавляет в хранилище savedMovies
    useEffect(() => {
        if (localStorage.getItem('savedMovies')) {
            setSavedMovies(JSON.parse(localStorage.getItem('savedMovies')));
        } else if (isLoggedIn) {
            mainApi.getMovies()
                .then((res) => {
                    setSavedMovies(res);
                    localStorage.setItem('savedMovies', JSON.stringify(res));
                })
                .catch((err) => console.log(err));
        }
    }, [isLoggedIn]);

    //ЭФФЕКТ ПОКАЗЫВАЕТ ПОСЛЕДНИЕ ФИЛЬМЫ КОТОРЫЕ ИСКАЛ ПОЛЬЗОВАТЕЛЬ - ВСЕГДА. (при переходах, обновлениях страницы).
    //НУЖНО - ЧТОБЫ ФИЛЬМЫ ПОКАЗЫВАЛИСЬ ТОЛЬКО КОГДА ПОЛЬЗОВАТЕЛЬ ЗАЛОГИНЕН. ЕСЛИ ОН ВЫШЕЛ ИЗ ПРОФИЛЯ, А ПОТОМ ЗАШЕЛ
    //ОБРАТНО - ТО НА СТРАНИЦЕ С ФИЛЬМАМИ НЕ ДОЛЖНО БЫТЬ РЕЗУЛЬТАТА ПОИСКА

    //эффект который достает из хранилища найденные в последний раз фильмы, если их там нет,
    //то добавляет в хранилище foundedMovies
    /*useEffect(() => {
        if (localStorage.getItem('foundedMovies')) {
            setMovieSearchResult(JSON.parse(localStorage.getItem('foundedMovies')));
        } else if (isLoggedIn) {
            mainApi.getMovies()
                .then((res) => {
                    setMovieSearchResult(res);
                    localStorage.setItem('foundedMovies', JSON.stringify(res));
                })
                .catch((err) => console.log(err));
        }
    }, [isLoggedIn]);*/

    function handleRegister(data) {
        console.log(data);
        auth.register(data)
            .then((res) => {
                setCurrentUser(res);
                console.log(currentUser);
                handleLogin(data);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    function handleLogin(values) {
        auth.authorization(values)
            .then((res) => {
              if (res.token) { 
                localStorage.setItem('token', res.token);
                setCurrentUser(res);
                console.log(currentUser);
                setInfoTooltipImage(successImage);
                setInfoTooltipMessage("Вы успешно авторизовались!");
                setIsLoggedIn(true);
                navigate('/movies');
              }   
            })
            .catch((err) => {
                setInfoTooltipImage(failImage);
                setInfoTooltipMessage("Что-то пошло не так! Попробуйте ещё раз.");
                console.log(err);
            })
            .finally(handleInfoTooltip);
    };

    function handleChangeProfile(values) {
        mainApi.editProfileData(values)
            .then((res) => {
                setCurrentUser(res);
                setInfoTooltipImage(successImage);
                setInfoTooltipMessage("Вы успешно сменили данные профиля!");
            })
            .catch((err) => {
                setInfoTooltipImage(failImage);
                setInfoTooltipMessage("Что-то пошло не так! Попробуйте ещё раз.");
                console.log(err);
            })
            .finally(handleInfoTooltip);
    }

    function handleInfoTooltip() {
        setInfoTooltip(true);
    };

    function closeTooltip() {
        setInfoTooltip(false);
    };

    /*function handleDeleteStatesAndLocalStorageData() {
        setCurrentUser({});
        setSavedMovies([]);
        setMovieSearchResult([]);
        setIsLoggedIn(false);
        localStorage.removeItem('token');
        localStorage.removeItem('foundedMovies');
        localStorage.removeItem('searchWord');
        localStorage.removeItem('checkboxState');
        localStorage.clear();
    };*/

    function handleSignOut() {
        setCurrentUser({});
        setSavedMovies([]);
        setMovieSearchResult([]);
        setIsLoggedIn(false);
        localStorage.removeItem('token');
        localStorage.removeItem('foundedMovies');
        localStorage.removeItem('searchWord');
        localStorage.removeItem('checkboxState');
        localStorage.clear();
        navigate('/');
    };

    // поиск слова в сохраненных фильмах
    function handleSearchRequestInSaved(searchWord, checkboxState) {
        const movieList = filterBySearchWord(savedMovies, searchWord, checkboxState);
        localStorage.setItem('checkboxStateInSaved', checkboxState);
        setSavedMovieSearchResult(movieList);
        setIsSavedMoviesFiltered(true);
    };

    function resetIsSavedMoviesFiltered () {
        setIsSavedMoviesFiltered(false);
    };

    ////////////////

    //эффект, который ищет фильмы по адресу beatfilm
    useEffect(() => {
        if (isLoggedIn) {
            moviesApi.getInitialMovies()
                .then((movies) => {
                    setMovies(movies);
                })
        }
    }, [isLoggedIn]);

    function getSearchResults() {
        try {
            return localStorage.getItem('foundedMovies').length > 0 ?
            JSON.parse(localStorage.getItem('foundedMovies')) :
            [];
        } catch(err) {
            return [];
        }

    };

    // функция которая отвечает за поиск фильмов из уже полученных данныз с сервера
    function handleSearchRequest(searchWord, checkboxState) {
        setIsLoading(true);
        setTimeout(() => {

            //список фильмов полученный с сервера по слову в поиске и по чекбоксу
            const movieList = filterBySearchWord(movies, searchWord, checkboxState);
            if (movieList !== null && movieList.length !== 0) {
                localStorage.setItem('foundedMovies', JSON.stringify(movieList));
                setIsNoResults(false);
            } else {
                localStorage.setItem('foundedMovies', []);
                setIsNoResults(true);
            }
            localStorage.setItem('checkboxState', checkboxState);
            localStorage.setItem('searchWord', searchWord);
            setMovieSearchResult(movieList);
            setIsLoading(false);  
        }, 500);
    };

    ///////////

    // Ниже функция ищет фильмы с сервера и она же передается на страницу movies. Так не верно! Фильмы должны искаться
    //только 1 раз, а сортировка должна производиться из полученных movies
    /*
    //функция, которая ищет фильмы по адресу beatfilm
    function handleSearchMoviesInMoviesApi(searchWord, checkboxState) {
        setIsLoading(true);
        moviesApi.getInitialMovies()
            .then((movies) => {
                localStorage.setItem('movies', JSON.stringify(movies));

                //список фильмов полученный с сервера по слову в поиске и по чекбоксу
                const movieList = filterBySearchWord(movies, searchWord, checkboxState);
                if (movieList !== null && movieList.length !== 0) {
                    localStorage.setItem('foundedMovies', JSON.stringify(movieList));
                    setIsNoResults(false);
                } else {
                    localStorage.setItem('foundedMovies', []);
                    setIsNoResults(true);
                }
                localStorage.setItem('checkboxState', checkboxState);
                localStorage.setItem('searchWord', searchWord);
                setMovieSearchResult(movieList);
                setIsLoading(false);                
            })
            .catch((err) => console.log(err));
    };
    */

    //функция которая отвечает за поиск фильмов без учета регистра букв
    function filterBySearchWord(movies, searchWord, checkboxState) {
        if (movies.length > 0 && searchWord !== null) {
            if (checkboxState === true) {
                return movies.filter((movie) => movie.nameRU.toLowerCase().includes(searchWord.toLowerCase()) && movie.duration < SHORT_MOVIE);
            } else {
                return movies.filter((movie) => movie.nameRU.toLowerCase().includes(searchWord.toLowerCase()));
            }
        } else {
            return [];
        }
    };

    //константа которая достает из локального хранилища слово которое искал пользователь
    const searchWordInLocalStorage = localStorage.getItem('searchWord');

    //функция которая меняет состояние чекбокса в хранидище
    function switchCheckBox() {
        const filter = JSON.parse(localStorage.getItem('checkboxState'));
        localStorage.setItem('checkboxState', !filter);
        setIsShortMovieChecked(!filter);
    }

    //сохранение фильма
    function handleMovieSave(movie) {
        const savedMovie = {
            country: movie.country,
            director: movie.director,
            duration: movie.duration,
            year: movie.year,
            description: movie.description,
            image: `${API_URL}/${movie.image.url}`,
            trailerLink: movie.trailerLink || '',
            thumbnail: `${API_URL}/${movie.image.formats.thumbnail.url}`,
            movieId: movie.id,
            nameRU: movie.nameRU || '',
            nameEN: movie.nameEN || '',
        }

        mainApi.saveMovie(savedMovie)
            .then((res) => {
                const newSavedMovies = [...savedMovies, res];
                setSavedMovies(newSavedMovies);
                localStorage.setItem('savedMovies', JSON.stringify(newSavedMovies));
            })
            .catch((err) => console.log(err));
    };

    //удаление фильма во вкладке фильмы
    function handleMovieDelete(movie) {
        let result = savedMovies.find(el => el.movieId === movie.id)
        mainApi.deleteMovie(result._id)
            .then((res) => {
                console.log(res);
                const filteredMovies = savedMovies.filter((item) => item._id !== res._id);
                setSavedMovies(filteredMovies);
                localStorage.setItem('savedMovies', JSON.stringify(filteredMovies));
            })
            .catch((err) => console.log(err));
    };

    //удаление фильма во вкладке сохраненные фильмы
    function handleDeleteSavedMovies(movie) {
        mainApi.deleteMovie(movie._id)
            .then((res) => {
                const filteredMovies = savedMovies.filter((item) => item._id !== res._id);
                setSavedMovies(filteredMovies);
                localStorage.setItem('savedMovies', JSON.stringify(filteredMovies));
            })
            .catch((err) => console.log(err));
    };

    return (
        <CurrentUserContext.Provider value={{ isLoggedIn, currentUser }}>
            <Header 
                isLoggedIn={isLoggedIn}
                handleOpenMenu={handleOpenMenu}
            />
            <NavigationSidebar 
                sidebar={sidebar}
                handleOpenMenu={handleOpenMenu}
            />
            <Routes>
                <Route path="/" exact element={
                    <Main />
                }/>
                <Route path="/movies" element={
                    <ProtectedRoute isLoggedIn={isLoggedIn}>
                        <Movies 
                            movies={movieSearchResult}
                            savedMovies={savedMovies}
                            searchWord={searchWordInLocalStorage}
                            //onSearch={handleSearchMoviesInMoviesApi}
                            onSearch={handleSearchRequest}
                            handleCheckboxSwitch={switchCheckBox}
                            isShortMovieChecked={isShortMovieChecked}
                            isNoResults={isNoResults}
                            isLoading={isLoading}
                            onMovieSave={handleMovieSave}
                            onMovieDelete={handleMovieDelete}
                            setSavedMovies={setSavedMovies}
                        />
                    </ProtectedRoute>
                } />
                <Route path="/saved-movies" element={
                    <ProtectedRoute isLoggedIn={isLoggedIn}>
                        <SavedMovies 
                            movies={isSavedMoviesFiltered ? savedMovieSearchResult : savedMovies}
                            setSavedMovies={setSavedMovies}
                            savedMovies={savedMovies}
                            savedMovieSearchResult={savedMovieSearchResult}
                            isSavedMoviesFiltered={isSavedMoviesFiltered}
                            onSavedSearch={handleSearchRequestInSaved}
                            handleCheckboxSwitch={switchCheckBox}
                            isShortMovieChecked={isShortMovieChecked}
                            resetIsSavedMoviesFiltered={resetIsSavedMoviesFiltered}
                            onMovieDelete={handleDeleteSavedMovies}
                        />
                    </ProtectedRoute>
                } />
                <Route path="/profile" element={
                    <ProtectedRoute isLoggedIn={isLoggedIn}>
                        <Profile 
                            onChangeProfile={handleChangeProfile}
                            onSignOut={handleSignOut}
                        />
                    </ProtectedRoute>
                } />

                {isLoggedIn ? (
                <Route path="/signin"
                    element={<Navigate replace to="/" />}
                /> ) : (
                <Route path="/signin"
                    element={<Login onLogin={handleLogin} />}
                />                    
                )}

                {isLoggedIn ? (
                <Route path="/signup"
                    element={<Navigate replace to="/" />}
                /> ) : (
                <Route path="/signup"
                    element={<Register onRegister={handleRegister} />}
                />                    
                )}

                <Route path="/*" element={
                    <NotFound />
                } />
            </Routes>
            <Footer />
            <InfoTooltip 
              isOpen={infoTooltip}
              image={infoTooltipImage}
              message={infoTooltilMessage}
              onClose={closeTooltip}
            />
      </CurrentUserContext.Provider>
    );
}

export default App;
