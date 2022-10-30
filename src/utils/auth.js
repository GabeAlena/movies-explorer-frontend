const baseUrl = 'https://api.alena.moviesexplorer.nomoredomains.sbs';

const checkResponse = (res) => {
    if (res.ok) {
        return res.json()
    } else {
        return Promise.reject(`Ошибка: ${res.status}`)
    }
}

export const register = (data) => {
    console.log(data);
    return fetch(`${baseUrl}/signup`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            "Content-Type": "application/json"
        },
        body: JSON.stringify({  
            name: data.name,
            email: data.email,
            password: data.password,
        })
    })
    .then(checkResponse);
};

export const authorization = (data) => {
    console.log(data);
    return fetch(`${baseUrl}/signin`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            email: data.email,
            password: data.password,
        })
    })
    .then(checkResponse)
};

export const checkToken = (token) => {
    console.log(token);
    return fetch(`${baseUrl}/users/me`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            "Content-Type": "application/json",
            'Authorization': `Bearer ${token}`,
        }
    })
    .then(res => res.json())
    .then(res => console.log(res))
    .then(checkResponse);
}