import React from 'react';
import { Routes, Route } from "react-router-dom";
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

function App() {
    return (
        <CurrentUserContext.Provider >
            <Header />
            <NavigationSidebar />
            <Routes>
                <Route path="/" exact element={
                    <Main />
                }/>
                <Route path="/movies" element={
                    <Movies />
                } />
                <Route path="/saved-movies" element={
                    <SavedMovies />
                } />
                <Route path="/profile" element={
                    <Profile />
                } />
                <Route path="/signin" element={
                    <Login />
                } />
                <Route path="/signup" element={
                    <Register />
                } />
                <Route path="/*" element={
                    <NotFound />
                } />
            </Routes>
            <Footer />
      </CurrentUserContext.Provider>
    );
}

export default App;
