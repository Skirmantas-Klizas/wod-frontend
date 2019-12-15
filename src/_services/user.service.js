import { authHeader } from '../_helpers';
import { BehaviorSubject } from 'rxjs';
import axios from 'axios';
import VueJwtDecode from 'vue-jwt-decode';
const url = 'https://wods-api.herokuapp.com';
const currentUserSubject = new BehaviorSubject(
    JSON.parse(localStorage.getItem('user'))
);

export const userService = {
    login,
    logout,
    register,
    getAll,
    getById,
    update,
    delete: _delete,
    currentUser: currentUserSubject.asObservable(),
    get currentUserValue() {
        return currentUserSubject.value;
    }
};

async function login(email, password) {
    try {
        const res = await axios({
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            url: url + '/users/login',
            data: JSON.stringify({ email, password })
        });
        const user = handleResponse(res);
        const decoded = VueJwtDecode.decode(user.token);
        if (user.token) {
            user.role = decoded.role;
            user.exp = decoded.exp;
            localStorage.setItem('user', JSON.stringify(user));
            currentUserSubject.next(user);
        }
        return user;
    } catch (err) {
        console.log(err);
    }
}

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('user');
    currentUserSubject.next(null);
}

async function register(user) {
    try {
        const res = await axios({
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            url: url + '/users/signup',
            data: JSON.stringify(user)
        });
        return handleResponse(res);
    } catch (err) {
        console.log(err);
    }
}

async function getAll() {
    try {
        const res = await axios({
            method: 'GET',
            headers: authHeader(),
            url: url + '/users'
        });
        const data = handleResponse(res);
        return data.users;
    } catch (err) {
        console.log(err);
    }
}

async function getById(id) {
    try {
        const res = await axios({
            method: 'GET',
            headers: authHeader(),
            url: url + `/users/${id}`
        });
        const data = handleResponse(res);
        return data;
    } catch (err) {
        console.log(err);
    }
}

async function update(user) {
    try {
        const res = await axios({
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json', ...authHeader() },
            url: url + `/users/${user._id}`,
            data: JSON.stringify(user)
        });
        handleResponse(res);
        return user;
    } catch (err) {
        console.log(err);
    }
}

async function _delete(id) {
    try {
        const res = await axios({
            method: 'DELETE',
            headers: authHeader(),
            url: url + `/users/${id}`
        });
        return handleResponse(res);
    } catch (err) {
        console.log(err);
    }
}

function handleResponse(response) {
    const data = response.data;
    if (response.request.readyState !== 4) {
        if (response.status === 401) {
            // auto logout if 401 response returned from api
            logout();
            location.reload(true);
        } else if (response.status === 400) {
        }

        const error = (data && data.message) || response.statusText;
        return Promise.reject(error);
    }

    return data;
}
