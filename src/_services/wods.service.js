import { authHeader } from '../_helpers';
import axios from 'axios';
const url = 'https://wods-api.herokuapp.com';

export const wodsService = {
    getWods,
    getWodById,
    postWod,
    updateWod,
    deleteWod
};

async function getWods() {
    try {
        const res = await axios({
            method: 'GET',
            url: url + '/wods'
        });
        const data = handleResponse(res);

        return data.wods;
    } catch (err) {
        console.log(err);
    }
}

async function postWod(wod) {
    try {
        const res = await axios({
            method: 'POST',
            headers: { ...authHeader(), 'Content-Type': 'application/json' },
            url: url + '/wods',
            data: JSON.stringify(wod)
        });
        const data = handleResponse(res);
        console.log(data);
        return data.createdWod;
    } catch (err) {
        console.log(err);
    }
}

async function getWodById(id) {
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

async function updateWod(wod) {
    try {
        const res = await axios({
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json', ...authHeader() },
            url: url + `/wods/${wod._id}`,
            data: JSON.stringify(wod)
        });
        handleResponse(res);
        console.log(wod);
        return wod;
    } catch (err) {
        console.log(err);
    }
}

async function deleteWod(id) {
    try {
        const res = await axios({
            method: 'DELETE',
            headers: authHeader(),
            url: url + `/wods/${id}`
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
            alert('Something went wrong');
        }

        const error = (data && data.message) || response.statusText;
        return Promise.reject(error);
    }

    return data;
}
