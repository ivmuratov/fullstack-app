import axios from 'axios';

const USER_REST_API_URL = 'http://localhost:8080/api/user';

const config = (method, url, data, username, password) => {
    let request = {
        method: method,
        url: url,
        auth: {
            username: username,
            password: password
        }
    };

    if (data == null) {
        return request;

    } else {
        request.data = data;
        return request;
    }
}

export const getUsers = async (username, password) => {
    return await axios(config('get', USER_REST_API_URL, null, username, password));
}

export const createUser = async (user, username, password) => {
    return await axios(config('post', USER_REST_API_URL, user, username, password));
}

export const deleteUser = async (id, username, password) => {
    return await axios(config('delete', `${USER_REST_API_URL}/${id}`, null, username, password));
}

export const updateUser = async (id, user, username, password) => {
    return await axios(config('put', `${USER_REST_API_URL}/${id}`, user, username, password));
}

// =============================================================
// =============================================================
// =============================================================

const ACCOUNT_REST_API_URL = 'http://localhost:8080/api/account';

export const login = async (credentials) => {
    return await axios.post(`${ACCOUNT_REST_API_URL}/login`, credentials);
}

export const registration = async (credentials) => {
    return await axios.post(`${ACCOUNT_REST_API_URL}/registration`, credentials);
}

export const getUserInfo = async (username, password) => {
    return await axios(config('get', ACCOUNT_REST_API_URL, null, username, password));
}