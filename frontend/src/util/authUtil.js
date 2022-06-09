
export const getAuthUser = () => {
    const username = localStorage.getItem('username');
    const password = localStorage.getItem('password');

    return {
        username: username,
        password: password
    };
}

export const getAuthRoles = () => {
    return localStorage.getItem('roles');
}

export const isAdmin = () => {
    return getAuthRoles() == null ? false : getAuthRoles().split(',')
        .find(str => str === 'ADMIN') === 'ADMIN' ? true : false;
}