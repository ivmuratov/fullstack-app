import axios from 'axios';

const USER_REST_API_URL = 'http://localhost:8080/api/user';

export const getUsers = async (username, password) => {
    return await axios({
        method: 'get',
        url: USER_REST_API_URL,
        auth: {
            username,
            password
        }
    });
}

export const createUser = async (user, username, password) => {
    return await axios({
        method: 'post',
        url: USER_REST_API_URL,
        data: user,
        auth: {
            username,
            password
        }
    });
}

export const deleteUser = async (id, username, password) => {
    return await axios({
        method: 'delete',
        url: `${USER_REST_API_URL}/${id}`,
        auth: {
            username,
            password
        }
    });
}

export const updateUser = async (id, user, username, password) => {    
    return await axios({
        method: 'put',
        url: `${USER_REST_API_URL}/${id}`,
        data: user,
        auth: {
            username,
            password
        }
    });
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
    return await axios({
        method: 'get',
        url: ACCOUNT_REST_API_URL,
        auth: {
            username,
            password
        }
    });
}