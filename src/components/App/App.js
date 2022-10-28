import React from 'react';
import { useEffect, useState } from 'react';
import { Routes, Route, useNavigate } from "react-router-dom";
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
import Navigation from '../Navigation/Navigation';

function App() {
    const [currentUser, setCurrentUser] = useState({});
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();
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

    function checkToken() {
        console.log(currentUser);
        const token = localStorage.getItem('token');
        if (token) {
            auth.checkToken(token)
                .then((res) => {
                    if (res) {
                        console.log(res);
                        setCurrentUser(res);
                        console.log(currentUser);
                        setIsLoggedIn(true);

                        navigate('/');
                    }
                })
                .catch((err) => console.log(err));
        }
    };

    useEffect(() => {
        checkToken();
    }, []);

    useEffect(() => {
      const token = localStorage.getItem('token');
      if (isLoggedIn || token) {
        setIsLoggedIn(true);
      }
    }, [isLoggedIn]);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            handleSignOut();
        }
    }, [isLoggedIn]);

    //эффект, возвращающий текущего пользователя
    useEffect(() => {
        if (isLoggedIn) {
            mainApi.getUserInfo()
                .then((res) => {
                    console.log(res);
                    setCurrentUser(res);
                    /*setCurrentUser({
                        name: res.name,
                        email: res.email,
                        _id: res._id,
                    });*/
                    setIsLoggedIn(true);
                })
                .catch((err) => console.log(err));
        }
    }, [isLoggedIn]);

    //эффект, возвращающий фильмы текущего пользователя
    useEffect(() => {
        if (isLoggedIn) {
            mainApi.getMovies()
                .then((myMovies) => {
                    setSavedMovies(myMovies);
                })
                .catch((err) => console.log(err));
        }
    }, [isLoggedIn]);

    function handleRegister(data) {
        console.log(data);
        auth.register(data)
            .then((res) => {
                //setCurrentUser(data);
                setCurrentUser(res);
                console.log(res);
                console.log(data);
                handleLogin(data);
                return;
            })
            .catch((err) => {
                console.log(err);
            });
    };

    function handleLogin({email, password}) {
        const data = {email, password};
        auth.authorization(data)
            .then((res) => {
              console.log(data);
              console.log(res);
              //if (res.token) { 
                localStorage.setItem('token', res.token);
                console.log(res);
                console.log(data);
                console.log(currentUser);
                setInfoTooltipImage(successImage);
                setInfoTooltipMessage("Вы успешно авторизовались!");
                setIsLoggedIn(true);
                navigate('/movies');
                return;
              //}   
            })
            .catch((err) => {
                setInfoTooltipImage(failImage);
                setInfoTooltipMessage("Что-то пошло не так! Попробуйте ещё раз.");
                console.log(err);
            })
            .finally(handleInfoTooltip);
    };

    /*function handleChangeProfile(values) {
        console.log('name in handleChangeProfile: ', values.name);
        console.log('email in handleChangeProfile: ', values.email);
        console.log('_id in handleChangeProfile: ', values._id);
        mainApi.editProfileData(values)
            .then((res) => {
                setCurrentUser(res);
                console.log(res);
                console.log(values);
                setInfoTooltipImage(successImage);
                setInfoTooltipMessage("Вы успешно сменили данные профиля!");
            })
            .catch((err) => {
                setInfoTooltipImage(failImage);
                setInfoTooltipMessage("Что-то пошло не так! Попробуйте ещё раз.");
                console.log(err);
            })
            .finally(handleInfoTooltip);
    }*/

    function handleChangeProfile(data) {
        console.log(data);
        console.log('name in handleChangeProfile: ', data.name);
        console.log('email in handleChangeProfile: ', data.email);
        console.log('_id in handleChangeProfile: ', data._id);
        const userData = { name: data.name, email: data.email };
        console.log(userData);
        mainApi.editProfileData(userData)
            .then((userData) => {
                setCurrentUser(userData);
                console.log(data);
                console.log(userData);
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

    function handleSignOut() {
        setCurrentUser({});
        setIsLoggedIn(false);
        localStorage.removeItem('token');
        localStorage.clear();
        navigate('/');
    }

    function handleSearchRequestInSaved(searchWord, checkboxState) {
        setIsLoading(true);
        setTimeout(() => {
            const movieList = filterBySearchWord(savedMovies, searchWord, checkboxState);
            if (movieList !== null && movieList.length !== 0) {
                setIsNoResults(false);
            } else {
                setIsNoResults(true);
            }
            localStorage.setItem('checkboxStateInSaved', checkboxState);
            setSavedMovieSearchResult(movieList);
            setIsSavedMoviesFiltered(true);
            setIsLoading(false);
        }, 1000);
    };    

    function resetIsSavedMoviesFiltered () {
        setIsSavedMoviesFiltered(false);
    };

    /*function getSearchResults() {
        return localStorage.getItem('searchResults').length > 0 ?
            JSON.parse(localStorage.getItem('searchResults')) : [];
    };*/

    //функция, которая ищет фильмы по адресу beatfilm
    function handleSearchMoviesInMoviesApi(searchWord, checkboxState) {
        setIsLoading(true);
        moviesApi.getInitialMovies()
            .then((allMovies) => {
                localStorage.setItem('allMovies', JSON.stringify(allMovies));

                const movieList = filterBySearchWord(allMovies, searchWord, checkboxState);
                if (movieList !== null && movieList.length !== 0) {
                    localStorage.setItem('searchResults', JSON.stringify(movieList));
                    setIsNoResults(false);
                } else {
                    localStorage.setItem('searchResults', []);
                    setIsNoResults(true);
                }
                localStorage.setItem('checkboxState', checkboxState);
                localStorage.setItem('searchWord', searchWord);
                setMovieSearchResult(movieList);
                setIsLoading(false);                
            })
            .catch((err) => console.log(err));
    };

    function filterBySearchWord(allMovies, searchWord, checkboxState) {
        if (allMovies.length > 0) {
            if (checkboxState === true) {
                return allMovies.filter((movie) => movie.nameRU.toLowerCase().includes(searchWord.toLowerCase()) && movie.duration < 40);
            } else {
                return allMovies.filter((movie) => movie.nameRU.toLowerCase().includes(searchWord.toLowerCase()));
            }
        } else {
            return [];
        }
    };

    const searchWordInLocalStorage = localStorage.getItem('searchWord');

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
            image: `https://api.nomoreparties.co/${movie.image.url}`,
            trailerLink: movie.trailerLink || '',
            thumbnail: `https://api.nomoreparties.co/${movie.image.formats.thumbnail.url}`,
            movieId: movie.id,
            nameRU: movie.nameRU || '',
            nameEN: movie.nameEN || '',
        }

        mainApi.saveMovie(savedMovie)
            .then((newSavedMovies) => {
                setSavedMovies([newSavedMovies, ...savedMovies])
            })
            .catch((err) => console.log(err));
    };

    //удаление фильма во вкладке фильмы
    function handleMovieDelete(movie) {
        let result = savedMovies.find(el => el.movieId === movie.id)
        console.log(result);
        console.log(result._id);
        console.log(movie);
        console.log(movie.id);

        mainApi.deleteMovie(result._id)
            .then((res) => {
                console.log(res);
                setSavedMovies(prevMovies => prevMovies.filter(item => item._id !== res._id));
            })
            .catch((err) => console.log(err));
    };

    //удаление фильма во вкладке сохраненные фильмы
    function handleDeleteSavedMovies(movie) {
        console.log(movie);
        console.log(movie._id);
        mainApi.deleteMovie(movie._id)
            .then((res) => {
                setSavedMovies(prevMovies => prevMovies.filter(item => item._id !== res._id));
            })
            .catch((err) => console.log(err));
    };

    return (
        <CurrentUserContext.Provider value={{isLoggedIn, currentUser}}>
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
                <Route path="/movies" /*isLoggedIn={isLoggedIn}*/ element={
                    <ProtectedRoute isLoggedIn={isLoggedIn}>
                        <Movies 
                            movies={movieSearchResult}
                            savedMovies={savedMovies}
                            searchWord={searchWordInLocalStorage}
                            onSearch={handleSearchMoviesInMoviesApi}
                            handleCheckboxSwitch={switchCheckBox}
                            isLoggedIn={isLoggedIn}
                            isShortMovieChecked={isShortMovieChecked}
                            isNoResults={isNoResults}
                            isLoading={isLoading}
                            onMovieSave={handleMovieSave}
                            onMovieDelete={handleMovieDelete}
                        />
                    </ProtectedRoute>
                } />
                <Route path="/saved-movies" /*isLoggedIn={isLoggedIn}*/ element={
                    <ProtectedRoute isLoggedIn={isLoggedIn}>
                        <SavedMovies 
                            movies={isSavedMoviesFiltered ? savedMovieSearchResult : savedMovies}
                            savedMovies={savedMovies}
                            savedMovieSearchResult={savedMovieSearchResult}
                            isSavedMoviesFiltered={isSavedMoviesFiltered}
                            //onSearch={handleSearchMoviesInMoviesApi}
                            onSavedSearch={handleSearchRequestInSaved}
                            handleCheckboxSwitch={switchCheckBox}
                            isLoggedIn={isLoggedIn}
                            isShortMovieChecked={isShortMovieChecked}
                            isNoResults={isNoResults}
                            resetIsSavedMoviesFiltered={resetIsSavedMoviesFiltered}
                            onMovieDelete={handleDeleteSavedMovies}
                        />
                    </ProtectedRoute>
                } />
                <Route path="/profile" /*isLoggedIn={isLoggedIn}*/ element={
                    <ProtectedRoute isLoggedIn={isLoggedIn}>
                        <Profile 
                            onChangeProfile={handleChangeProfile}
                            onSignOut={handleSignOut}
                        />
                    </ProtectedRoute>
                } />
                <Route path="/signin" element={
                    <Login onLogin={handleLogin} />
                } />
                <Route path="/signup" element={
                    <Register onRegister={handleRegister} />
                } />
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
