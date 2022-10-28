class MainApi {
    constructor({ baseUrl }) {
        this._baseUrl = baseUrl;
    }

    _checkResponse(res) {
        if (res.ok) {
            return res.json()
        } else {
            return Promise.reject(`Ошибка: ${res.status}`)
        }
    }
    
    // загрузка информации о пользователе с сервера
    getUserInfo() {
        return fetch(`${this._baseUrl}/users/me`, {
            method: 'GET',
            headers: {
                authorization: `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json',
            },
        })
        .then(this._checkResponse);
    }

    //редактирование профиля
    editProfileData(userData) {
        console.log(userData.name);
        console.log(userData.email);
        return fetch(`${this._baseUrl}/users/me`, {
            method: 'PATCH',
            headers: {
                authorization: `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData/*{
                name,
                email
            */)
        })
        .then(this._checkResponse);
    };

    //загрузка фильмов
    getMovies() {
        return fetch(`${this._baseUrl}/movies`, {
            method: 'GET',
            headers: {
                authorization: `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json',
            },
        })
        .then(this._checkResponse);
    };

    //сохранение фильма
    saveMovie(movie) {
        console.log(movie);
        console.log(movie.movieId);
        return fetch(`${this._baseUrl}/movies`, {
            method: 'POST',
            headers: {
                authorization: `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(movie/*{
                country: movie.country,
                director: movie.director,
                duration: movie.duration,
                year: movie.year,
                description: movie.description,
                image: `${this._apiUrl}${movie.image.url}`,
                trailerLink: movie.trailerLink || '',
                thumbnail: `${this._apiUrl}${movie.image.formats.thumbnail.url}`,
                movieId: movie.id,
                nameRU: movie.nameRU || '',
                nameEN: movie.nameEN || '',
            }*/),
        })
        .then(this._checkResponse);
    };

    //удаление фильма
    deleteMovie(id) {
        console.log(id);
        return fetch(`${this._baseUrl}/movies/${id}`, {
            method: 'DELETE',
            headers: {
                authorization: `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json',
            },
        })
        .then(this._checkResponse);
    };

}

export const mainApi = new MainApi({
    baseUrl: 'https://api.alena.moviesexplorer.nomoredomains.sbs',
    apiUrl: 'https://api.nomoreparties.co'
});
