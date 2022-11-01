import { BF_URL } from './constants';

class MoviesApi {
    constructor({ baseUrl, headers }) {
        this._baseUrl = baseUrl;
        this._headers = headers;
    }

    _checkResponse(res) {
        if (res.ok) {
            return res.json()
        } else {
            return Promise.reject(`Ошибка: ${res.status}`)
        }
    }

    //загрузка фильмов с сервера
    getInitialMovies() {
        return fetch(`${this._baseUrl}`, {
            method: 'GET',
            headers: this._headers,

        })
        .then(this._checkResponse)
    };
}

export const moviesApi = new MoviesApi({
    baseUrl: BF_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});
