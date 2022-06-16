import axios from 'axios';

const USER_REST_API_URL = 'http://localhost:8080/api/user';

export const getUsers = async (username, password) => {     
    const resp = await axios({
        method: 'get',
        url: USER_REST_API_URL,
        auth: {
            username,
            password
        }
    });
    return resp;
}

export const createUser = async (user, username, password) => {
    const resp = await axios({
        method: 'post',
        url: USER_REST_API_URL,
        data: user,
        auth: {
            username,
            password
        }
    });
    return resp;
}

export const deleteUser = async (id, username, password) => {
    const resp = await axios({
        method: 'delete',
        url: `${USER_REST_API_URL}/${id}`,
        auth: {
            username,
            password
        }
    });
    return resp;
}

export const updateUser = async (id, user, username, password) => {    
    const resp = await axios({
        method: 'put',
        url: `${USER_REST_API_URL}/${id}`,
        data: user,
        auth: {
            username,
            password
        }
    });
    return resp;
}

// =============================================================
// =============================================================
// =============================================================

const ACCOUNT_REST_API_URL = 'http://localhost:8080/api/account';

export const login = async (credentials) => {
    const resp = await axios.post(`${ACCOUNT_REST_API_URL}/login`, credentials);
    return resp;
}

export const registration = async (credentials) => {
    const resp = await axios.post(`${ACCOUNT_REST_API_URL}/registration`, credentials);
    return resp;
}

export const getUserInfo = async (username, password) => {    
    const resp = await axios({
        method: 'get',
        url: ACCOUNT_REST_API_URL,
        auth: {
            username,
            password
        }
    });
    return resp;
}